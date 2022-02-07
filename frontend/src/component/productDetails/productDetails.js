import axios from "axios";
import React, { useState, useEffect } from "react";
import "./getAllProducts.css";
import jwt_decode from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactStars from "react-rating-stars-component";


toast.configure();
const ProductDetails = ()=>{ 

const state = useSelector((state) => {
        return {
          isLoggedIn: state.loginReducer.isLoggedIn,
          token: state.loginReducer.token,
          products: state.productReducer.products,
        };
});

//// decode tokenizer
const decode = state.token &&jwt_decode(state.token);
const navigate = useNavigate();

const [productDetails, setproductDetails] = useState([])
const [showComment,setshowComment] = useState(false)
const [commentsOnProduct,setcommentsOnProduct] =useState([])
const [createComment,setcreateComment] = useState("")
 
const {id} = useParams()
//////////////////////////////
 const getProductById = axios.get(`http://localhost:5000/search_1?id=${id}`).then((response)=>{
    setproductDetails(response.data.results)
  }).catch((err)=>{
    toast.error(err.response.data.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
  })
/////////////////////////////
  const getAllComment = axios.get(`http:localhost:5000/comment/product/${id}`).then((response)=>{
    setcommentsOnProduct(response.data.results)
  }).catch((err)=>{
    toast.error(err.response.data.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
  })

  ///// function to create new comment
const newComment = {comment: createComment,user_id:decode.userId,product_id:id}
  const createNewComment = axios.post(`http:locahost:5000/comment/${id}`,newComment, {
    headers: {
      Authorization: `Basic ${state.token}`,
    },
  })
/////////////////////
  useEffect(() => {
    getProductById()
  },[commentsOnProduct])
///////////////////////////////
  const allComments = commentsOnProduct && commentsOnProduct.map((comment)=>{
      return(
         <div className="all-comments">
             <div className="just-one-comment">
             <p>{comment.name}</p>
            <p>{comment.comment}</p>
            <p>{comment.publishedDate}</p>
          </div>
         </div>
      )
  })



//////////////////////////////////
  const productDetailsToShow = productDetails&& productDetails.map((element)=>{
return (
<div className= "all-div-componenet">
<div>
 <div className="product-image-description">
     <p>{element.title}</p>
     <br/>
    <img src={element.image}/>
    <br/>
   <p>{element.description}</p>
   <br/>
</div>
////////////
 <div className="container-chating-rate-reviews">
<div className="product-seller-chat">
  <img src="https://media.istockphoto.com/photos/live-chat-social-media-communication-message-picture-id691388370"/>
  <br/>
  <button onClick={(e)=>{
    //   navigate("/chat")
  }}></button>
  <br/>
</div> 
////////////////
<div className="product-add-comment-rate">
{state.token ?<ReactStars
    size= {26}
    count= {5}
    color= "black"
    activeColor= "red"
    value= {7.5}
    a11y= {true}
    isHalf= {true}
    emptyIcon= {<i className="far fa-star" />}
    halfIcon={<i className="fa fa-star-half-alt" />}
    filledIcon={<i className="fa fa-star" />}
    onChange= {newValue => {
      console.log(`Example 2: new value is ${newValue}`);
    }}
    /> :null}
    <br/>

    <button onClick={(e)=>{
   getAllComment()
   setshowComment(!showComment)  
    }
       
    }>Show reviews</button>

</div>
</div>
/////////////////

</div>

<div className="all-comment-div">

{ showComment? <div className="comment-reviews">

{allComments? allComments:toast.warn("No comment on this product", {
        position: toast.POSITION.BOTTOM_RIGHT,
})}

{ state.token ?<div><textarea onChange={(e)=>{
       setcreateComment(e.target.value);
   }} className="text-area"/>
   <br/>   
 <button className="btn-to-create-comment" onClick={(e)=>{
createNewComment()
 }}> Add Comment</button> </div>:null}
 <br/>
</div>

:null}

</div>

</div>


)
    
})
///////////////////////////////
return (

 <div>

{productDetailsToShow ? productDetailsToShow : null}

 </div>


)
//////////////////////////////

}


export default ProductDetails