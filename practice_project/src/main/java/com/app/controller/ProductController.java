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
import com.app.pojos.Product;
import com.app.pojos.SubCategory;
import com.app.service.CategoriesService;
import com.app.service.ProductService;
import com.app.service.SubCategoriesService;

@RestController
@RequestMapping("/menu")
@CrossOrigin("*")
public class ProductController {
	
	@Autowired
	private ProductService service;
	
	public ProductController() {
		System.out.println("in ctor"+getClass());
	}
	
	@GetMapping("/products")
	public List<Product> getAllProduct()
	{	
		System.out.println("in getAllProduct method");
		return service.fetchAllProducts();		
	}
	
	@GetMapping("/productBySubCatId/{subCatId}")
	public List<Product> getAllProductsBySubCatId(@PathVariable long subCatId)
	{	
		System.out.println("in getAllProductsBySubCatId method");
		return service.getAllProductsBySubCatId(subCatId);		
	}
	
	@PostMapping("/products")
	public void addProducts(@RequestBody Product prod)
	{
		System.out.println("in addProducts method");
		service.addProducts(prod);
	}
	
	@PostMapping("/products/{subCatId}")
	public void addProduct(@RequestBody Product prodName, @PathVariable long subCatId)
	{
		System.out.println("in addProduct method");
//		System.out.println(subCatName+" "+catId);
		service.addProduct(prodName, subCatId);
	}
	
	@DeleteMapping("/products/{prodId}")
	public void deleteProduct(@PathVariable long prodId)
	{
		System.out.println("in deleteCategory method!!!");
		service.deleteProduct(prodId);
	}
	
	@PutMapping("/products/{prodId}/{item_name}/{price}")
	public void updateProduct(@PathVariable long prodId, @PathVariable String item_name, @PathVariable double price)
	{
		System.out.println("in updateProduct method!!!");
		service.updateProduct(prodId, item_name, price);
	}
 
	
	
}
