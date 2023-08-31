package com.app.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.pojos.Order;

public interface OrderDao extends JpaRepository<Order, Long> {

//	List<Order> findByUser(long custId);
	
}
