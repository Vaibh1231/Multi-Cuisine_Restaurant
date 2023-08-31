import { useEffect, useState } from "react";
import axios from 'axios';

function AllOrderHistory() {
    const [receivedOrder, setReceivedOrder] = useState([])

    let getAllorder = async()=>{
        const result = await axios.get("http://localhost:8080/user/getAllOrdersWithStatus");
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
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                            <th scope="col">Customer name</th>
                            <th scope="col">Address</th>
                            <th scope="col">Ordered products</th>
                            <th scope="col">Date</th>
                            <th scope="col">Phone number</th>
                            <th scope="col">Status</th>
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
                                            <td>
                                                {o.orderItemList.map((item)=>
                                                {
                                                    return (                                  
                                                        <>
                                                           {item.product.item_name}*{item.quantity}
                                                           <br></br>
                                                           </>
                                                    )
                                                })}
                                            </td>
                                            <td>
                                               {o.placedOn}
                                            </td>
                                            
                                            <td>
                                               {o.user.phoneNo}
                                            </td>
                                            <td>
                                                {
                                                    o.orderStatus === "Delivered" ? <h6 className="delivered">{o.orderStatus}</h6> : <h6 className="other">{o.orderStatus}</h6>
                                                }
                                               
                                            </td>
                                            
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                        </table>
                </div>

                
        )
}

export default AllOrderHistory;