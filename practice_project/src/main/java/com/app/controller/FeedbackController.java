package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.app.pojos.Feedback;
import com.app.pojos.SendMessage;
import com.app.service.FeedbackService;

@RestController
@RequestMapping("/feedback")
@CrossOrigin(value = "http://localhost:3000")
public class FeedbackController{
    
    @Autowired
    private FeedbackService feedbackService;
    
    @GetMapping("/getFbByUserId/{userId}")
    private List<Feedback>getFeedbackByUserId(@PathVariable long userId){
    	return feedbackService.getFeedbackByUserId(userId);
    }
    
    @GetMapping("/")
    public List<Feedback> getAllFeedback() {
        return feedbackService.getAllFeedback();
    }

    @GetMapping("/getFBById/{id}")
    public Feedback getFeedbackById(@PathVariable Long id) {
        return feedbackService.getFeedbackByid(id);
           
    }

    @PostMapping("/addFeedBack")
    public void createFeedback(@RequestBody SendMessage message) {
    	
//    	System.out.println(custFeed+" "+userId);
    	feedbackService.addFeedback(message.getMessage(), message.getUserId());
//    	System.out.println(message);
    	
    	
//        return feedbackService.addFeedback(custFeed);
    }

//    @PutMapping("/{feedbackId}")
//    public Feedback updateFeedback(@PathVariable Long feedbackId, @RequestBody Feedback feedbackDetails) {
//        Feedback feedback = feedbackService.getFeedbackByid(feedbackId);
//            
//        
//        feedback.setFeedbackMessage(feedbackDetails.getFeedbackMessage());
//        feedback.setIsManagerReply(feedbackDetails.getIsManagerReply());
//        
//        Feedback updatedFeedback = feedbackService.addFeedback(feedback);
//        return updatedFeedback;
//    }
    
    @GetMapping("/noRespondFeedback")
    public List<Feedback> getAllNotRespondFeedback(){
    	return feedbackService.getAllNotRespondFeedback();
    }
    
    @GetMapping("/respondFeedback")
    public List<Feedback> getAllRespondedFeedback(){
    	return  feedbackService.getAllRespondedFeedback();
    }
    @DeleteMapping("/{userId}")
    public void deletFeedbackById(@PathVariable long userId) {
    	feedbackService.deleteFeedback(userId);
    }
    @PutMapping("/responce/{id}")
    public void addResponceFromManager(@PathVariable long id,@RequestBody SendMessage m) {
    	feedbackService.addResponceFromManager(id,m.getResponce());
    }
    
}

