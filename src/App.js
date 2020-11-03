import React, { useEffect } from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import './App.css';
import Header from './Header';
import Home from './Home';
import Checkout from './Checkout';
import Login from './Login';
import { auth } from './firebase';
import { useStateValue } from './StateProvider';
import Payment from './Payment';
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import Orders from './Orders';

const promise = loadStripe('pk_test_51HiviFH4p5tTdSy5dUBZZFrQcLkDJuhdozaowX3ukVKAzBIja7TaMsE1ZZ0NbjnMIKETAPUe654vvA3Xwu5uIr4T00V9t0tbWG');

function App() {
  const [{},dispatch]=useStateValue();
  // setting up useeffect to track users logged in//runs once when app loads
  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      console.log(" THE USER IS>>> ",authUser);

      if(authUser){
        // user is logged in or was looged
        dispatch({
          // DISPATCHES USER TO THE DATA LAYER
          type: 'SET_USER',
          user:authUser,
        })
      }else{
        dispatch({
          type:'SET_USER',
          user:null,
        })

      }
    })
    
  }, [])
  return (
    
    <Router>
      <div className="app">
          <Header />
        <Switch>
          <Route path="/orders">            
              <Orders />
          </Route>          
           <Route path="/payment">    
              <Elements stripe={promise}     >
                  <Payment />
              </Elements>
              
          </Route>
          <Route path="/checkout">            
              <Checkout />
          </Route>
          <Route path="/login">             
              <Login />
          </Route>
          <Route path="/">            
            <Home />                        
          </Route>
        </Switch>
      </div>
    </Router>
    
    
  );
}

export default App;
