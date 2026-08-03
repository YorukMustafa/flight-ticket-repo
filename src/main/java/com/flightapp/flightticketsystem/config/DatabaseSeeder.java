package com.flightapp.flightticketsystem.config;


import com.flightapp.flightticketsystem.entities.Role;
import com.flightapp.flightticketsystem.repository.RoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component //bu anotasyon sayesinde spring uygulama başlarken bu sınıfı ayağa kaldırır
@RequiredArgsConstructor// lombok final olarak tanımlanan değişkenler için constructor oluşturur
public class DatabaseSeeder implements CommandLineRunner {

    private final RoleRepository roleRepository;

    @Override
    public void run(String... args) throws Exception {

        if(roleRepository.findByRoleName("Admin").isEmpty()){

            Role admin = new Role();
            admin.setRoleName("Admin");
            roleRepository.save(admin);
            System.out.println("Admin rolü başarıyla eklendi");
        }

        if(roleRepository.findByRoleName("Customer").isEmpty()){
            Role customer = new Role();
            customer.setRoleName("Customer");
            roleRepository.save(customer);
            System.out.println("Customer rolü başarıyla eklendi");
        }
    }
}
