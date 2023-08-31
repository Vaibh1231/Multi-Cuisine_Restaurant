package com.app.service;

import java.util.List;

import com.app.pojos.Cart;
import com.app.pojos.CartItem;

public interface CartService {
	List<CartItem> fetchAllCartItems();
	List<CartItem> getCartItemByCartItemId(long CartId);
	List<CartItem> getOrderHistCartId(long CartId);
	
	void placeOrder(long cartId);
	
}
