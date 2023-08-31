import { useEffect, useState } from "react";
import axios from 'axios';

function AssignedToDb() {
    const [receivedOrder, setReceivedOrder] = useState([])

    let getAllorder = async()=>{
        const result = await axios.get("http://localhost:8080/user/getListAssignedToDB");
            console.log(result.data);
            setReceivedOrder(result.data);
        
    }

    useEffect(()=>
    {        getAllorder();
    },[])

    var assignToDb=(index)=>
    {
        axios.put(`http://localhost:8080/user/delivered/${index}`, {
          })
          .then(function (response) {
            console.log(response);
            getAllorder();
          })
          .catch(function (error) {
            console.log(error);
          });

        
    }

    return (
                
                <div className="m-4">
                    {
                        receivedOrder.length > 0 ?<table className="table table-bordered">
                        <thead>
                            <tr>
                            <th scope="col">Customer name</th>
                            <th scope="col">Address</th>
                            <th scope="col">Phone number</th>
                            <th scope="col">Ordered products</th>
                            <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                receivedOrder.map((o)=>
                                {
                                    return (
                                        <tr key={o.id}>
                                            <td>{o.user.firstName + " " + o.user.lastName}</td>
                                            <td>{o.user.address}</td>
                                            <td>{o.user.phoneNo}</td>
                                            <td>
                                                {o.orderItemList.map((item)=>
                                                {
                                                    return (                                  
                                                           <h6 key={item.id}>{item.product.item_name}*{item.quantity} </h6>
                                                    )
                                                })}
                                            </td>
                                            <td>
                                                <button onClick={()=>{assignToDb(o.id)}} className="btn btn-primary">Delivered</button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                        </table> : <h4 style={{marginLeft:100}}>All orders are delivered</h4>
                    }
                    
                </div>

                
        )
}

export default AssignedToDb;