import React, { useState } from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const MyNavbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen(!dropdownOpen);

  var sessionClear = () => {
    sessionStorage.clear()
  }

  return (
    <Navbar color="dark" dark expand="md" className="my-1 mr-01">
      <nav>
        {/* <NavLink href="/menu" className="text-light font-weight-bold my-2 ms-3">
          Home
        </NavLink> */}
        {
          (() => {
            if (sessionStorage.getItem("role") === "MANAGER") {
              return (
                <>
                  <NavLink href="/receivedOrder" className="text-light font-weight-bold my-2 ms-3">
                    Home
                  </NavLink>
                </>
              )
            } else if (sessionStorage.getItem("role") === "CUSTOMER") {
              return (
                <>
                  <NavLink href="/menu" className="text-light font-weight-bold my-2 ms-3">
                    Home
                  </NavLink>
                </>
              )
            } else if (sessionStorage.getItem("role") === "DELIVERYBOY") {
              return (<>
                <NavLink href="/assignedToDb" className="text-light font-weight-bold my-2 ms-3">
                  Home
                </NavLink>
              </>
              )
            }
          })()
        }
      </nav>
      <Nav className="me-auto" navbar>
        <Dropdown nav isOpen={dropdownOpen} toggle={toggle}>

          <DropdownToggle nav caret className="text-light font-weight-bold ms-5">
            Menu
          </DropdownToggle>
          <DropdownMenu>
            {
              (() => {
                if (sessionStorage.getItem("role") === "MANAGER") {
                  return (
                    <>
                      <DropdownItem>
                        <NavLink href="/receivedOrder" className="text-dark font-weight-bold">
                          Received orders
                        </NavLink>
                      </DropdownItem>
                      <DropdownItem>
                        <NavLink href="/editmenu" className="text-dark font-weight-bold">
                          Edit menu
                        </NavLink>
                      </DropdownItem>
                      <DropdownItem>
                        <NavLink href="/Manager" className="text-dark font-weight-bold">
                          Customer feedback
                        </NavLink>
                      </DropdownItem>
                      <DropdownItem>
                        <NavLink href="/regEmp" className="text-dark font-weight-bold">
                          Add employee
                        </NavLink>
                      </DropdownItem>
                      <DropdownItem>
                        <NavLink href="/getAllOrdersWithStatus" className="text-dark font-weight-bold">
                          Order history
                        </NavLink>
                      </DropdownItem>

                    </>
                  )
                } else if (sessionStorage.getItem("role") === "CUSTOMER") {
                  return (
                    <>
                      <DropdownItem>
                        <NavLink href="/getAllOrdersWithStatusForCust" className="text-dark font-weight-bold">
                          Orders
                        </NavLink>
                      </DropdownItem>
                      <DropdownItem>
                        <NavLink href="/UserFeedback" className="text-dark font-weight-bold">
                          Feedback
                        </NavLink>
                      </DropdownItem>
                      <DropdownItem>
                        <NavLink href="/cart" className="text-dark font-weight-bold">
                          Cart
                        </NavLink>
                      </DropdownItem>
                    </>
                  )
                } else if (sessionStorage.getItem("role") === "DELIVERYBOY") {
                  return (<>
                    <DropdownItem>
                      <NavLink href="/assignedToDb" className="text-dark font-weight-bold">
                        Orders to deliver
                      </NavLink>
                    </DropdownItem>
                    <DropdownItem>
                      <NavLink href="/getAllOrdersWithStatus" className="text-dark font-weight-bold">
                        All orders
                      </NavLink>
                    </DropdownItem>
                  </>
                  )
                }
              })()
            }
          </DropdownMenu>
        </Dropdown>
      </Nav>
      <NavbarBrand className="my-2">
        {/* <img src="/download.png" alt="Logo" height="30" className="mr-2" /> */}
        <span className="font-weight-bold">Multicuisine Restaurant </span>
      </NavbarBrand>

      {/* <NavLink href="/cart" className="text-light font-weight-bold ms-auto me-5">
                              <i class="bi bi-cart"></i>  Cart
                            </NavLink> */}
      {(() => {
        if (sessionStorage.getItem("role") === "CUSTOMER") {
          return (
            <NavLink href="/cart" className="text-light font-weight-bold ms-auto me-5">
              <i class="bi bi-cart"></i>  Cart
            </NavLink>
          )
        }
      })()}

      <Nav navbar className="ml-auto my-1">
        <NavItem>
          <NavLink href="/" className="btn btn-danger text-white font-weight-bold" type="submit" onClick={sessionClear}>
            Logout
           
          </NavLink>
        </NavItem>
      </Nav>
    </Navbar>

  );
};

export default MyNavbar;