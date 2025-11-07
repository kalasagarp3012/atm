package com.example.atm.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.example.atm.entity.AtmUser;
import com.example.atm.repository.AtmRepository;

import java.util.Optional;
import java.util.Random;

@RestController
@RequestMapping("/api/atm")
@CrossOrigin(origins = "*")
public class AtmController {

    @Autowired
    private AtmRepository atmRepository;

    // ---------------- Register User ----------------
    @PostMapping("/register")
    public AtmUser registerUser(@RequestBody AtmUser user) {
        // Generate 16-digit unique card number
        String cardNumber = generateCardNumber();
        user.setCardNumber(cardNumber);

        // Save to DB
        return atmRepository.save(user);
    }

    // ---------------- User Login ----------------
    @PostMapping("/login")
    public String loginUser(@RequestBody AtmUser loginRequest) {
        Optional<AtmUser> existing = atmRepository.findByCardNumberAndPin(
                loginRequest.getCardNumber(),
                loginRequest.getPin()
        );

        if (existing.isPresent()) {
            return "✅ Login successful! Welcome, " + existing.get().getFullname();
        } else {
            return "❌ Invalid card number or PIN!";
        }
    }

    // ---------------- Helper Method ----------------
    private String generateCardNumber() {
        Random random = new Random();
        StringBuilder cardNum = new StringBuilder("5"); // e.g., start with 5
        for (int i = 0; i < 15; i++) {
            cardNum.append(random.nextInt(10));
        }
        return cardNum.toString();
    }
}
