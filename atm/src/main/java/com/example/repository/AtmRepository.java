package com.example.atm.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.atm.entity.AtmUser;

import java.util.Optional;

public interface AtmRepository extends JpaRepository<AtmUser, Long> {
    Optional<AtmUser> findByCardNumberAndPin(String cardNumber, String pin);
}
