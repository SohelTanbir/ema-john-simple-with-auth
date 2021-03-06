import React, { useContext } from 'react';
import { useForm } from "react-hook-form";
import { userContext } from '../../App';
import { processOrder } from '../../utilities/databaseManager';
import './Shipment.css';

const Shipment = ()=>{
    const { register, handleSubmit, watch, errors } = useForm();
    const [loggedInUser, setLoggedInUser] = useContext(userContext);
    const onSubmit = data => {
      fetch('https://ancient-wave-06547.herokuapp.com/addOrder', {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(data)
      })
      .then(res => res.json())
      .then(result => {
          console.log('shipment page', result)
      })
    };
   

  return (
        <div className="ship-form">
            <form onSubmit={handleSubmit(onSubmit)}>
            <input name="name" defaultValue={loggedInUser.name} ref={register({ required: true })} placeholder="Name"/>
            {errors.name && <span className="error_message">Name field is required</span>}

            <input name="email" defaultValue={loggedInUser.email} ref={register({ required: true })} placeholder="Email"/>
            {errors.email && <span className="error_message">Email field is required</span>}

            <input name="address" ref={register({ required: true })} placeholder="address" />
            {errors.address && <span className="error_message">address field is required</span>}

            <input name="phone" ref={register({ required: true })} placeholder="phone number"/>
            {errors.phone && <span className="error_message">phone field is required</span>}

            <input type="submit" value="Submit Now"/>
            </form>
        </div>
  );
}

export default Shipment;