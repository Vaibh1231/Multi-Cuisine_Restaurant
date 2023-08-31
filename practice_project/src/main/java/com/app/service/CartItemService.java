package com.app.service;

import java.util.List;

import com.app.pojos.CartItem;

public interface CartItemService {
	List<CartItem> fetchAllCartItemsDetails();

	void addToCart(long cartId, long productId);

	void deleteCartItem(long cartItemId);

	void updateCart(long cartItemId, long item);
}
