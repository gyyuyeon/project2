package com.blogfriday.product.service;

import java.util.List;

import com.blogfriday.product.dto.ProductDTO;
import com.blogfriday.product.dto.ProductimgDTO;




public interface ProductService {
	public void saveProcess(ProductDTO dto);
	public void updateProcess(ProductDTO dto);
	public void saveImgProcess(ProductimgDTO dto);
	public void deleteProcess(int product_code);
	public void deleteProductImgProcess(int product_code);
	public ProductDTO contentProcess(int product_code);
	public ProductimgDTO contentImgProcess(int product_code);
	public int findProductCodeByName(String prduct_name);
	public List<ProductDTO> searchlistProcess(String product_name);
	public List<ProductDTO> sellerlistProcess(int user_id);
}



