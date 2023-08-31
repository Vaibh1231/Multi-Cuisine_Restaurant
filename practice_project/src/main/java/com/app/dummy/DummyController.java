package com.app.dummy;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
public class DummyController {
	public DummyController() {
		System.out.println("in ctor"+getClass());
	}
	
	@GetMapping("/dummy")
	public String getMessage()
	{
		System.out.println("in getMessage method");
		return "Welcome!!!!";
		
	}
}
