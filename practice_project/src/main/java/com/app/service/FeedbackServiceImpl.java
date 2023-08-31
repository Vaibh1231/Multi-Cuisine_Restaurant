package com.app.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.custom_exceptions.ResourceNotFoundException;
import com.app.dao.FeedbackDao;
import com.app.dao.UserDao;
import com.app.pojos.Feedback;
import com.app.pojos.User;
@Service
@Transactional
public class FeedbackServiceImpl implements FeedbackService {
	@Autowired
	private FeedbackDao feedbackDao;
	@Autowired
	private UserDao userDao;
	@Override
	public List<Feedback> getAllFeedback() {
		
		return feedbackDao.findAll();
	}

	@Override
	public void addFeedback(String fb, long userId) {
		User u = userDao.findById(userId).orElseThrow(() -> 
					new ResourceNotFoundException("Invalid user id : updation failed!!!"));
//		System.out.println(fb+" "+userId);
		
		Feedback f = new Feedback();
		f.setFeedbackDate(LocalDate.now());
		f.setFeedbackMessage(fb);
		f.setReplyFromManager("Not yet reply");
		
		feedbackDao.save(f);
		
//		System.out.println(f.getFeedbackMessage());
		
		u.addFeedBack(f);
			
		//userDao.save(u);

	}

	@Override
	public void deleteFeedback(long id) {
		System.out.println(id);
		List<Feedback> allFb=feedbackDao.findAll();
		List<Feedback> list=new ArrayList<Feedback>();
		for(Feedback fb:allFb) {
			if(fb.getUserId().getId()==id) {
				list.add(fb);
			}
		}
		
		//Feedback fb=feedbackDao.findById(id).orElse(null);
		//System.out.println(fb.getId());
		feedbackDao.deleteAll(list);
		// feedbackDao.deleteById(id);
	}

	@Override
	public Feedback getFeedbackByid(long id) {
		
		return feedbackDao.findById(id).orElse(null);
	}

	@Override
	public List<Feedback> getAllNotRespondFeedback() {
		List<Feedback> getAll=getAllFeedback();
		List<Feedback> notResponded = new ArrayList<Feedback>();
		for(Feedback fb : getAll) {
			if(fb.getIsManagerReply()==0) {
				notResponded.add(fb);
			}
		}
		return notResponded;
	}

	@Override
	public List<Feedback> getFeedbackByUserId(long userId) {
		
		List<Feedback> getAll=getAllFeedback();
		List<Feedback> getbyUserId = new ArrayList<Feedback>();
		for(Feedback fb : getAll) {
			if(fb.getUserId().getId()==userId) {
				getbyUserId.add(fb);
			}
		}
		return getbyUserId;
	}

	@Override
	public List<Feedback> getAllRespondedFeedback() {
		List<Feedback> getAll=getAllFeedback();
		List<Feedback> responded = new ArrayList<Feedback>();
		for(Feedback fb : getAll) {
			if(fb.getIsManagerReply()==1) {
				responded.add(fb);
			}
		}
		return responded ;
	}

	@Override
	public void addResponceFromManager(long id, String responce) {
		Feedback fb=feedbackDao.findById(id).orElseThrow(() -> 
		new ResourceNotFoundException("Invalid user id : updation failed!!!"));
		fb.setReplyFromManager(responce);
		fb.setIsManagerReply(1);
		feedbackDao.save(fb);
		
	}

}
