import React from 'react'
import { getBasketTotal } from './Reducer';
import { useStateValue } from './StateProvider';
import './Subtotal.css';
import CurrencyFormat from "react-currency-format";
import { useHistory } from 'react-router-dom';

function Subtotal() {
    const history =useHistory();
    const [{basket}]=useStateValue();

    return <div className="subtotal">
        <CurrencyFormat
         renderText={(value) =>(
             <>
             <p>
                 Subtotal ({basket?.length} items):
                 <strong>
                     {value}
                 </strong>
             </p>
             <small className="subtotal_gift">
                 <input type="checkbox"/>This Order contains a subtotal_gift

             </small>
             </>
         )}
         decimalScale={2}
         value={getBasketTotal(basket)}
         displayType={"text"}
         thousandSeparator={true}
         prefix={"$"}       
        
        
        />
       
        <button onClick={e => history.push('/payment')}>Proceed to checkout</button>
            
        </div>
    
}

export default Subtotal;
