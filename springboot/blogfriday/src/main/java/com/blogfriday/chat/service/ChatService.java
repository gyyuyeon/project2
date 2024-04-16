package com.blogfriday.chat.service;

import java.util.List;

import com.blogfriday.chat.dto.ChatDTO;

//친구 등록, 중복검사, 삭제, 조회(LIST)
public interface ChatService {
	
	public void insertFriendProcess(ChatDTO chatDTO);
	public int notSameFriendProcess(ChatDTO chatDTO);
	public void deleteFriendProcess(ChatDTO chatDTO);
	public List<ChatDTO> friendListProcess(String user_code1);
}
