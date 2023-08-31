package com.app.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.pojos.Category;
import com.app.pojos.Product;
import com.app.pojos.SubCategory;
import com.app.pojos.User;

public interface UserDao extends JpaRepository<User, Long> {
	User findByEmailAndPassword(String email, String password);
}
