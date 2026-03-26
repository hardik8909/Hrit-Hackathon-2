package com.example.Vayunetra.Service;

import com.example.Vayunetra.api_response.WeatherResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class WeatherService {

    @Value("${weather.api.key}")
    private String apiKey;
    private final String BASE_URL = "http://api.weatherstack.com/current";
    private final RestTemplate restTemplate = new RestTemplate();
    public  WeatherResponse getWeatherData(String city) {
        String url = String.format("%s?access_key=%s&query=%s", BASE_URL, apiKey, city);
        try {
            return restTemplate.getForObject(url, WeatherResponse.class);
        } catch (Exception e){
            return null;
        }
    }
}

