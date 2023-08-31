package com.app.service;

import java.time.LocalDate;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.custom_exceptions.ResourceNotFoundException;
import com.app.dao.CartDao;
import com.app.dao.CartItemDao;
import com.app.dao.ProductDao;
import com.app.pojos.Cart;
import com.app.pojos.CartItem;
import com.app.pojos.Product;

@Service
@Transactional
public class CartItemServiceImpl implements CartItemService {

	@Autowired
	private CartItemDao cartItemDao;
	
	@Autowired
	private ProductDao prodDao;
	
	@Autowired
	private CartDao cartDao;

	
	@Override
	public List<CartItem> fetchAllCartItemsDetails() {
		
		return cartItemDao.findAll();
	}

	@Override
	public void addToCart(long cartId, long productId) {
		Product p = prodDao.findById(productId).orElseThrow(() -> 
					new ResourceNotFoundException("Invalid user id : updation failed!!!"));	

		Cart cart = cartDao.findById(cartId).orElseThrow(() -> 
					new ResourceNotFoundException("Invalid user id : updation failed!!!"));	
		
		CartItem i = new CartItem();
		i.setCreatedOn(LocalDate.now());
		i.setQuantity(1);
		i.setOrderHistory("NEW");
		i.setProduct(p);
		i.setCart(cart);
		
		 List<CartItem> list = cartItemDao.findAll();
		 
//		System.out.println(list);
		long cartId1 = 0;
		int count = 0;
		for (CartItem cartItem : list) {
			if (cartItem.getCart().getId() == cart.getId() && cartItem.getProduct().getId() == productId
					&& cartItem.getOrderHistory().equals("NEW")) {
				count++;
				cartId1=cartItem.getId();
			}else {
				
			}
		}
		System.out.println(count);
		
		if (count == 0) {
			cartItemDao.save(i);

			cart.addCartItem(i);
			
			cartDao.save(cart);
		} else {
			CartItem c = cartItemDao.findById(cartId1).orElseThrow(() -> 
			new ResourceNotFoundException("Invalid user id : updation failed!!!"));	
			
			c.setQuantity(c.getQuantity()+1);

			cartItemDao.save(c);

		}
				
	}

	@Override
	public void deleteCartItem(long cartItemId) {
		cartItemDao.deleteById(cartItemId);
		
	}

	@Override
	public void updateCart(long cartItemId, long quantity) {
		CartItem tempCartItem = cartItemDao.findById(cartItemId).orElseThrow(() -> 
								new ResourceNotFoundException("Invalid user id : updation failed!!!"));
		tempCartItem.setQuantity((int)quantity);

		cartItemDao.save(tempCartItem);
	}

}
