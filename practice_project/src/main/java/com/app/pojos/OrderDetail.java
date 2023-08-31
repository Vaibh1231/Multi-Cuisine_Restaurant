package com.app.pojos;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter 
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "order_detail_table")
@ToString(exclude = "order")
public class OrderDetail extends BaseEntity {
	@Column(name = "quantity")
	private int quantity;
	
	@OneToOne
	private Product product;
	@ManyToOne
	@JoinColumn(name = "orderId")
	private Order order;
	@Column(name = "order_placed_on")
	private LocalDate placedOn;

}
