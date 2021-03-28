import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useContext, useState } from 'react';
import { userContext } from "../../App";
import { useHistory, useLocation } from "react-router";
firebase.initializeApp(firebaseConfig)




function Login() {
    const [loggedInUser, setLoggedInUser] = useContext(userContext);
    const history =  useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } }; 
    const provider = new firebase.auth.GoogleAuthProvider();
    const [newUser, setNewUser] = useState(false);
    const [user, setUser] =  useState({
    isSignIn:false,
    name:'',
    email:'',
    photo:'',
    password:'',
    error:'',
    success:false,
  })
  const handleSignIn = ()=>{
    firebase.auth().signInWithPopup(provider)
    .then( result => {
      const { displayName, email, photoURL } = result.user;
      const isSignIn = {
        isSignIn:true,
        name:displayName,
        email:email,
        photo:photoURL
      }
      setUser(isSignIn);
      setLoggedInUser(isSignIn)
    })
  }

  const handleSignOut = ()=>{
    const isSignIn = {
      isSignIn:false,
      name:'',
      email:'',
      password:'',
      photo:'',
    }
    setUser(isSignIn);
  }

  const handleChange = (event)=>{
    let isFormValid;
    if(event.target.name === 'name'){

      console.log(event.target.value);
    }
    if(event.target.name === 'email'){
      const email = event.target.value;
        isFormValid =  /\S+@\S+\.\S+/.test(email);

    }
    if(event.target.name === 'password'){
      let password = event.target.value;
      if(password.length > 6){
        isFormValid = /\d{1}/.test(password);
      }

    }
    if(isFormValid){
      let newInfo = {...user};
      newInfo[event.target.name] = event.target.value;
      setUser(newInfo);

    }
  }
// form submit 
  const formSubmit  = (e)=>{
    if(newUser && user.email && user.password){
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
      .then((res) => {
        user.success = true;
        updateUserName(user.name)
        
      })
      .catch(error => {
        const newInfo = {...user};
        newInfo.error = error.message;;
        setUser(newInfo);
        user.success = false;
        console.log( user.success)
      });
    }else{
      firebase.auth().signInWithEmailAndPassword(user.email, user.password)
  .then((res) => {
    user.success = true;
  })
  .catch(error => {
    const newInfo = {...user};
    newInfo.error = error.message;;
    setUser(newInfo);
    setLoggedInUser(newInfo);
    history.replace(from);
    user.success = false;
    console.log( user.success);
  });
    }
    e.preventDefault();
  }

// detect user 
const detectUser = (newuser)=>{
  setNewUser(newuser)
}

// userName update
const updateUserName = name=>{
  var user = firebase.auth().currentUser;
  user.updateProfile({
    displayName:name,
    }).then(function() {
      console.log('user name update successfully')
    }).catch(function(error) {
      console.log(error)
    });
}

  return (
    <div style={{textAlign:'center',padding:'10px'}}>
      
      {
        user.isSignIn? <button onClick={handleSignOut}>Sign Out</button> :<button onClick={handleSignIn}>Sign in</button>
      }
      {
        user.isSignIn && <div>
          <p>{user.name}</p>
          <p>{user.email}</p>
          <img src={user.photo} alt=""/>
        </div>
      }

      <h1>Our own Authentication</h1>
      <form onSubmit={formSubmit}>
        <input type="checkbox" name="checkbox" onChange={()=> detectUser(!newUser)}/> New User
        <br/>
        <br/>
        {newUser && <input type="text" name="name" onBlur={handleChange} placeholder="Your Name"/>
        }
        <br/>
        <input type="email" name="email" onBlur={handleChange} placeholder="Your Email" required/>
        <br/>
        <input type="password" name="password" onBlur={handleChange}  placeholder="your Password" required/>
        <br/>
        <br/>
        <input type="submit" value="Submit Now"/>
      </form>

        {
          user.success?<p style={{color:'blue'}}>User {newUser?'login':'created'} Successfully</p> :<p style={{color:'red'}}>{user.error}</p>
        }
    </div>
  );
}

export default Login;
