package com.blogfriday.chat.repository;

import java.util.List;

import com.blogfriday.chat.dto.ChatDTO;

//친구 등록, 중복검사, 삭제, 조회(LIST)
public interface ChatMapper {
	
	public void insertFriend(ChatDTO chatDTO);
	public int notSameFriend(ChatDTO chatDTO);
	public void deleteFriend(ChatDTO chatDTO);
	public List<ChatDTO> friendList(String user_code1);
}
