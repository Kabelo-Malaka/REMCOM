package com.remcom.backend.service;

import com.remcom.backend.model.User;
import com.remcom.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {
    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User createUser(User user) {
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            throw new IllegalArgumentException("Username already exists");
        }
        user.setId(UUID.randomUUID());
        return userRepository.save(user);
    }

    public Optional<User> getUserById(UUID id) {
        return userRepository.findById(id);
    }

    public User updateUser(UUID id, User updatedUser) {
        return userRepository.findById(id).map(user -> {
            if (!user.getUsername().equals(updatedUser.getUsername()) &&
                userRepository.findByUsername(updatedUser.getUsername()).isPresent()) {
                throw new IllegalArgumentException("Username already exists");
            }
            user.setUsername(updatedUser.getUsername());
            user.setPasswordHash(updatedUser.getPasswordHash());
            user.setRole(updatedUser.getRole());
            user.setActive(updatedUser.isActive());
            return userRepository.save(user);
        }).orElseThrow(() -> new IllegalArgumentException("User not found"));
    }

    public void deactivateUser(UUID id) {
        userRepository.findById(id).ifPresent(user -> {
            user.setActive(false);
            userRepository.save(user);
        });
    }

    public void assignRole(UUID id, String role) {
        userRepository.findById(id).ifPresent(user -> {
            user.setRole(role);
            userRepository.save(user);
        });
    }
}
