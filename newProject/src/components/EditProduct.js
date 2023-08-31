import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

function EditProduct() {
    var [getAllCat, setAllCat] = useState([]);
    var [getAllSubCat, setAllSubCat] = useState([])
    var [getAllProd, setAllProd] = useState([])
    var [prod, setProd] = useState()
    var [price, setPrice] = useState()
    var [subCatId, setSubCatId] = useState()
    var [prodId, setProdId] = useState()

    const notify = () => toast.warn("Please select subcategory", {
        theme: "colored"
      })

    var getCat = () => {
        axios.get("http://localhost:8080/menu/categories")
            .then(function (response) {
                // handle success
                // console.log(response);
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

    var getProduct=(sCatId)=>
    {
        console.log(sCatId)
        axios.get(`http://localhost:8080/menu/productBySubCatId/${sCatId}`)
            .then(function (response) {
                // handle success
                // console.log(response);
                setSubCatId(sCatId)
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

    var loadProductAfterEdit = () => {
        console.log("loadProductAfterEdit " + prodId)
        axios.get(`http://localhost:8080/menu/productBySubCatId/${subCatId}`)
            .then(function (response) {
                // handle success
                // console.log(response);
                // setAllSubCat(response.data)
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

    useEffect(() => {
        getCat();
    }, []);

    var handleChange = (args) => {
        setProd(args.target.value)
        console.log(args.target.value)
    }

    var handleChange1 = (args) => {
        setPrice(args.target.value)
        console.log(args.target.value)
    }

    var deleteCat = (prodid) => {
        console.log(prodid)

        axios.delete(`http://localhost:8080/menu/products/${prodid}`)
            .then(function (response) {
                // handle success
                // console.log(response);
                loadProductAfterEdit()
            })
            .catch(function (error) {
                // handle error
                // console.log(error);
            })
            .finally(function () {
                // always executed
            });
    }

    var editBtnClk = (id) => {
        console.log(id+"editBtnClk")
        // setcattid(id);
        setProdId(id)
    }

    var addProduct=()=>
    {
        var cat =
        {
            "item_name": document.getElementById("cat").value,
            "price": document.getElementById("price").value
        }
        // console.log(cat)

        if (subCatId != null) {
            axios.post(`http://localhost:8080/menu/products/${subCatId}`, cat)
            .then(function (response) {
                // console.log(response);
                loadProductAfterEdit()
            })
            .catch(function (error) {
                // console.log(error);
            });
        }else{
            notify()
        }
        
    }

    var UpdateCategory = () => {
        // //    console.log(ide+"editCategory")
        var changedName = document.getElementById("editCat").value;
        var changedPrice = document.getElementById("editPrice").value;
        console.log("gfddgdg" + changedName);
        axios.put(`http://localhost:8080/menu/products/${prodId}/${changedName}/${changedPrice}`)
            .then(res => {
                loadProductAfterEdit()
            })

    }

    return (

        <div className="dropdown m-4">

            <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                Select sub-category
            </button>
            <ul className="dropdown-menu">
                {
                    getAllCat.map((cat) => {
                        return (
                            <li key={cat.id}>
                                <h5>{cat.categoryName}</h5>
                                {
                                    cat.subCategories.map((sCat)=>
                                    {
                                        return (
                                            <a className="dropdown-item" key={sCat.id} onClick={()=>getProduct(sCat.id)}>{sCat.subCategoryName}</a>
                                        )
                                    })
                                }
                            </li>
                        )
                    })
                }
            </ul>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Order Details</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <table className="table table-striped table-sm">
                                <thead className="thead-light">
                                    <tr>
                                        <th>Product name</th>
                                        <th>Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <input type={"text"} id="editCat" placeholder="enter product name" name=""></input>
                                        </td>
                                        <td>
                                            <input type="number" id="editPrice" placeholder="enter price" name=""></input>
                                        </td>
                                        <td>
                                            <button onClick={UpdateCategory} className="btn btn-success">Update</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    </div>
                </div>
            <div>
                    <center>
                        <table className="table table-borderless">
                            <thead>
                                <tr>
                                    <th scope="col">Product name</th>
                                    <th scope="col">Price (Rs)</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    getAllProd.map((c) => {
                                        return (
                                            <tr key={c.id}>
                                                <td>{c.item_name}</td>
                                                <td>
                                                    {c.price}
                                                </td>
                                                <td>
                                                    <button type="button" className="btn btn-outline-primary" onClick={() => editBtnClk(c.id)} data-bs-toggle="modal" data-bs-target="#exampleModal">Edit</button>
                                                    {" "}
                                                    <button type="button" className="btn btn-outline-danger" onClick={() => { deleteCat(c.id) }}>Delete</button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                                <tr>
                                    <td>
                                        <input type="text" className="form-control" id="cat" placeholder="Enter product name"
                                            onChange={handleChange} />
                                    </td>
                                    <td>
                                        <input type="text" className="form-control" id="price" placeholder="Enter price"
                                            onChange={handleChange1} />
                                    </td>
                                    <td>
                                        <button type="submit" className="btn btn-primary mb-3" onClick={() => { addProduct() }}>Add</button>
                                        <ToastContainer />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </center>
                </div>
        </div>
    )
}

export default EditProduct;