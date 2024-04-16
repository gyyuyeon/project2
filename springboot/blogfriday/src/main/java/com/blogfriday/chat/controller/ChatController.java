package com.blogfriday.chat.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.tomcat.websocket.server.WsRemoteEndpointImplServer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.blogfriday.chat.dto.ChatDTO;
import com.blogfriday.chat.service.ChatService;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@Slf4j
@CrossOrigin("*")
@RestController
@RequestMapping("/api/chat")
public class ChatController {

	@Autowired
	private ChatService chatService;
	
	
	public ChatController() {
		
	}
	
	@PostMapping("/friendinsert")
	public ResponseEntity<String> friendInsert(@RequestBody ChatDTO chatDTO) {
		
		ChatDTO data = chatDTO;
		
		
		if(chatService.notSameFriendProcess(chatDTO)==0) {
			chatService.insertFriendProcess(chatDTO);
			return ResponseEntity.ok("친구추가 완료");
		}else {
			return ResponseEntity.ok("이미 등록된 친구입니다");
		}				
		
	}
	
	//친구조회
	@GetMapping("/friendlist/{user_code1}")
	public ResponseEntity<Map<String, Object>> friendlist(@PathVariable("user_code1") String user_code1) {
		Map<String, Object> map = new HashMap<>();
		log.info("조회유저코드:{}", user_code1);
		
		List<ChatDTO> chatDTOs = chatService.friendListProcess(user_code1);
		
		map.put("friendList", chatDTOs);
		log.info("조회 결과:{}", map.get("friendList"));
		return ResponseEntity.ok(map);
	}
	
	
	@GetMapping("/nlpsearch/{text}")
	public ResponseEntity<String> NLPsearch(@PathVariable("text") String text){
		
		 log.info("NLPsearch_text {}",text);
		
		return ResponseEntity.ok(null);
	}
	
	
	
	
}
