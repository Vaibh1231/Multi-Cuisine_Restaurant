package com.app.pojos;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;


//import javax.persistence.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
//@NoArgsConstructor
@Table(name = "feedback")
public class Feedback extends BaseEntity{

    @Column(name = "feedback_message",length = 500)
    private String feedbackMessage;
    
    
    @Column(name = "feedback_date")
    private LocalDate feedbackDate;
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User userId;

    @Column(name = "is_manager_reply")
    private int isManagerReply;

    @Column(name = "manager_reply",length = 500)
    private String replyFromManager;

	public Feedback() {
		
		this.isManagerReply = 0;
		this.feedbackDate = LocalDate.now();
	}

    // Getters and setters
    
    

}
