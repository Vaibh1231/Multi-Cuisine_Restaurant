package com.app.controller;

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

import com.app.pojos.Cart;
import com.app.pojos.CartItem;
import com.app.service.CartService;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
@RequestMapping("/cart")
public class CartController {
	
	@Autowired
	private CartService service;
	
	public CartController() {
		System.out.println("in ctor"+getClass());
	}
	
	@GetMapping("/getAllOrders")
	public List<CartItem> getAllCartItem()
	{	
		System.out.println("in getAllUsers method");
		return service.fetchAllCartItems();		
	}	
	
	@GetMapping("/getCartItemByCartItemId/{CartId}")
	public List<CartItem> getCartItemByCartItemId(@PathVariable long CartId)
	{	
		System.out.println("in getCartItemByCartItemId method");
		return service.getCartItemByCartItemId(CartId);		
	}
	
	@GetMapping("/getOrderHistCartId/{CartId}")
	public List<CartItem> getOrderHistCartId(@PathVariable long CartId)
	{	
		System.out.println("in getCartItemByCartItemId method");
		return service.getOrderHistCartId(CartId);		
	}
	
	@PutMapping("/placeOrder/{cartId}")
	public String placeOrder(@PathVariable long cartId)
	{
		
		service.placeOrder(cartId);
		return "Order placed successfully!!!";	
	}
	
}
