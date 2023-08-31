import { useNavigate } from 'react-router-dom';


function EditMenu() {
    const navigate = useNavigate()

    var goToCatEdit=()=>
    {
        navigate('/editCategory')
    }
    
    return (<center>
            <div className="m-4 col-12">
                <a href="/editCategory" className="btn btn-primary mt-4" onClick={goToCatEdit()}>Edit category</a>
                <br></br>
                <a href="/editSubCategory" className="btn btn-primary mt-4">Edit Subcategory</a>
                <br></br>
                <a href="/editProduct" className="btn btn-primary mt-4">Edit Product</a>
            </div>
            </center>
            
            )
}

export default EditMenu;