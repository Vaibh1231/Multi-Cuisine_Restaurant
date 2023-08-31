package com.app.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.pojos.Category;

public interface CategoriesDao extends JpaRepository<Category, Long> {

	List<Category> findAllById(long catId);

}
