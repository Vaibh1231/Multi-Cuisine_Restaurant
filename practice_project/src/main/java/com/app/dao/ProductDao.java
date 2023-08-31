package com.app.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.pojos.Category;
import com.app.pojos.Product;
import com.app.pojos.SubCategory;

public interface ProductDao extends JpaRepository<Product, Long> {

}
