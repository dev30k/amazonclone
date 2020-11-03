import React, { useEffect, useState } from 'react';
import './Payment.css';
import { useStateValue } from './StateProvider';
import CheckoutProduct from './CheckoutProduct';
import { Link ,useHistory} from 'react-router-dom';
import {CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { getBasketTotal } from './Reducer';
import  CurrencyFormat  from 'react-currency-format';
import axios from './axios';
import instance from './axios';
import { db } from './firebase';

function Payment() {
    const [{basket,user},dispatch]=useStateValue();
    const stripe = useStripe();
    const elements = useElements();
    const history=useHistory();
    const [error,setError]=useState(null);
    const [disabled,setDisabled]=useState(true);
    const [processing,setProcessing]=useState("");
    const [succeeded,setSucceeded]=useState(false);
    const [clientSecret,setClientSecret] =useState(true);


    useEffect(() =>{
        // generates the special stripe secret that allows us to charge customer
    // also when cart cahnges 
    const getClientSecret = async () =>{
        const response =await axios({
            method: 'post',
            // stripe expexts currency subunits
            url : `/payments/create?total=${getBasketTotal(basket)* 100}`
        });
        setClientSecret(response.data.clientSecret)
    }
     getClientSecret();

    },[basket])
    console.log('secret is>>>|||',clientSecret)

    const handleSubmit =async (event)=>{
        event.preventDefault();
        setProcessing(true);

        // const payload =await stripe
        const payload = await stripe.confirmCardPayment(clientSecret,{
            payment_method:{
                card: elements.getElement(CardElement)
            }
        })
        .then(({paymentIntent})=>{
            db
            .collection('users')
            .doc(user?.uid)
            .collection('orders')
            // console the user
            .doc(paymentIntent.id)
            .set({
                basket: basket,
                amount: paymentIntent.amount,
                created: paymentIntent.created
            })
            // paymentIntent is payment confirmation
            setSucceeded(true);
            setError(null)
            setProcessing(false)

            dispatch({
                type: 'EMPTY_BASKET'
            })

            history.replace('./orders')

        })


    }
    const handleChange=event=>{
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    }

    return (
        <div className="payment">
            <div className="payment__container">
                <h1>Checkout(
                <Link to="/checkout">{basket?.length}  items</Link>
                    )</h1>

                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Delivery Address</h3>
                    </div>
                    <div className="payment__address">
                        <p>{user?.email}</p>
                        <p>LA</p>
                        <p>12343</p>
                    </div>

                </div>
               <div className="payment__section">
                   <div className="payment__title">
                       <h3>Review and delivery</h3>
                   </div>
                   <div className="payment__items">
                       {/* products show here */}
                       {basket.map(item =>(
                           <CheckoutProduct 
                            id={item.id}
                            title={item.title}
                            image={item.image}
                            price={item.price}
                            rating={item.rating}
                           
                           />
                       ))}
                   </div>
                    
                </div>

                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Payment Method</h3>
                    </div>
                    <div className="payment__details">
                        {/* stripe magic  goes here*/}
                        <form  onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange} />
                            <div className="payment__pricecontainer">
                               <CurrencyFormat 
                               renderText={(value)=>(
                                   <h3>Order Total: {value}</h3>

                               )}
                               decimalScale={2}
                               value={getBasketTotal(basket)}
                               displayType={"text"}
                               thousandSeparator={true}
                               prefix={"$"}                      
                               
                               />
                               <button 
                               disabled={processing || disabled|| succeeded}>
                                   <span>{processing ? <p>Processing</p> :
                                   "Buy Now"}</span>

                               </button>
                                                            

                            </div>
                            {error && <div>
                                {error}
                            </div>}
                        </form>
                    </div>
                    
                </div>
            </div>
            
        </div>
    )
}

export default Payment
