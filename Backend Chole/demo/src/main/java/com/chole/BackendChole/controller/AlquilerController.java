package com.chole.BackendChole.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.chole.BackendChole.model.Alquiler;
import com.chole.BackendChole.service.AlquilerService;

@RestController
@RequestMapping("/api/alquileres")
public class AlquilerController {

    @Autowired
    private AlquilerService alquilerService;

    // Crear un nuevo alquiler
    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'WORKER')")
    public ResponseEntity<Alquiler> crearAlquiler(@RequestBody Alquiler alquiler) {
        Alquiler nuevoAlquiler = alquilerService.crearAlquiler(alquiler);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevoAlquiler);
    }
    

    // Obtener todos los alquileres
    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'WORKER')")
    public ResponseEntity<List<Alquiler>> obtenerTodosLosAlquileres() {
        List<Alquiler> alquileres = alquilerService.obtenerTodosLosAlquileres();
        return ResponseEntity.ok(alquileres);
    }

    // Finalizar un alquiler (y marcar el vestido como disponible)
    @DeleteMapping("/{id}/finalizar")
    @PreAuthorize("hasAnyRole('ADMIN', 'WORKER')")
    public ResponseEntity<Void> finalizarAlquiler(@PathVariable Long id) {
        alquilerService.finalizarAlquiler(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
@PreAuthorize("hasRole('ADMIN')")
public ResponseEntity<Alquiler> actualizarAlquiler(@PathVariable Long id, @RequestBody Alquiler alquiler) {
    Alquiler updatedAlquiler = alquilerService.actualizarAlquiler(id, alquiler);
    return ResponseEntity.ok(updatedAlquiler);
}

@DeleteMapping("/{id}")
@PreAuthorize("hasRole('ADMIN')")
public ResponseEntity<Void> eliminarAlquiler(@PathVariable Long id) {
    alquilerService.eliminarAlquiler(id);
    return ResponseEntity.noContent().build();
}

}


