import axios from "axios";
import { useEffect, useState } from "react";
import './Menu1.css'


function EditCategory() {

    // var categories = [
    //     {
    //         "id": 4,
    //         "categoryName": "Dessert"
    //     },
    //     {
    //         "id": 1,
    //         "categoryName": "Drinks & snacks"
    //     },
    //     {
    //         "id": 3,
    //         "categoryName": "Main course"
    //     },
    //     {
    //         "id": 2,
    //         "categoryName": "Soup & salad"
    //     }
    // ]

    var [getAllCat, setAllCat] = useState([]);
    var [cat, setCat] = useState();
    var [modeldata, setModeldata] = useState({
        catId: "",
        catName: "NA"
    })
    var [cattid, setcattid] = useState();

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

    var addCat = () => {
        var cat =
        {
            "categoryName": document.getElementById("cat").value
        }
        // console.log(cat)

        axios.post("http://localhost:8080/menu/categories", cat)
            .then(function (response) {
                // console.log(response);
                getCat();
            })
            .catch(function (error) {
                // console.log(error);
            });
    }

    var handleChange = (args) => {
        setCat(args.target.value)
        console.log(args.target.value)
    }

    var deleteCat = (catId) => {
        axios.delete(`http://localhost:8080/menu/categories/${catId}`)
            .then(function (response) {
                // handle success
                // console.log(response);
                getCat();
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
        console.log(id + "editBtnClk")
        setcattid(id);
    }

    var UpdateCategory = () => {
        //    console.log(ide+"editCategory")
        var changedName = document.getElementById("editCat").value;
        console.log("gfddgdg" + changedName);
        axios.put(`http://localhost:8080/menu/categories/${cattid}/${changedName}`)
            .then(res => {
                getCat();
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
                                <thead className="thead-light">
                                    
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Enter category name:</td>
                                        <td>
                                            <input type={"text"} id="editCat" placeholder="enter category name"></input>
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
            <center>
                <table className="table table-borderless">
                    <thead>
                        <tr>
                            <th scope="col">Categories</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            getAllCat.map((c) => {
                                return (
                                    <tr key={c.id}>
                                        <td>{c.categoryName}</td>
                                        <td>
                                            <button type="button" className="btn btn-outline-primary" onClick={() => editBtnClk(c.id)} data-bs-toggle="modal" data-bs-target="#exampleModal">Edit</button>
                                            {" "}
                                            <button type="button" className="btn btn-outline-danger" onClick={() => { deleteCat(c.id) }}>Delete</button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>

                <div className="row g-3">
                    <div className="col-auto">
                        <input type="text" className="form-control" id="cat" placeholder="Enter category"
                            onChange={handleChange} />
                    </div>
                    <div className="col-auto">
                        <button type="submit" className="btn btn-primary mb-3" onClick={() => { addCat() }}>Add</button>
                    </div>
                </div>

            </center>
        </div>
    )
}

export default EditCategory;