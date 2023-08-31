package com.app.service;

import java.security.MessageDigest;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.apache.commons.codec.digest.DigestUtils;

import com.app.dao.CartDao;
import com.app.dao.OrderDao;
import com.app.dao.OrderDetailDao;
import com.app.dao.UserDao;
import com.app.pojos.Cart;
import com.app.pojos.CartItem;
import com.app.pojos.Order;
import com.app.pojos.OrderDetail;
import com.app.pojos.User;

@Service
@Transactional
public class UserServiceImpl implements UserService {

	@Autowired
	private UserDao dao;
	
	@Autowired
	private CartDao cartDao;
	
	@Autowired
	private OrderDetailDao orderDetailDao;
	
	@Autowired
	private OrderDao orderDao;
	
	@Override
	public List<User> fetchAllUsers() {
		
		return dao.findAll();
	}

	@Override
	public void addStatus(long cartId) {
		// TODO Auto-generated method stub
		Cart c = cartDao.findById(cartId).orElseThrow();
//		c.getCartOwner().getId();
		User u = c.getCartOwner();
		
		List<CartItem> cartItemList = c.getCartItems();
		Order o = new Order();
		o.setOrderStatus("Order accepted");
		o.setPlacedOn(LocalDate.now());
		Order o1 = orderDao.save(o);
		for (CartItem ci: cartItemList) {
//			System.out.println(ci);
			if (ci.getOrderHistory().equals("NEW")) {
//				System.out.println(ci);
				OrderDetail od = new OrderDetail();
				od.setProduct(ci.getProduct());
				od.setQuantity(ci.getQuantity());
				
				
				OrderDetail od1 = orderDetailDao.save(od);
		
				o1.addOrderDetails(od1);
				
				orderDao.save(o1);
				
			}
		}
		
		u.addOrder(o1);
		dao.save(u);
	}

	@Override
	public User findUserByOrderId(long orderId) {
		
		return orderDao.findById(orderId).get().getUser();
	}

	@Override
	public List<Order> getListOrderReceived() {
		List<Order> list = orderDao.findAll();
		List<Order> listFinal = new ArrayList<>();
		for(Order o:list)
		{
			if (o.getOrderStatus().equals("Order accepted")) {
				listFinal.add(o);
//				System.out.println(listFinal);
			}
		}
		return listFinal;
	}

	@Override
	public List<User> getListOfDB() {
		List<User> list = new ArrayList<User>();
		for(User u:dao.findAll())
		{
			if(u.getUserRole().toString().equals("DELIVERYBOY"))
			{
				list.add(u);
			}
		}
		return list;
	}

	@Override
	public void assignOrderToDB(long order_id) {
		orderDao.findById(order_id).orElseThrow().setOrderStatus("Assigned to delivery boy");	
	}

	@Override
	public List<Order> getListAssignedToDB() {
		List<Order> list = orderDao.findAll();
		List<Order> listFinal = new ArrayList<>();
		for(Order o:list)
		{
			if (o.getOrderStatus().equals("Assigned to delivery boy")) {
				listFinal.add(o);
//				System.out.println(listFinal);
			}
		}
		return listFinal;
	}

	@Override
	public void delivered(long order_id) {
		orderDao.findById(order_id).orElseThrow().setOrderStatus("Delivered");
		
	}

	@Override
	public List<OrderDetail> getListOfDelivered() {
		List<Order> list = orderDao.findAll();
		List<OrderDetail> listFinal = new ArrayList<>();
		for(Order o:list)
		{
			if (o.getOrderStatus().equals("Delivered")) {
				listFinal = o.getOrderItemList();
//				System.out.println(listFinal);
			}
		}
		return listFinal;
	}

	@Override
	public List<Order> getAllOrdersWithStatus() {
		
		return orderDao.findAll();
	}
	
	/*pranav---------------------*/
	@Override
	public User validateUser(User user) {
		String password = null;
		try {
			MessageDigest dutil =  MessageDigest.getInstance("SHA-256");
			String sha256hex = DigestUtils.sha256Hex(user.getPassword());
			password = sha256hex;
			System.out.println(password);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		User vaidatedUser=dao.findByEmailAndPassword(user.getEmail(),password);
		System.out.println(vaidatedUser);
		return vaidatedUser;
	}

	@Override
	public User registerUser(User u) {
		User registeredUser=null;
		String password = null;
		try {
			MessageDigest dutil =  MessageDigest.getInstance("SHA-256");
			String sha256hex = DigestUtils.sha256Hex(u.getPassword());
			password = sha256hex;
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		u.setPassword(password);
		
		//if(u.getUserRole().toString().equals("CUSTOMER")) {
			Cart cart = new Cart();
			cart.setCreatedOn(LocalDate.now());
			u.addCart(cart);
			registeredUser =  dao.save(u);
			cartDao.save(cart);
		
//		}else {
//			registeredUser =  dao.save(u);
//		}
		return registeredUser;
	}

	@Override
	public List<Order> getOrderHistoryByCustId(long custId) {
//		orderDao.findByUser_id(custId);
		List<Order> o = orderDao.findAll();
		List<Order> oFinal = new ArrayList<>();
		for(Order or:o)
		{
			if (or.getUser().getId() == custId) {
				oFinal.add(or);
			}
		}
		return oFinal;
	}



}
