package com.app.service;

import java.util.List;

import com.app.pojos.Order;
import com.app.pojos.OrderDetail;
import com.app.pojos.User;

public interface UserService {
	List<User> fetchAllUsers();

	void addStatus(long cartId);

	User findUserByOrderId(long orderId);

	List<Order> getListOrderReceived();

	List<User> getListOfDB();

	void assignOrderToDB(long order_id);

	List<Order> getListAssignedToDB();

	void delivered(long order_id);

	List<OrderDetail> getListOfDelivered();

	List<Order> getAllOrdersWithStatus();
	/*-------------------------------------*//*pranav*/
	User registerUser(User u);
	User validateUser(User user);

	List<Order> getOrderHistoryByCustId(long custId);
}
