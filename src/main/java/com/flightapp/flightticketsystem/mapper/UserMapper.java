package com.flightapp.flightticketsystem.mapper;

import com.flightapp.flightticketsystem.dto.DtoUsers;
import com.flightapp.flightticketsystem.entities.Users;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    public DtoUsers toDto(Users user) {
        if (user == null) {
            return null;
        }
        return new DtoUsers(
                user.getId(),
                user.getEmail(),
                user.getFirstName(),
                user.getLastName()
        );
    }

    public Users toEntity(DtoUsers dto) {
        if (dto == null) {
            return null;
        }
        Users user = new Users();
        user.setId(dto.getId());
        user.setEmail(dto.getEmail());
        user.setFirstName(dto.getFirstName());
        user.setLastName(dto.getLastName());
        return user;
    }
}
