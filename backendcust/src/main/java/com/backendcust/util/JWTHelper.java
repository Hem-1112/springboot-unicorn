// This class should be similar in both services if they are separate.
package com.backendcust.util;

import java.util.Date;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;

public class JWTHelper {


    private static final String SECRET_KEY = "mySecretKey";
    private static final String ISSUER = "example.com";
    public static String createToken(String subject) {
        return JWT.create()
                .withSubject(subject)
                .withIssuer(ISSUER)
                .withIssuedAt(new Date())
                .withExpiresAt(new Date(System.currentTimeMillis() + 3600 * 1000)) // 1 hour validity
                .sign(Algorithm.HMAC256(SECRET_KEY));
    }

    public static boolean verifyToken(String token) {
        try {
            JWT.require(Algorithm.HMAC256(SECRET_KEY))
                .withIssuer(ISSUER)
                .build()
                .verify(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
