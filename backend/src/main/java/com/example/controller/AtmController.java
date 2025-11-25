package com.example.controller;

import java.util.Optional;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.dto.LoginRequest;
import com.example.entity.AtmUser;
import com.example.repository.AtmRepository;

@RestController
@RequestMapping("/api/atm")
@CrossOrigin(origins = "*")
public class AtmController {

    @Autowired
    private AtmRepository atmRepository;

    @PostMapping("/register")
    public AtmUser registerUser(@RequestBody AtmUser user) {
        String cardNumber = generateCardNumber();
        user.setCardNumber(cardNumber);
        return atmRepository.save(user);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest req) {
        if (req.getCardNumber() == null || req.getPin() == null) {
            return ResponseEntity.badRequest().body("Card number and PIN are required");
        }

        Optional<AtmUser> opt = atmRepository.findByCardNumberAndPin(req.getCardNumber(), req.getPin());
        if (opt.isPresent()) {
            // return user details (without PIN) or a success message
            AtmUser user = opt.get();
            // Remove pin before returning for safety
            user.setPin(null);
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.status(401).body("Invalid card number or PIN");
        }
    }

    private String generateCardNumber() {
        Random random = new Random();
        StringBuilder cardNum = new StringBuilder("5");
        for (int i = 0; i < 15; i++) {
            cardNum.append(random.nextInt(10));
        }
        return cardNum.toString();
    }
}
