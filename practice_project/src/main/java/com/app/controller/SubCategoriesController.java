package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.pojos.Category;
import com.app.pojos.SubCategory;
import com.app.service.CategoriesService;
import com.app.service.SubCategoriesService;

@RestController
@RequestMapping("/menu")
@CrossOrigin("*")
public class SubCategoriesController {
	
	@Autowired
	private SubCategoriesService service;
	
	public SubCategoriesController() {
		System.out.println("in ctor"+getClass());
	}
	
	@GetMapping("/subcategories")
	public List<SubCategory> getAllSubCategories()
	{	
		System.out.println("in getAllSubCategories method");
		return service.fetchAllSubCategories();		
	}
	
	@GetMapping("/subcategoriesByCatId/{catId}")
	public List<SubCategory> getAllsubcategoriesByCatId(@PathVariable long catId)
	{	
		System.out.println("in getAllsubcategoriesByCatId method");
		return service.fetchAllSubCategoriesByCatId(catId);		
	}
	
	
//	@PostMapping("/subcategories")
//	public void addSubCategories(@RequestBody SubCategory scat)
//	{
//		System.out.println("in addSubCategories method");
//		service.addSubCategory(scat);
//	}
//	
	@PostMapping("/subcategories/{catId}")
	public void addSubCategories(@RequestBody SubCategory subCatName, @PathVariable long catId)
	{
		System.out.println("in addSubCategories method");
//		System.out.println(subCatName+" "+catId);
		service.addSubCategory(subCatName, catId);
	}
	
	@DeleteMapping("/subcategories/{sCatId}")
	public void deleteSubCategory(@PathVariable long sCatId)
	{
		System.out.println("in deleteCategory method!!!");
		service.deleteSubCategory(sCatId);
	}
	
	@PutMapping("/subcategories/{sCatId}/{subCatName}")
	public void updateSubCategory(@PathVariable long sCatId, @PathVariable String subCatName)
	{
		System.out.println("in updateSubCategory method!!!");
		System.out.println(sCatId+" "+subCatName);
		service.updateSubCategory(sCatId, subCatName);
	}
	
}
