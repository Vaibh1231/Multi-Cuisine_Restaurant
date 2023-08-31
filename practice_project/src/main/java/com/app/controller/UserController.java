package com.app.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.pojos.Order;
import com.app.pojos.OrderDetail;
import com.app.pojos.User;
import com.app.service.UserService;

@RestController
@RequestMapping("/user")
@CrossOrigin("*")
public class UserController {
	
	@Autowired
	private UserService service;
	
	public UserController() {
		System.out.println("in ctor"+getClass());
	}
	
	@PostMapping("/login")
    public List<String> customerLogin(@RequestBody User u) {
		List<String> list=null;
		User c=service.validateUser(u);
		if(c!=null) {
			
			list = new ArrayList<>();
			String cust_id = c.getId().toString();
			System.out.println(cust_id);
			String cart_id = c.getCart().getId().toString();
			String role = c.getUserRole().toString();
			list.add(cust_id);
			list.add(cart_id);
			list.add(role);
			list.add(c.getFirstName());
			return list;

		}
		return null;
	}
	
	@PostMapping("/register")
    public String registerNewUser(@RequestBody User newUser) 
	{
		System.out.println(newUser);
		User u =service.registerUser(newUser);
		System.out.println(u);
		if(u!=null)
		{
	        return "User Registered succesfully";
		}
		
		return "User not registered";
	}

	
	@GetMapping("/allUsers")
	public List<User> getAllUsers()
	{	
		System.out.println("in getAllUsers method");
		return service.fetchAllUsers();		
	}
	
	@GetMapping("/getListOfDB")
	public List<User> getListOfDB()
	{	
		System.out.println("in getListOfDB method");
		return service.getListOfDB();		
	}
	
	@GetMapping("/addStatus/{cartId}")
	public String addStatus(@PathVariable long cartId)
	{	
		System.out.println("in addStatus method");
		service.addStatus(cartId);
		return "Order accepted";		
	}
	
	@GetMapping("/findUserByOrderId/{orderId}")
	public User findUserByOrderId(@PathVariable long orderId)
	{	
		System.out.println("in findUserByOrderId method");
		
		return service.findUserByOrderId(orderId);	
	}
	
	@GetMapping("/getListOrderReceived")
	public List<Order> getListOrderReceived()
	{
		
		return service.getListOrderReceived();
		
	}
	
	@GetMapping("/getAllOrdersWithStatus")
	public List<Order> getAllOrdersWithStatus()
	{
		
		return service.getAllOrdersWithStatus();
		
	}
	
	@PutMapping("/assignOrderToDB/{order_id}")
	public String assignOrderToDB(@PathVariable long order_id)
	{
		service.assignOrderToDB(order_id);
		return "Order assigned successfully";
		
	}
	
	@GetMapping("/getListAssignedToDB")
	public List<Order> getListAssignedToDB()
	{
		
		return service.getListAssignedToDB();	
	}
	
	@PutMapping("/delivered/{order_id}")
	public String delivered(@PathVariable long order_id)
	{
		service.delivered(order_id);
		return "Order delivered successfully";
		
	}
	
	@GetMapping("/getListOfDelivered")
	public List<OrderDetail> getListOfDelivered()
	{
		
		return service.getListOfDelivered();	
	}
	
	@GetMapping("/orderHistoryByCustId/{custId}")
	public List<Order> getOrderHistoryByCustId(@PathVariable long custId)
	{
		
		return service.getOrderHistoryByCustId(custId);
	}
	
	
	
	
	
	
}
