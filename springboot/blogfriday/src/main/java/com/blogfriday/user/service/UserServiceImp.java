//package com.blogfriday.user.service;
//
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.stereotype.Service;
//import org.springframework.web.multipart.MultipartFile;
//
//import com.blogfriday.security.jwt.JwtProvider;
//import com.blogfriday.user.dto.BlogFridayUserDTO;
//import com.blogfriday.user.dto.SignResponse;
//import com.blogfriday.user.repository.UserRepository;
//
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//
//import java.io.IOException;
//import java.nio.file.Files;
//import java.nio.file.Path;
//import java.nio.file.Paths;
//import java.util.Random;
//
//@Slf4j
//@Service
//@RequiredArgsConstructor
//public class UserServiceImp implements UserService {
//
//	private final UserRepository userRepository;
//
//	@Override
//	public SignResponse getByUserIdEmail(String userIdEmail) {
//		log.info("loadUserByUsername:{}", userIdEmail);
//		BlogFridayUserDTO blogfridayDTO = userRepository.selectByEmail(userIdEmail);
//		if (blogfridayDTO == null) {
//			throw new UsernameNotFoundException("사용자를 찾을 수 없습니다.");
//		}
//
//		return SignResponse.builder().user_idemail(blogfridayDTO.getUser_idemail())
//				.user_name(blogfridayDTO.getUser_name()).accessToken(JwtProvider.createAccessToken(userIdEmail))
//				.refreshToken(JwtProvider.createRefreshToken(userIdEmail)).build();
//	}
//
//	@Override
//	public SignResponse addUserProcess(BlogFridayUserDTO dto, MultipartFile profilePicture) {
//		// 프로필 이미지를 처리하는 코드 추가
//		// 예를 들어, 파일을 저장하고 경로를 dto에 설정하는 코드를 여기에 추가
//		try {
//			String profilePicturePath = saveProfilePicture(profilePicture);
//			dto.setUser_profile(profilePicturePath); // 파일 경로 저장
//            
//            // 7자리의 난수 생성하여 사용자 코드로 설정
//            String randomString = generateRandomString(7);
//            dto.setUser_code(randomString);
//		} catch (IOException e) {
//			// 이미지 저장 실패 시 예외 처리
//			log.error("Failed to save profile picture", e);
//			// 실패 응답 반환 또는 예외 처리 방법에 따라 변경 가능
//			return null;
//		}
//
//		userRepository.insertUser(dto);
//		return SignResponse.builder().user_idemail(dto.getUser_idemail()).user_name(dto.getUser_name())
//				.user_nickname(dto.getUser_nickname()).user_phonenumber(dto.getUser_phonenumber())
//				.user_profile(dto.getUser_profile()).build(); // password 제외
//	}
//
//	@Override
//	public BlogFridayUserDTO viewUserProcess(String userIdEmail) {
//		// UserRepository를 통해 사용자 정보 조회
//		return userRepository.selectByEmail(userIdEmail);
//	}
//
//	@Override
//	public SignResponse updateUserProcess(BlogFridayUserDTO dto, MultipartFile profilePicture) {
//		// 프로필 이미지를 처리하는 코드 추가
//		// 예를 들어, 파일을 저장하고 경로를 dto에 설정하는 코드를 여기에 추가
//
//		// 변경된 프로필 이미지가 전달되었을 경우에만 처리
//		if (profilePicture != null && !profilePicture.isEmpty()) {
//			try {
//				String profilePicturePath = saveProfilePicture(profilePicture);
//				dto.setUser_profile(profilePicturePath); // 파일 경로 저장
//			} catch (IOException e) {
//				// 이미지 저장 실패 시 예외 처리
//				log.error("Failed to save profile picture", e);
//				// 실패 응답 반환 또는 예외 처리 방법에 따라 변경 가능
//				return null;
//			}
//		}
//
//		// 사용자 정보 업데이트
//		userRepository.updateUser(dto);
//
//		// 업데이트된 정보를 기반으로 새로운 SignResponse 생성하여 반환
//		return SignResponse.builder().user_idemail(dto.getUser_idemail()).user_name(dto.getUser_name())
//				.user_password(dto.getUser_password()).user_nickname(dto.getUser_nickname())
//				.user_phonenumber(dto.getUser_phonenumber()).user_profile(dto.getUser_profile()).build();
//	}
//
//	@Override
//	public void deleteUserProcess(String userIdEmail) {
//		userRepository.deleteUser(userIdEmail);
//
//	}
//
//	private String saveProfilePicture(MultipartFile file) throws IOException {
//		// 프로필 사진을 저장하고 저장된 경로를 반환하는 메서드
//		byte[] bytes = file.getBytes();
//		String fileName = file.getOriginalFilename();
//		Path path = Paths.get(
//				"C:\\Users\\EZEN\\Desktop\\BlogFriday\\2024.04.15\\blogfriday\\public\\profileimages\\" + fileName);
//		Files.write(path, bytes);
//		return path.toString(); // 파일 경로 반환
//	}
//
//	@Override
//	public String generateRandomString(int length) {
//		String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
//		StringBuilder result = new StringBuilder(length);
//		Random random = new Random();
//
//		for (int i = 0; i < length; i++) {
//			int index = random.nextInt(characters.length());
//			result.append(characters.charAt(index));
//		}
//
//		return result.toString();
//
//	}
//}

package com.blogfriday.user.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.blogfriday.security.jwt.JwtProvider;
import com.blogfriday.user.dto.BlogFridayUserDTO;
import com.blogfriday.user.dto.SignResponse;
import com.blogfriday.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Random;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserServiceImp implements UserService {
    private final UserRepository userRepository;
    
    

//    @Value("${spring.servlet.multipart.location-profileimages}")
//    private String profileImagesLocation;
    
    @Value("${app.additional.path}") 
    private String additionalPath;

    @Override
    public SignResponse getByUserIdEmail(String userIdEmail) {
        log.info("loadUserByUsername:{}", userIdEmail);
        BlogFridayUserDTO blogfridayDTO = userRepository.selectByEmail(userIdEmail);
        if (blogfridayDTO == null) {
            throw new UsernameNotFoundException("사용자를 찾을 수 없습니다.");
        }

        return SignResponse.builder().user_idemail(blogfridayDTO.getUser_idemail())
                .user_name(blogfridayDTO.getUser_name()).accessToken(JwtProvider.createAccessToken(userIdEmail))
                .refreshToken(JwtProvider.createRefreshToken(userIdEmail)).build();
    }

    @Override
    public SignResponse addUserProcess(BlogFridayUserDTO dto, MultipartFile profilePicture) {
        try {
            String profilePicturePath = saveProfilePicture(profilePicture);
            dto.setUser_profile(profilePicturePath); // 파일 경로 저장

            // 7자리의 난수 생성하여 사용자 코드로 설정
            String randomString = generateRandomString(7);
            dto.setUser_code(randomString);
        } catch (IOException e) {
            log.error("Failed to save profile picture", e);
            return null; // 실패 응답 반환
        }

        userRepository.insertUser(dto);
        return SignResponse.builder().user_idemail(dto.getUser_idemail()).user_name(dto.getUser_name())
                .user_nickname(dto.getUser_nickname()).user_phonenumber(dto.getUser_phonenumber())
                .user_profile(dto.getUser_profile()).build(); // password 제외
    }

    @Override
    public BlogFridayUserDTO viewUserProcess(String userIdEmail) {
        // UserRepository를 통해 사용자 정보 조회
        return userRepository.selectByEmail(userIdEmail);
    }

    @Override
    public SignResponse updateUserProcess(BlogFridayUserDTO dto, MultipartFile profilePicture) {
        // 변경된 프로필 이미지가 전달되었을 경우에만 처리
        if (profilePicture != null && !profilePicture.isEmpty()) {
            try {
                String profilePicturePath = saveProfilePicture(profilePicture);
                dto.setUser_profile(profilePicturePath); // 파일 경로 저장
            } catch (IOException e) {
                // 이미지 저장 실패 시 예외 처리
                log.error("Failed to save profile picture", e);
                // 실패 응답 반환 또는 예외 처리 방법에 따라 변경 가능
                return null;
            }
        }

        // 사용자 정보 업데이트
        userRepository.updateUser(dto);

        // 업데이트된 정보를 기반으로 새로운 SignResponse 생성하여 반환
        return SignResponse.builder().user_idemail(dto.getUser_idemail()).user_name(dto.getUser_name())
                .user_password(dto.getUser_password()).user_nickname(dto.getUser_nickname())
                .user_phonenumber(dto.getUser_phonenumber()).user_profile(dto.getUser_profile()).build();
    }

    @Override
    public void deleteUserProcess(String userIdEmail) {
        userRepository.deleteUser(userIdEmail);
    }

    private String saveProfilePicture(MultipartFile file) throws IOException {
        // 프로필 사진을 저장하고 저장된 경로를 반환하는 메서드
        byte[] bytes = file.getBytes();
        String fileName = file.getOriginalFilename();
        Path path = Paths.get(additionalPath + "/" + fileName);
        Files.write(path, bytes);
        return path.toString(); // 파일 경로 반환
    }

    @Override
    public String generateRandomString(int length) {
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        StringBuilder result = new StringBuilder(length);
        Random random = new Random();

        for (int i = 0; i < length; i++) {
            int index = random.nextInt(characters.length());
            result.append(characters.charAt(index));
        }

        return result.toString();
    }
}


