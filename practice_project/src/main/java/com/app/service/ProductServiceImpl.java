package com.app.service;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.custom_exceptions.ResourceNotFoundException;
import com.app.dao.ProductDao;
import com.app.dao.SubCategoriesDao;
import com.app.pojos.Category;
import com.app.pojos.Product;
import com.app.pojos.SubCategory;

@Service
@Transactional
public class ProductServiceImpl implements ProductService {

	@Autowired
	private ProductDao dao;
	
	@Autowired
	private SubCategoriesDao subCatDao;
	
	@Override
	public List<Product> fetchAllProducts() {
		// TODO Auto-generated method stub
		return dao.findAll();
	}

	@Override
	public void addProducts(Product prod) {
		dao.save(prod);
	}

	@Override
	public void deleteProduct(long prodId) {
		dao.deleteById(prodId);
	}

	@Override
	public void updateProduct(long prodId, String prod, double price) {
		Product tempProduct = dao.findById(prodId).orElseThrow(() -> 
							new ResourceNotFoundException("Invalid user id : updation failed!!!"));
		tempProduct.setPrice(price);
		tempProduct.setItem_name(prod);
		dao.save(tempProduct);	
	}

	@Override
	public List<Product> getAllProductsBySubCatId(long subCatId) {
		List<Product> list = dao.findAll();
		List<Product> finalList = new ArrayList<>();
		for (Product s : list) {
			if (s.getProductSubCategory().getId() == subCatId) {
				finalList.add(s);
			}
		}
		return finalList;
	}

	@Override
	public void addProduct(Product prodName, long subCatId) {
		SubCategory cat = subCatDao.findById(subCatId).orElseThrow(() -> 
		new ResourceNotFoundException("Invalid user id : updation failed!!!"));

		cat.addProduct(prodName);
		
		subCatDao.save(cat);
		
	}

}
