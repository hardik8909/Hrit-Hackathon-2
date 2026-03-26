package com.example.Vayunetra.Service;

import com.example.Vayunetra.Entity.Admin;
import com.example.Vayunetra.Entity.Citizen;
import com.example.Vayunetra.Entity.City;
import com.example.Vayunetra.Repository.AdminRepository;
import com.example.Vayunetra.Repository.CitizenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AppService {
    private final CitizenRepository citizenRepo;
    private final AdminRepository adminRepo;

//    public Citizen createCitizen(Citizen c) {
//        return citizenRepo.save(c);
//    }
    private final BCryptPasswordEncoder passwordEncoder;

        public Citizen createCitizen(Citizen c) {

            if(citizenRepo.existsByEmail(c.getEmail())){
                throw new RuntimeException("Email already registered");
            }

            c.setPassword(passwordEncoder.encode(c.getPassword()));
            c.setRoles(List.of("CITIZEN"));

            return citizenRepo.save(c);
        }


    public List<Citizen> getCitizensByCity(City city) {
        return citizenRepo.findByCity(city);
    }

    public Admin createAdmin(Admin a) {
        if(adminRepo.existsByEmail(a.getEmail())){
            throw new RuntimeException("Email already registered");
        }
        a.setPassword(passwordEncoder.encode(a.getPassword()));
        a.setRoles(Arrays.asList("ADMIN"));
        return adminRepo.save(a);
    }
    public List<Admin> getAllAdmins() {
        return adminRepo.findAll();
    }
}
