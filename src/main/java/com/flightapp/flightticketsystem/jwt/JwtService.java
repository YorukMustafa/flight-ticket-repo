package com.flightapp.flightticketsystem.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtService {
    
    @Value("${jwt.secret:Uy9uABa63lWt2sSvqJjqc9qfBV2qfKIFedRRddyoFl2}")
    private String SECRET_KEY;

    public String generateToken(UserDetails userDetails) {
        Map<String, Object> claimsMap = new HashMap<>();
        claimsMap.put("Role", "Admin");

        return Jwts.builder()
                .setSubject(userDetails.getUsername())
                .addClaims(claimsMap)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + (1000 * 60 * 60 * 2))) // 2 hours
                .signWith(getKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public Claims getClaims(String token) {
        Claims claims = Jwts
                .parserBuilder()
                .setSigningKey(getKey())
                .build()
                .parseClaimsJws(token).getBody();
        return claims;
    }

    public Object getRolesByClaims(String token, String key) {
        Claims claims = getClaims(token);
        Object object = claims.get(key);
        return object;
    }

    public <T> T exportToken(String token, Function<Claims, T> claimsFunction) {
        Claims claims = getClaims(token);
        return claimsFunction.apply(claims);
    }

    public String getUsernameByToken(String token) {
        return exportToken(token, Claims::getSubject);
    }

    public boolean isTokenExpired(String token) {
        Date expiredDate = exportToken(token, Claims::getExpiration);
        return new Date().after(expiredDate);
    }

    public Key getKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
