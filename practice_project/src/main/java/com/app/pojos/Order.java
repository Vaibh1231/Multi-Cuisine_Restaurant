package com.app.pojos;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "orders_tbl")
@Getter
@Setter
@ToString(exclude = { "orderItemList" })
public class Order extends BaseEntity {

	@Column(name = "order_status")
	private String orderStatus;
	// Cart *--->* Product
	// Cart ---> CartItems : one to many
	// one , parent , inverse
	@OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
	@JsonIgnoreProperties(value = "order")
//	@JsonIgnore
	private List<OrderDetail> orderItemList = new ArrayList<>();

	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user;

	@Column(name = "order_placed_on")
	private LocalDate placedOn;

	public void addOrderDetails(OrderDetail o) {
		o.setOrder(this);
		this.orderItemList.add(o);
	}

}
