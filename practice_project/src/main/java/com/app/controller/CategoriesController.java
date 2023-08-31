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
import com.app.service.CategoriesService;

@RestController
@RequestMapping("/menu")
@CrossOrigin("*")
public class CategoriesController {
	
	@Autowired
	private CategoriesService service;
	
	public CategoriesController() {
		System.out.println("in ctor"+getClass());
	}
	
	@GetMapping("/categories")
	public List<Category> getAllCategories()
	{	
		System.out.println("in getAllCategories method");
		return service.fetchAllCategories();		
	}
	
	@PostMapping("/categories")
	public void addCategories(@RequestBody Category cat)
	{
		System.out.println("in addCategories method");
		service.addCategory(cat);
	}
	
	@DeleteMapping("/categories/{catId}")
	public void deleteCategory(@PathVariable long catId)
	{
		System.out.println("in deleteCategory method!!!");
		service.deleteCategory(catId);
	}
	
	@PutMapping("/categories/{catId}/{catName}")
	public void updateCategory(@PathVariable long catId, @PathVariable String catName)
	{
		System.out.println("in updateCategory method!!!");
		service.updateCategory(catId, catName);
	}
}
