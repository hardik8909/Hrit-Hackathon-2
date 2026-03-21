package com.example.Vayunetra.Repository;

import com.example.Vayunetra.Entity.*;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;
import java.util.Optional;

public interface CitizenRepository extends MongoRepository<Citizen, String> {
    List<Citizen> findByCity(City city);

    Optional<Citizen> findByEmail(String identifier);

    boolean existsByEmail(String email);

    Optional<Citizen> findByfullName(String username);
}
