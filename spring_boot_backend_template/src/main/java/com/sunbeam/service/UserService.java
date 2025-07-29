package com.sunbeam.service;

import com.sunbeam.dto.AddressDTO;
import com.sunbeam.dto.ApiResponse;
import com.sunbeam.dto.AuthRequest;
import com.sunbeam.dto.UserRequestDTO;
import com.sunbeam.dto.UserRespDTO;

public interface UserService {
//sign in
	UserRespDTO authenticate(AuthRequest dto);

	UserRespDTO signUp(UserRequestDTO dto);

	ApiResponse assignAddress(Long userId, AddressDTO dto);
}
