package com.flightapp.flightticketsystem.service;

import com.flightapp.flightticketsystem.jwt.AuthRequest;
import com.flightapp.flightticketsystem.jwt.AuthResponse;

public interface IAuthService {
    AuthResponse register(AuthRequest request);
    AuthResponse login(AuthRequest request);
}
