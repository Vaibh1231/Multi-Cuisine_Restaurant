package com.app.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.pojos.Cart;

public interface CartDao extends JpaRepository<Cart, Long> {

	List<Cart> findAllById(long cartId);
	
//	List<Cart> findByIdCartItemsOrderHistory(String temp);

}
