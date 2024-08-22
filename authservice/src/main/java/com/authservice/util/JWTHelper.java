package com.authservice.util;

import java.util.Date;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;

public class JWTHelper {

    private static final String SECRET_KEY = "mySecretKey";
    private static final String ISSUER = "example.com";

    public static String createToken(String scopes) {
        return JWT.create()
                .withIssuer(ISSUER)
                .withClaim("scopes", scopes)
                .withIssuedAt(new Date())
                .withExpiresAt(new Date(System.currentTimeMillis() + 3600000)) // 1 hour expiration
                .sign(Algorithm.HMAC256(SECRET_KEY));
    }
}
