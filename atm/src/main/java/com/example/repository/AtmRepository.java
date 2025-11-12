package com.example.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.entity.AtmUser;

public interface AtmRepository extends JpaRepository<AtmUser, Long> {
    Optional<AtmUser> findByCardNumberAndPin(String cardNumber, String pin);
}
