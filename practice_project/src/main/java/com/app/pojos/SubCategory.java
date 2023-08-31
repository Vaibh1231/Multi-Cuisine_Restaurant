package com.app.pojos;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "sub_categories_tbl")
@NoArgsConstructor
@Getter
@Setter
@ToString(exclude ={"products", "sCategory"} )
public class SubCategory extends BaseEntity {
	
	@Column(name = "sub_category_name", length = 30, unique = true)
	private String subCategoryName;
	
	// one to many : Category 1 ----->* Product
	//Category : one , parent ,inverse 
	@OneToMany(mappedBy = "productSubCategory", 
			cascade = CascadeType.ALL, orphanRemoval = true)															// multiplicity
	// mappedBy -- mandatory for bi-dir asso. Appears in the inverse(one) side pf
	// the asso.
	// value : name of the asso property , as it appears owning side
	@JsonIgnore
	private List<Product> products = new ArrayList<>();// Tip : init the collection!
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="category_id",nullable = false) //to specify FK col name
	@JsonIgnore
	private Category sCategory;
	
	public SubCategory(String subCategoryName) {
		super();
		this.subCategoryName = subCategoryName;
	}
	
	public void addProduct(Product product)
	{

		product.setProductSubCategory(this);
		this.products.add(product);
	}
	
	

	}
