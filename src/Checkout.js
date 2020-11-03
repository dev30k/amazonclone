import React from 'react';
import { useStateValue } from './StateProvider';
import './Checkout.css';
import CheckoutProduct from './CheckoutProduct';
import Subtotal from './Subtotal';
    
function Checkout() {
    const [{basket,user},dispatch]=useStateValue();
    return <div className="checkout">
        <div className="checkout_left">           
       
        <img className="checkout_ad"
            src="data:image/jpeg;base64,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"
         alt="" /> 
        {/* </div>  */}
        {basket?.length == 0?(
            
                <h2>Your shopping basket is empty</h2>
         ) :(
            <div className="checkout_title">
                
                <h2>Your shopping basket</h2>
                 <h3>{user?.email}</h3>
                {/* listing out all checkout basket products*/}
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
        )}  
        </div> 
        {basket.length >0 &&(
            <div className="checkout_right">
                <h1>Subtotal</h1>
                <Subtotal />
                
            </div>
        )}
       </div>
}

export default Checkout;
