package com.app.pojos;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name="products_tbl")
@NoArgsConstructor
@Getter
@Setter
@ToString(exclude = "productCategory" )
public class Product extends BaseEntity {
//productId, name ,price,description,inStock
	@Column(name="item_name",length = 20,unique = true)
	private String item_name;
	private double price;
	//many-to-one association with Category
	@ManyToOne
	@JoinColumn(name="sub_category_id",nullable = false) //to specify FK col name
	private SubCategory productSubCategory;
	
	public Product(String item_name , double price) {
		super();
		this.item_name = item_name;
		this.price = price;

	}
		
}
