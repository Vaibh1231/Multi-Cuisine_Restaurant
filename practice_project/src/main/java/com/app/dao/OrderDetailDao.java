package com.app.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.pojos.OrderDetail;

public interface OrderDetailDao extends JpaRepository<OrderDetail, Long> {

}
