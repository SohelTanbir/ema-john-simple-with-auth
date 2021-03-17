import Header from './components/Header/Header';
import './components/Header/Header.css'
import './App.css';
import Shop from './components/Header/Shop/Shop';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"; 
import Review from './components/Review/Review';
import Inventory from './components/Inventory/Inventory';
import Notfound from './components/Notfound/Notfound';
import ProductDetails from './components/ProductDetails/ProductDetails';
import Login from './components/Login/Login';
import Shipment from './components/Shipment/Shipment';
import { createContext, useState } from 'react';
import PrivateRoute from './components/PrivateRoute/PrivateRoute'

export const userContext = createContext()

function App() {
  const [loggedInUser, setLoggedInUser] = useState();
  return (
    <userContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
      <Header></Header>
        <Route path="/shop">
          <Shop></Shop>
        </Route>
        <Route path="/review">
          <Review></Review>
        </Route>
        <PrivateRoute path="/inventory">
          <Inventory></Inventory>
        </PrivateRoute>
        <Route path="/login">
         <Login/>
        </Route>
        <PrivateRoute path="/shipment">
         <Shipment/>
        </PrivateRoute>
        <Route exact path="/">
          <Shop></Shop>
        </Route>
        <Route path="/product/:productKey">
          <ProductDetails></ProductDetails>
        </Route>
      </Router>
    </userContext.Provider>
  );
}

export default App;
