package com.chole.BackendChole.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.chole.BackendChole.model.Usuario;
import com.chole.BackendChole.security.JwtResponse;
import com.chole.BackendChole.security.JwtTokenUtil;
import com.chole.BackendChole.service.JwtUserDetailsService;
import com.chole.BackendChole.service.UsuarioService;



@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private JwtUserDetailsService jwtUserDetailsService;

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping("/register")
    public ResponseEntity<UsuarioDTO> register(@RequestBody Usuario usuario) {
        // Si el rol viene vacío o nulo, asignar por defecto el rol "ROLE_WORKER"
        if (usuario.getRole() == null || usuario.getRole().isEmpty()) {
            usuario.setRole("ROLE_WORKER");
        }
    
        Usuario savedUsuario = usuarioService.saveUsuario(usuario);
        return ResponseEntity.ok(new UsuarioDTO(savedUsuario.getId(), savedUsuario.getUsername(), savedUsuario.getRole()));
    }
    

@PostMapping("/login")
public ResponseEntity<?> login(@RequestBody AuthRequest authRequest) {
    try {
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword())
        );
    } catch (BadCredentialsException e) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Creditaciones invalidas");
    }

    // Cargar los detalles del usuario
    final UserDetails userDetails = jwtUserDetailsService.loadUserByUsername(authRequest.getUsername());

    // Generar el token JWT
    final String token = jwtTokenUtil.generateToken(userDetails);

    // Devolver el token en la respuesta
    return ResponseEntity.ok(new JwtResponse(token));
}

}
