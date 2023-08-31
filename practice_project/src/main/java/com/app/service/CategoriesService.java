package com.app.service;

import java.util.List;

import com.app.pojos.Category;

public interface CategoriesService {
	List<Category> fetchAllCategories();
	void addCategory(Category cat);
	void deleteCategory(long catId);
	void updateCategory(long catId, String catName);
}
