import axios from "axios";
import { useEffect, useState } from "react";
import '../../node_modules/bootstrap/dist/css/bootstrap.css'
import './Menu1.css'
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

function MenuCard() {

    var [getAllCat, setAllCat] = useState([]);
    var [getAllProd, setAllProd] = useState([])

    // var [cat, setCat] = useState();

    var getMenu = () => {
        axios.get("http://localhost:8080/menu/categories")
            .then(function (response) {
                // handle success
                console.log(response.data);
                setAllCat(response.data)
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function () {
                // always executed
            });
    }

    useEffect(() => {
        getMenu();
    }, []);

    var loadProducts=(subCatId)=>
    {
        // console.log(subCatId)
        axios.get(`http://localhost:8080/menu/productBySubCatId/${subCatId}`)
        .then(function (response) {
            // handle success
            console.log(response.data);
            setAllProd(response.data)
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });
    }

    var addToCart=(prodId)=>
    {
        console.log(prodId)
        axios.post(`http://localhost:8080/cart/addToCart/${sessionStorage.getItem("cartId")}/${prodId}`)
        console.log("addedToCart");
        notify();
    }

    const notify = () => toast.success("Item added to cart", {
        theme: "colored", autoClose: 1000 
      })

    

    return (
        
        <div className="m-4">
            <h4 style={{marginLeft:450 }} >     Select category :</h4>
            <br></br>
            <center>
            <div className="row">
                {
                    getAllCat.map((cat) => {
                        return (
                            <div className="dropdown col-2" key={cat.id}>
                            <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="true">
                                {cat.categoryName}
                            </button>
                            <ul className="dropdown-menu">
                                {
                                    cat.subCategories.map((subCat)=>
                                    {
                                        return (
                                            <li key={subCat.id}>
                                                <button className="dropdown-item" onClick={()=>{loadProducts(subCat.id)}}>{subCat.subCategoryName}</button>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                        )
                    })
                }
            </div>
            </center>
            <br></br>
            <center>
            <hr className="horLine"></hr>
            </center>
            <br></br>
            
            <div className="container ">
                <div className="row">
                {
                    getAllProd.map((prod)=>
                    {
                        // debugger
                        return (
                            <div className="col-4 " key={prod.id} >
                            <div className="main-div itemBg">
                                <div className="content" >
                                    <div className="title">
                                        <h4>{prod.item_name}</h4> <p> </p> 
                                        <h6 className="fs-6 fw-light">Rs. {prod.price}/-</h6>
                                    </div>
                                    <button className="btn btn-primary" onClick={()=>{addToCart(prod.id)}}>add to cart</button>
                                    <ToastContainer />
                                </div>
                            </div>
                            </div>
                             
                        )
                    })
                }
            </div>
        </div>
        </div>
    )
}

export default MenuCard