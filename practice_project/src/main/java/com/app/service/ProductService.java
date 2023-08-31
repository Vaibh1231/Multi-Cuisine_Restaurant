package com.app.service;

import java.util.List;

import com.app.pojos.Category;
import com.app.pojos.Product;
import com.app.pojos.SubCategory;

public interface ProductService {
	List<Product> fetchAllProducts();
	List<Product> getAllProductsBySubCatId(long subCatId);
	void addProducts(Product prod);
	void addProduct(Product prodName, long subCatId);
	void deleteProduct(long prodId);
	void updateProduct(long prodId, String prod, double price);
}
