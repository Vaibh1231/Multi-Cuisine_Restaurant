package com.app.pojos;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "categories")
@NoArgsConstructor
@Getter
@Setter
@ToString(exclude ="subCategories" )
public class Category extends BaseEntity {
	
	@Column(name = "category_name", length = 30, unique = true)
	private String categoryName;
	// one to many : Category 1 ----->* Product
	//Category : one , parent ,inverse 
	@OneToMany(mappedBy = "sCategory", 
			cascade = CascadeType.ALL, orphanRemoval = true)																										// many
																														// multiplicity
	// mappedBy -- mandatory for bi-dir asso. Appears in the inverse(one) side pf
	// the asso.
	// value : name of the asso property , as it appears owning side
	@JsonIgnoreProperties(value = "sCategory")
	private List<SubCategory> subCategories = new ArrayList<>();// Tip : init the collection!

	public Category(String categoryName) {
		super();
		this.categoryName = categoryName;
	}
	
	public void addSubcategory(SubCategory subcategory)
	{
		subcategory.setSCategory(this);
		this.subCategories.add(subcategory);
	}

	}
