import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Cart.css'

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate()

  var loadProduct = () => {
    axios.get(`http://localhost:8080/cart/getCartItemByCartItemId/${sessionStorage.getItem("cartId")}`)
      .then(response => {
        setCartItems(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  useEffect(() => {
    loadProduct();
  }, []);

  var increment = (itemdId, qty) => {
    axios.put(`http://localhost:8080/cart/editCart/${itemdId}/${qty + 1}`)
      .then(function (response) {
        // console.log("+")
        loadProduct();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  var decrement = (itemdId, qty) => {
    if (qty != 1) {
      axios.put(`http://localhost:8080/cart/editCart/${itemdId}/${qty - 1}`)
        .then(function (response) {
          // console.log("-")
          loadProduct();
        })
        .catch(function (error) {
          console.log(error);
        });
    }

  }

  var remove = (itemdId) => {
    // console.log(itemdId)
    axios.delete(`http://localhost:8080/cart/removeItem/${itemdId}`)
      .then(function (response) {
        //   console.log("Remove")
        console.log(response.data)
        loadProduct();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  var placeOrder = (cartId) => {
    console.log(cartId)
    axios.get(`http://localhost:8080/user/addStatus/${cartId}`);
    axios.put(`http://localhost:8080/cart/placeOrder/${cartId}`);
    navigate('/menu')

  }

  return (
    <div id = 'cart' className='m-4'>
      
      {cartItems.length > 0 ? <><h1>Cart</h1><table className="table " >
        <thead className="thead-dark">
          <tr>
            <th scope="col">Item Name</th>
            <th scope="col">Quantity</th>
            <th scope="col">Price</th>
            <th scope="col">Total</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map(item => (
            <tr key={item.id}>
              <td>{item.product.item_name}</td>
              <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                <button type="button" className="btn btn-outline-primary" onClick={() => { decrement(item.id, item.quantity) }}>-</button>
                <button type="button" className="btn btn-warning">{item.quantity}</button>
                <button type="button" className="btn btn-outline-primary" onClick={() => { increment(item.id, item.quantity) }}>+</button>
              </div>
              <td>Rs. {item.product.price}/-</td>
              <td>Rs. {item.quantity * item.product.price}/-</td>
              <td>
                <button className="btn btn-danger" onClick={() => { remove(item.id) }}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3" className="text-right">Subtotal</td>
            <td>Rs. {cartItems.reduce((acc, item) => acc + item.quantity * item.product.price, 0)}/-</td>
            <td></td>
          </tr>
          <tr>
            <td colSpan="3" className="text-right">Tax (18%)</td>
            <td>Rs. {(cartItems.reduce((acc, item) => acc + item.quantity * item.product.price, 0) * 0.18).toFixed(2)}/-</td>
            <td></td>
          </tr>
          <tr>
            <td colSpan="3" className="text-right">Total</td>
            <td><b>Rs. {(cartItems.reduce((acc, item) => acc + item.quantity * item.product.price, 0) * 1.18).toFixed(2)}/-</b></td>
            <td></td>
          </tr>
        </tfoot>
      </table><div className="d-grid gap-2 col-6 mx-auto">
        {/* <button type="button" class="btn btn-primary btn-lg">Place order</button> */}
        <a type="button" className="btn btn-primary btn-lg" /*href='/menu'*/ onClick={() => { placeOrder(sessionStorage.getItem("cartId")) }}>Place order</a>
      </div></>: <h3 style={{marginLeft:100}}>Cart is empty</h3>}

      
      
    </div>
  );
}

export default Cart;


