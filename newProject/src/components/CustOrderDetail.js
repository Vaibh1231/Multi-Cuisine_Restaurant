import { useEffect, useState } from "react";
import axios from 'axios';

function AllOrderHistory() {
    const [receivedOrder, setReceivedOrder] = useState([])

    let getAllorder = async () => {
        const result = await axios.get(`http://localhost:8080/user/orderHistoryByCustId/${sessionStorage.getItem("custId")}`);
        console.log(result.data);
        setReceivedOrder(result.data);

    }

    useEffect(() => {
        getAllorder();
    }, [])

    return (

        <div className="m-4">
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col">Customer name</th>
                        <th scope="col">Address</th>
                        <th scope="col">Ordered products</th>
                        <th scope="col">Date</th>
                        <th scope="col">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        receivedOrder.map((o) => {
                            return (
                                <tr key={o.id}>
                                    <td>{o.user.firstName + " " + o.user.lastName}</td>
                                    <td>{o.user.address}</td>
                                    <td>
                                        {o.orderItemList.map((item) => {
                                            return (
                                                <h6 key={item.id}>{item.product.item_name}*{item.quantity} </h6>
                                            )
                                        })}
                                    </td>
                                    <td>
                                        <h6>{o.placedOn}</h6>
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