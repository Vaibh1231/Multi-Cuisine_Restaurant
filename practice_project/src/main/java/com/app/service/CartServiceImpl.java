package com.app.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dao.CartDao;
import com.app.dao.CartItemDao;
import com.app.pojos.Cart;
import com.app.pojos.CartItem;

@Service
@Transactional
public class CartServiceImpl implements CartService {

	@Autowired
	private CartDao dao;
	
	@Autowired
	private CartItemDao cartItemDao;
	
	@Override
	public List<CartItem> fetchAllCartItems() {
		
		List<Cart> list = dao.findAll();
		List<CartItem> finalList = new ArrayList<>();
		
		for (Cart c : list) {
			for (CartItem s : c.getCartItems()) {
				if (s.getOrderHistory().equals("OLD")) {
					finalList.add(s);
				}
			}
		}
		return finalList;
	}

	@Override
	public List<CartItem> getCartItemByCartItemId(long CartId) {

		Cart cart = dao.findById(CartId).orElseThrow();
		List<CartItem> finalList = new ArrayList<>();
		List<CartItem> finalList1 = cart.getCartItems();
		
//		System.out.println(finalList1);
		finalList.clear();
		for (CartItem c : finalList1) {
			
			String s=c.getOrderHistory();
			System.out.println(s);
			if (s.equals("NEW")) {
//				System.out.println(c.getOrderHistory());
				finalList.add(c);
			}
		}
			
		
		return finalList;
	}

	@Override
	public List<CartItem> getOrderHistCartId(long CartId) {
		Cart cart = dao.findById(CartId).orElseThrow();
		List<CartItem> finalList = new ArrayList<>();
		List<CartItem> finalList1 = cart.getCartItems();
		
//		System.out.println(finalList1);
		finalList.clear();
		for (CartItem c : finalList1) {
			
			String s=c.getOrderHistory();
			System.out.println(s);
			if (s.equals("OLD")) {
//				System.out.println(c.getOrderHistory());
				finalList.add(c);
			}
		}
			
		
		return finalList;
	}

	@Override
	public void placeOrder(long cartId) {
		Cart cart = dao.findById(cartId).orElseThrow();
		List<CartItem> cartItemList = cart.getCartItems();
		for (CartItem c : cartItemList)
		{
			c.setOrderHistory("OLD");
			c.setCreatedOn(LocalDate.now());
			cartItemDao.save(c);
		}
		
	}

}
