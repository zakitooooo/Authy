package com.example.authy.service;

import com.example.authy.model.User;
import com.example.authy.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // Créer un utilisateur avec mot de passe hashé
    public User createUser(User user) {
        user.setMotDePasse(passwordEncoder.encode(user.getMotDePasse()));
        return userRepository.save(user);
    }

    // Récupérer tous les utilisateurs
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Récupérer un utilisateur par ID
    public Optional<User> getUserById(String id) {
        return userRepository.findById(id);
    }
    
    // Mettre à jour un utilisateur
    public User updateUser(String id, User userDetails) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));
        
        user.setEmail(userDetails.getEmail());
        user.setNom(userDetails.getNom());
        user.setPrenom(userDetails.getPrenom());

        // Si un nouveau mot de passe est fourni, le hasher
        if (userDetails.getMotDePasse() != null &&
                !userDetails.getMotDePasse().isEmpty()) {
            user.setMotDePasse(passwordEncoder.encode(userDetails.getMotDePasse()));
        }

        return userRepository.save(user);
    }  

    // Supprimer un utilisateur
    public void deleteUser(String id) {
        userRepository.deleteById(id);
    }

    // Vérifier si un email existe déjà
    public boolean emailExists(String email) {
        return userRepository.existsByEmail(email);
    }

    // Authentifier un utilisateur
    public boolean authenticate(String email, String motDePasse) {
        Optional<User> user = userRepository.findByEmail(email);
        
        if (user.isPresent()) {
            return passwordEncoder.matches(motDePasse, user.get().getMotDePasse());
        }
        
        return false;
    }
}