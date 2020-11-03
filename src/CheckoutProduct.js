import React from 'react';
import { useState } from 'react';
import'./CheckoutProduct.css';
import { useStateValue } from './StateProvider';

function CheckoutProduct({id,title,image,price,rating,hideButton}) {
    const [{basket},dispatch]=useStateValue();

    console.log(id,price,image,rating,title);
    const removeFromBasket=()=>{
        // REMOVE ITEM FROM BASKET
        dispatch({
            type:"REMOVE_FROM_BASKET",
            id: id,
        })
    }
    // const [isButton,setButton]=useState(false);
    

    return (<div className="checkoutProduct">
        <img className="checkoutProduct_image"src={image} alt="" />
        <div className="checkoutProduct_info"
        //  onMouseEnter={()=>setButton(true)}
        //  onmouseleave={()=> setButton(false)}       
        >
            <p className="checkoutProduct_title">{title}</p>

            <p className="checkoutProduct_price">
                <small>$</small>
                <strong>{price}</strong>
            </p>

            <div className="product_rating">
                {
                    Array(rating)
                        .fill()
                        .map((_) => (
                            <p>*</p>
                        ))
                }

            </div>
            
            {!hideButton &&(

            <button onClick={removeFromBasket}
             className="checkoutProduct_button">Remove from basket</button>)}
             
        </div>
            
    </div>);
    
}

export default CheckoutProduct;
