package com.example.Vayunetra.Controller;


import com.example.Vayunetra.Entity.*;
import com.example.Vayunetra.Service.AppService;
import com.example.Vayunetra.Service.WeatherService;
import com.example.Vayunetra.api_response.WeatherResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
        import java.util.List;

@RestController
@RequestMapping("/api/portal")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:8081")
public class AppController {

    private final AppService service;

    private final WeatherService weatherService;


    // 1. POST: Register a new Citizen
    @PostMapping("/citizens")
    public ResponseEntity<Citizen> addCitizen(@RequestBody Citizen citizen) {
        return new ResponseEntity<>(service.createCitizen(citizen), HttpStatus.CREATED);
    }

    // 2. POST: Create an Admin account
    @PostMapping("/admins")
    public ResponseEntity<Admin> addAdmin(@RequestBody Admin admin) {
        return new ResponseEntity<>(service.createAdmin(admin), HttpStatus.CREATED);
    }

    // 3. GET: List all Admins in the system
    @GetMapping("/admins")
    public ResponseEntity<List<Admin>> listAllAdmins() {
        return ResponseEntity.ok(service.getAllAdmins());
    }
    // 4. Get weather
    @GetMapping("/weather/{city}")
    public ResponseEntity<?> getCityWeather(@PathVariable String city) {
        WeatherResponse data = weatherService.getWeatherData(city);
        if (data != null) {
            System.out.println(data.getLocation().getName());
            return ResponseEntity.ok(data);
        }
        return ResponseEntity.status(404).body("City not found or API error");
    }
}