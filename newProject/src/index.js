import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import reportWebVitals from './reportWebVitals';
import { Routes, Route, BrowserRouter } from "react-router-dom"

import MenuCard from './components/MenuCard';
import EditMenu from './components/EditMenu';
import EditCategory from './components/EditCategory';
import EditSubCategory from './components/EditSubCategory';
import EditProduct from './components/EditProduct';
import OrderReceived from './components/OrderReceived';
import AssignedToDb from './components/AssignedToDB';
import AllOrderHistory from './components/AllOrderHistory';
import Cart from './components/Cart';

import CustOrderDetail from './components/CustOrderDetail';


//pranav
import MyNavbar from './components/MyNavbar';
import SeeFeedback from './UserSide/SeeFeedback';
import AddFeedback from './UserSide/AddFeedback';
import UserFeedback from './UserSide/UserFeedback';
import Manager from './ManagerSide/Manager';
import NotRespondedFeedback from './ManagerSide/NotRespondedFeedback';
import RespondedFeedback from './ManagerSide/RespondedFeedback';
import SeeAllFeedback from './ManagerSide/SeeAllFeedback';

//vaibhav
import Login2 from './components/Login2'
import Register2 from './components/Register2';
import RegisterDB2 from './components/Register2';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login2 />}></Route>
        <Route path='/regCust' element={<Register2 />}></Route>
      </Routes>

    </BrowserRouter>
    <BrowserRouter>
      <MyNavbar></MyNavbar>
      <Routes>

        <Route path='/cart' element={<Cart />}></Route>
        
        <Route path='/menu' element={<MenuCard />}></Route>
        <Route path='/editmenu' element={<EditMenu />}></Route>
        <Route path='/editCategory' element={<EditCategory />}></Route>
        <Route path='/editSubCategory' element={<EditSubCategory />}></Route>
        <Route path='/editProduct' element={<EditProduct />}></Route>
        <Route path='/receivedOrder' element={<OrderReceived />}></Route>
        <Route path='/assignedToDb' element={<AssignedToDb />}></Route>
        <Route path='/getAllOrdersWithStatus' element={<AllOrderHistory />}></Route>
        <Route path='/getAllOrdersWithStatusForCust' element={<CustOrderDetail />}></Route>
        
        <Route path='/regEmp' element={<RegisterDB2 />}></Route>

        

        {/* pranav------------------------ */}

        <Route path='/SeeFeedback' element={<SeeFeedback />} />
        <Route path='/AddFeedback' element={<AddFeedback />} />
        <Route path='/UserFeedback' element={<UserFeedback />} />
        <Route path='/Manager' element={<Manager />} />
        <Route path='/NotRespondedFeedback' element={<NotRespondedFeedback />} />
        <Route path='/RespondedFeedback' element={<RespondedFeedback />} />
        <Route path='/SeeAllFeedback' element={<SeeAllFeedback />} />



      </Routes>

    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
