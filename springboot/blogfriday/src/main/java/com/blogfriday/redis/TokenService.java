package com.blogfriday.redis;


import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
	
@Service
	public class TokenService {

	    private final RedisTemplate<String, Object> redisTemplate;

	   
	    public TokenService(RedisTemplate<String, Object> redisTemplate) {
	        this.redisTemplate = redisTemplate;
	    }

	  //RedisTemplate을 이용한 데이터 저장
	    public void saveTokens(String userIdEmail, String accessToken, String refreshToken) {
	        redisTemplate.opsForValue().set(userIdEmail + ":accessToken", accessToken);
	        redisTemplate.opsForValue().set(userIdEmail + ":refreshToken", refreshToken);
	    }
	    
	    //RedisTemplate을 이용한 데이터 조회
	    public Object getAccessToken(String userIdEmail) {
	        return redisTemplate.opsForValue().get(userIdEmail + ":accessToken");
	    }

	    public Object getRefreshToken(String userIdEmail) {
	        return redisTemplate.opsForValue().get(userIdEmail + ":refreshToken");
	    }

	    //RedisTemplate을 이용한 데이터 삭제
	    public void deleteTokens(String userIdEmail) {
	        redisTemplate.delete(userIdEmail + ":accessToken");
	        redisTemplate.delete(userIdEmail + ":refreshToken");
	    }
	}
