package com.app.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.pojos.Feedback;

public interface FeedbackDao extends JpaRepository<Feedback, Long>{
//List<Feedback> getFeedbackByUserId(long userId);
}
