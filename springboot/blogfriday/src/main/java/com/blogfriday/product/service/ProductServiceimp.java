package com.blogfriday.product.service;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.blogfriday.product.dto.ProductDTO;
import com.blogfriday.product.dto.ProductimgDTO;
import com.blogfriday.product.repository.ProductRepository;


@Service  // 서비스 쪽이라는걸 명시적으로 표시
public class ProductServiceimp implements ProductService {

	// repository - serviceimp /의존성
	@Autowired
	private ProductRepository productRepository;
	
	public ProductServiceimp() {
		
	}
	
	
	@Override
	public void saveProcess(ProductDTO dto) {
		productRepository.saveProduct(dto);
		
	}
	
	@Override
	public void saveImgProcess(ProductimgDTO dto) {
		
		productRepository.saveImgProduct(dto);
	}

	@Override
	public void updateProcess(ProductDTO dto) {
		productRepository.updateProduct(dto);
		
	}

	@Override
	public void deleteProcess(int product_code) {
		productRepository.deleteProduct(product_code);
		
	}
	
	@Override
	public void deleteProductImgProcess(int product_code) {
		productRepository.deleteProductImg(product_code);
	}
	

	
	@Override
	public ProductDTO contentProcess(int product_code) {
		
		return productRepository.content(product_code);
		
	}
	
	@Override
	public ProductimgDTO contentImgProcess(int product_code) {
		
		return productRepository.contentImg(product_code);
		
	}
	
	@Override
	public int findProductCodeByName(String product_name) {
		return productRepository.findProductCodeByName(product_name);
		
	}
	
	@Override
	public List<ProductDTO> searchlistProcess(String product_name){
		return productRepository.searchlist(product_name);
	}
	
	@Override
	public List<ProductDTO> sellerlistProcess(int user_id){
		return productRepository.sellerlist(user_id);
	}

}
