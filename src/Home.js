import React from 'react';
import './Home.css';
import Product from './Product';

function Home() {
    return (
        <div className="home">
            <div className="home_container">
            <img  className="home_image"
                src="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/October/Fuji_Tallhero_Dash_en_US_1x._CB418727898_.jpg"
                alt=""
                // height="750"
            />
            </div>

            <div className="home_row">
                <Product
            id="223"
            title="Heroku"
            price={20.45}
            image="https://images-na.ssl-images-amazon.com/images/I/41A+LoN2W3L._AC_US160_.jpg"
            rating={4}
             />
            <Product 
            id="1122"
            title="Acer"
            price={200.45}
            image="https://m.media-amazon.com/images/I/81QpkIctqPL._AC_SS350_.jpg"
            rating={5} />
            <Product 
            id="1132221"
            title="Pavilion"
            price={2000.45}
            image="https://m.media-amazon.com/images/I/81HX5N0RPWL._AC_SS350_.jpg"
            rating={5} />
            </div>
            <div className="home_row">
                   <Product 
            id="11431"
            title="controller"
            price={2000.45}
            image="https://images-na.ssl-images-amazon.com/images/I/71UGrrlzdJL._AC_UL160_SR160,160_.jpg"
            rating={4} />
            </div> 
            <div className="home_row">
            <Product 
            id="1123231"
            title="Last of Us"
            price={2212.45}
            image="https://images-na.ssl-images-amazon.com/images/I/51RMPpeTXyL._AC_UL160_SR160,160_.jpg"
            rating={4} />   
                


            </div>
            
        </div>
    )
}

export default Home
