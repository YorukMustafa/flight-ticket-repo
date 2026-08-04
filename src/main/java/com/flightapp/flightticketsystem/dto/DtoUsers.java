package com.flightapp.flightticketsystem.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DtoUsers {
    private Long id;
    private String email;
    private String firstName;
    private String lastName;
}
