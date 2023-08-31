import { useEffect, useState } from "react";
import axios from "axios";
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

function EditSubCategory() {

    var [getAllCat, setAllCat] = useState([]);
    var [getAllSubCat, setAllSubCat] = useState([])
    var [subcat, setSubCat] = useState();
    var [catId, setCatId] = useState();
    var [cattid, setcattid] = useState();

    const notify = () => toast.warn("Please select category", {
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

    useEffect(() => {
        getCat();
    }, []);

    var loadSubCat = (catid) => {
        console.log("loadSubCat " + catId)
        console.log("loadSubCat " + catid)
        axios.get(`http://localhost:8080/menu/subcategoriesByCatId/${catid}`)
            .then(function (response) {
                // handle success
                // console.log(response);
                setCatId(catid)
                setAllSubCat(response.data)
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function () {
                // always executed
            });
    }

    var loadSubCatAfterEdit = () => {
        console.log("loadSubCatAfterEdit " + catId)
        axios.get(`http://localhost:8080/menu/subcategoriesByCatId/${catId}`)
            .then(function (response) {
                // handle success
                // console.log(response);
                setAllSubCat(response.data)
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function () {
                // always executed
            });
    }

    var addSubCat = () => {
        var cat =
        {
            "subCategoryName": document.getElementById("cat").value
        }
        // console.log(cat)

        if (catId != null) {
            axios.post(`http://localhost:8080/menu/subcategories/${catId}`, cat)
            .then(function (response) {
                // console.log(response);
                loadSubCatAfterEdit()
            })
            .catch(function (error) {
                // console.log(error);
            });
        }else{
            notify();
        }
        
    }

    var handleChange = (args) => {
        setSubCat(args.target.value)
        console.log(args.target.value)
    }

    var deleteCat = (catid) => {
        console.log(catid)

        axios.delete(`http://localhost:8080/menu/subcategories/${catid}`)
            .then(function (response) {
                // handle success
                // console.log(response);
                loadSubCatAfterEdit()
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
        setcattid(id);
    }

    var UpdateCategory = () => {
        //    console.log(ide+"editCategory")
        var changedName = document.getElementById("editCat").value;
        console.log("gfddgdg" + changedName);
        axios.put(`http://localhost:8080/menu/subcategories/${cattid}/${changedName}`)
            .then(res => {
                loadSubCatAfterEdit();
            })

    }

    return (
        <div className="m-4">
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Order Details</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <table className="table table-striped table-sm">
                                <tbody>
                                    <tr>
                                        <td>Enter sub-category name:</td>
                                        <td>
                                            <input type={"text"} id="editCat" placeholder="enter sub-category name"></input>
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

            <div className="mt-4">
                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Select category
                    </button>
                    <ul className="dropdown-menu">
                        {
                            getAllCat.map((cat) => {
                                return (
                                    <li key={cat.id}><a className="dropdown-item" onClick={() => loadSubCat(cat.id)}>{cat.categoryName}</a></li>
                                )
                            })
                        }
                    </ul>
                </div>
                <div>
                    <center>
                        <table className="table table-borderless">
                            <thead>
                                <tr>
                                    <th scope="col">SubCategories</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    getAllSubCat.map((c) => {
                                        return (
                                            <tr key={c.id}>
                                                <td>{c.subCategoryName}</td>
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
                                        <input type="text" className="form-control" id="cat" placeholder="Enter category"
                                            onChange={handleChange} />
                                    </td>
                                    <td>
                                        <button type="submit" className="btn btn-primary mb-3" onClick={() => { addSubCat() }}>Add</button>
                                        <ToastContainer />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </center>
                </div>
            </div>
        </div>
    )
}

export default EditSubCategory;