package com.app.service;

import java.util.List;

import com.app.pojos.Feedback;

public interface FeedbackService {
List<Feedback> getAllFeedback();
//void addFeedback(Feedback fb, long userId);
void deleteFeedback(long id);
Feedback getFeedbackByid(long id);
List<Feedback> getAllNotRespondFeedback();
void addFeedback(String fb, long userId);
List<Feedback> getFeedbackByUserId(long userId);
List<Feedback> getAllRespondedFeedback();
void addResponceFromManager(long id, String responce);
}
