package com.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.api.entity.Message;
import com.api.repo.MessageRepo;
import com.api.service.SecretMessage;

@RestController
@CrossOrigin(origins="http://localhost:5173/")	
public class MessageController {
	
	@Autowired
	private MessageRepo mr;
	
	@Autowired
	private SecretMessage sm;
	
	@PostMapping("/encryptMsg")
	public String encryptMsg(@RequestParam("msg")String msg, @RequestParam("password")String password) {
		
		Message m = new Message();
		m.setMsg(msg);
		String secret = sm.generateMessage();
		m.setPassword(password);
		m.setSecretmsg(secret);
		
		
		mr.save(m);
		return secret;
	}

	@PostMapping("/decryptMsg")
	public String decryptMsg( @RequestParam("secret")String secret, @RequestParam("password")String password) {
		

		System.out.println(secret + " "+password);		
		List<Message> list = mr.findBySecretmsgAndPassword(secret,password);
	
		if(list.size()==1) {
			return list.get(0).getMsg();
		}
		
		else {
			return "No message available";
		}
	}
}










