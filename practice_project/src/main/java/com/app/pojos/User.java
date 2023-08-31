package com.app.pojos;
/*
 * userId (PK) ,first name,last name , email,password,confirmPassword,role(enum), regAmount;
	 LocalDate/Date regDate;
	 byte[] image;
 */

import java.util.List;

import javax.persistence.CascadeType;
//will be importing all annotations from this pkg
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity // mandatory cls level annotation meant for hibernate , to tell following is the
		// entity class , to be managed by hib frmwork
@Table(name = "users_tbl") // optional anno , meant to supply table name
@NoArgsConstructor
@Getter
@Setter
@ToString(exclude = { "cart", "orderList"})
public class User extends BaseEntity {

	@NotBlank(message = "First name can't be blank")
	@Column(name = "first_name", length = 20) // col name , varchar size : 20
	private String firstName;
	@Column(name = "last_name", length = 20) // col name , varchar size : 20
	@NotBlank(message = "Last  name can't be blank")
	private String lastName;
	@Column(length = 50 , unique = true) // unique constraint
	private String email;
	@Column(length = 50, nullable = false) // non null constraint
	private String password;
	@NotBlank(message = "Address can't be blank")
	@Column(name = "address", length = 500) // col name , varchar size : 20
	private String address;
	@NotBlank(message = "Phone number can't be blank")
	@Column(name = "phone_no") // col name , varchar size : 20
	private String phoneNo;
	@Enumerated(EnumType.STRING) // col type : varchar (enum const name)
	@Column(name = "user_role", length = 30)
	private Role userRole;
	// User(Customer) HAS-A Cart User 1---->1 Cart
	@OneToOne(mappedBy = "cartOwner", cascade = CascadeType.ALL, orphanRemoval = true)
	@JsonIgnore
//	@JsonIgnoreProperties(value="cartOwner")
	private Cart cart;
	// User HAS-A AdharCard (one-to-one asso between entity n embeddable)
	
	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
	@JsonIgnore
	private List<Order> orderList;
	
	@OneToMany(mappedBy = "userId",fetch = FetchType.LAZY)
	@JsonIgnore
	private List<Feedback> feedback;

	public User(String firstName, String lastName, String email, String password, Role userRole) {
		super();
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.password = password;
		this.userRole = userRole;
	}

	// helper method : to add cart
	public void addCart(Cart cart) {
		this.cart = cart;
		cart.setCartOwner(this);// bi dir asso done !
	}
	
	public void addOrder(Order o)
	{
		o.setUser(this);
		this.orderList.add(o);
		
	}
	
	public void addFeedBack(Feedback f)
	{

		f.setUserId(this);
		this.feedback.add(f);
	}

}
