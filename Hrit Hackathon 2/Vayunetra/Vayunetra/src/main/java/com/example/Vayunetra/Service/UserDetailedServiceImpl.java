package com.example.Vayunetra.Service;

import com.example.Vayunetra.Entity.Admin;
import com.example.Vayunetra.Entity.Citizen;
import com.example.Vayunetra.Repository.AdminRepository;
import com.example.Vayunetra.Repository.CitizenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

@Component
 class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private CitizenRepository citizenRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        // 1️⃣ Check Admin
        Admin admin = adminRepository.findByUsername(username).orElse(null);
        if (admin != null) {
            return org.springframework.security.core.userdetails.User
                    .builder()
                    .username(admin.getUsername())
                    .password(admin.getPassword())
                    .roles(admin.getRoles().toArray(new String[0]))
                    .build();
        }

        // 2️⃣ Check Citizen
        Citizen citizen = citizenRepository.findByfullName(username).orElse(null);
        if (citizen != null) {
            return org.springframework.security.core.userdetails.User
                    .builder()
                    .username(citizen.getEmail())
                    .password(citizen.getPassword())
                    .roles(citizen.getRoles().toArray(new String[0]))
                    .build();
        }

        throw new UsernameNotFoundException("User not found with username: " + username);
    }
}