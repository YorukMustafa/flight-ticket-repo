package com.flightapp.flightticketsystem.service.impl;

import com.flightapp.flightticketsystem.entities.Users;
import com.flightapp.flightticketsystem.exception.BaseException;
import com.flightapp.flightticketsystem.jwt.AuthRequest;
import com.flightapp.flightticketsystem.jwt.AuthResponse;
import com.flightapp.flightticketsystem.jwt.JwtService;
import com.flightapp.flightticketsystem.repository.IRolesRepository;
import com.flightapp.flightticketsystem.repository.IUsersRepository;
import com.flightapp.flightticketsystem.service.IAuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService implements IAuthService {

    private final IUsersRepository usersRepository;
    private final IRolesRepository rolesRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    @Override
    public AuthResponse register(AuthRequest request) {
        if (usersRepository.existsByEmail(request.getEmail())) {
            throw new BaseException("error.user_already_exists");
        }

        Users user = new Users();
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        
        rolesRepository.findByName("USER").ifPresent(role -> user.getRoles().add(role));

        usersRepository.save(user);

        String jwtToken = jwtService.generateToken(user);
        return new AuthResponse(jwtToken);
    }

    @Override
    public AuthResponse login(AuthRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        Users user = usersRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new BaseException("error.user_not_found"));

        String jwtToken = jwtService.generateToken(user);
        return new AuthResponse(jwtToken);
    }
}
