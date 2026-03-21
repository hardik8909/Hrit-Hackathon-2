package com.example.Vayunetra.Repository;

import com.example.Vayunetra.Entity.*;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;
import java.util.Optional;

public interface AdminRepository extends MongoRepository<Admin, String> {
    Optional<Admin> findByUsername(String identifier);
    Optional<Admin> findByPassword(String s);

    boolean existsByEmail(String email);
}
