//// 사용자 관리와 관련된 기능 
 package com.blogfriday.user.service;

import com.blogfriday.user.dto.BlogFridayUserDTO;
import com.blogfriday.user.dto.SignResponse;
import org.springframework.web.multipart.MultipartFile;

public interface UserService {

    SignResponse getByUserIdEmail(String userIdEmail);

    SignResponse addUserProcess(BlogFridayUserDTO dto, MultipartFile profilePicture);

    BlogFridayUserDTO viewUserProcess(String userIdEmail);

    void deleteUserProcess(String userIdEmail);

    SignResponse updateUserProcess(BlogFridayUserDTO dto, MultipartFile profilePicture);
    
    public String generateRandomString(int length);
}







