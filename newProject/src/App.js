import React, { useState } from "react";
// import logo from './logo.svg';
import './App.css';
// // import { Login } from "./Components/Login";
// // import { Register } from "./Components/Register";
// import { RegisterDB2 } from "./Components/RegisterDB2"
// import { Menu1 } from "./Components/Menu1"
// import { SubCategories } from "./Components/SubCategories"
// import Navbar from "./Components/Navbar";
import Login2 from "./components/Login2";
import Register2 from "./components/Register2";
import MyNavbar from "./components/MyNavbar";


function App() {

  const [currentForm, setCurrentForm] = useState('login');
  // const [subCategory , setSubCategory] = useState(allsubcat);
  // const [menuItems , setMenuItems] = useState(menudata);

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }

  return (
    <>
  
    {/* <Navbar></Navbar> */}
    {/* <Menu1 items={menuItems}></Menu1> */}
    {/* <SubCategories asc={subCategory}></SubCategories> */}
    <div >
      {/* <RegisterDB2></RegisterDB2> */}
      {/* <Login2></Login2> */}
      {/* <Register2></Register2> */}
      {
        
        currentForm === "login" ? <Login2 onFormSwitch={toggleForm} /> : <Register2 onFormSwitch={toggleForm} />

      }
    </div>
    </>
  );
}
export default App;
