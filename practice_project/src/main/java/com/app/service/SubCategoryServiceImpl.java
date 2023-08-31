package com.app.service;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.custom_exceptions.ResourceNotFoundException;
import com.app.dao.CategoriesDao;
import com.app.dao.SubCategoriesDao;
import com.app.pojos.Category;
import com.app.pojos.SubCategory;

@Service
@Transactional
public class SubCategoryServiceImpl implements SubCategoriesService {

	@Autowired
	private SubCategoriesDao dao;
	
	@Autowired
	private CategoriesDao catDao;
	
	@Override
	public List<SubCategory> fetchAllSubCategories() {
		// TODO Auto-generated method stub
		return dao.findAll();
	}

	@Override
	public void addSubCategory(SubCategory scat) {
		dao.save(scat);	
	}

	@Override
	public void deleteSubCategory(long sCatId) {
		dao.deleteById(sCatId);	
	}

	@Override
	public void updateSubCategory(long sCatId, String subCatName) {
		SubCategory tempCat = dao.findById(sCatId).orElseThrow(() -> 
							new ResourceNotFoundException("Invalid user id : updation failed!!!"));

		System.out.println(tempCat);
		tempCat.setSubCategoryName(subCatName);
		System.out.println(tempCat);
		
		dao.save(tempCat);
	}

	@Override
	public List<SubCategory> fetchAllSubCategoriesByCatId(long catId) {
		List<SubCategory> list = dao.findAll();
		List<SubCategory> finalList = new ArrayList<>();
		for (SubCategory s : list) {
			if (s.getSCategory().getId() == catId) {
				finalList.add(s);
			}
		}
		return finalList;
	}

	@Override
	public void addSubCategory(SubCategory subCatName, long catId) {
		Category cat = catDao.findById(catId).orElseThrow(() -> 
							new ResourceNotFoundException("Invalid user id : updation failed!!!"));

		cat.addSubcategory(subCatName);

		catDao.save(cat);
		
	}

}
