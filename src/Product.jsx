// import React from 'react'
// import './Product.css'
// import { useStateValue } from "./StateProvider";

// function Product({ id,title, image, price, rating }) {
//   const [{ basket},dispatch] = useStateValue();
     
//       // isse console me dekh skte hai inspect krke
//        console.log("this is the basket >>> ", basket);
  
//     const addToBasket = ()=>{
//        //dispatch the item into the data layer
//       //  header.jsx me jaake basket to acces kr lenge kyuki checkout ka page whi hai 
//        dispatch({
//         type: "ADD_TO_BASKET",
//         item: {
//             id:id,
//             title:title,
//             image:image,
//             price:price,
//             rating:rating,
//         },
//        });
//     };

//   return (
//     <div className="product_container">
//          <div className="product">
//       <div className="product_info">
//         <p>{title}</p>
//         <p className="product_price">
//             <small>$</small>
//             <strong>{price}</strong>
//         </p>
//         <div className="product_rating">
//           {Array (rating)
//           .fill()
//           .map((_, i)=>(
//             <p>🌟</p>
//           ))}
//         </div>
//       </div>
//       <img src={image}alt=""/>
//       <button onClick={addToBasket}>Add to Basket</button>
//     </div>
//     </div>
//  )
// }

// export default Product
