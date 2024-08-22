package com.authservice.model;

public class Token {
    private String token;

    // Constructors
    public Token() {}

    public Token(String token) {
        this.token = token;
    }

    // Getters and Setters
    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
