package com.app.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.custom_exceptions.ResourceNotFoundException;
import com.app.dao.CategoriesDao;
import com.app.pojos.Category;

@Service
@Transactional
public class CategoriesServiceImpl implements CategoriesService {
	
	@Autowired
	private CategoriesDao dao;

	@Override
	public List<Category> fetchAllCategories() {
		
		return dao.findAll();
	}

	@Override
	public void addCategory(Category cat) {
		dao.save(cat);	
	}

	@Override
	public void deleteCategory(long catId) {
		dao.deleteById(catId);
	}

	@Override
	public void updateCategory(long catId, String catName) {
//		dao.deleteById(catId);
//		dao.save(cat);
		Category tempCat = dao.findById(catId).orElseThrow(() -> 
							new ResourceNotFoundException("Invalid user id : updation failed!!!"));
		tempCat.setCategoryName(catName);
		dao.save(tempCat);
	}
}
