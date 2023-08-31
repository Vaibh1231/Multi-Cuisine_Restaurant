package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.pojos.CartItem;
import com.app.pojos.Category;
import com.app.service.CartItemService;

@RestController
@RequestMapping("/cart")
@CrossOrigin("*")
public class CartItemController {
	
	@Autowired
	private CartItemService service;
	
	public CartItemController() {
		System.out.println("in ctor"+getClass());
	}
	
	@GetMapping("/getallCartItemDetail")
	public List<CartItem> getAllCartItems()
	{	
		System.out.println("in getAllUsers method");
		return service.fetchAllCartItemsDetails();		
	}
	
	@PostMapping("/addToCart/{cartId}/{productId}")
	public void addItemToCart(@PathVariable long cartId, @PathVariable long productId)
	{
		service.addToCart(cartId, productId);
	}
	
	@DeleteMapping("/removeItem/{cartItemId}")
	public void deleteCartItem(@PathVariable long cartItemId)
	{
		System.out.println("in deleteCartItem method!!!");
		service.deleteCartItem(cartItemId);
	}
	
	@PutMapping("/editCart/{cartItemId}/{quantity}")
	public void updateCart(@PathVariable long cartItemId, @PathVariable long quantity)
	{
		System.out.println("in updateCart method!!!");
//		System.out.println(cartItemId+" "+quantity);
		service.updateCart(cartItemId, quantity);
	}
	
	@PutMapping("/placeOrder/{cartID}/{quantity}")
	public void placeOrder(@PathVariable long cartItemId, @PathVariable long quantity)
	{
		System.out.println("in updateCart method!!!");
//		System.out.println(cartItemId+" "+quantity);
		service.updateCart(cartItemId, quantity);
	}
	
}
