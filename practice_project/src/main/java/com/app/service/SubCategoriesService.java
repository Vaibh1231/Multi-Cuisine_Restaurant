package com.app.service;

import java.util.List;

import com.app.pojos.Category;
import com.app.pojos.SubCategory;

public interface SubCategoriesService {
	List<SubCategory> fetchAllSubCategories();
	List<SubCategory> fetchAllSubCategoriesByCatId(long catId);
	void addSubCategory(SubCategory subCatName, long catId);
	void addSubCategory(SubCategory scat);
	void deleteSubCategory(long sCatId);
	void updateSubCategory(long sCatId, String subCatName);
}
