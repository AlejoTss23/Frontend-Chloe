package com.chole.BackendChole.controller;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.chole.BackendChole.model.Vestido;
import com.chole.BackendChole.service.VestidoService;

@RestController
@RequestMapping("/api/vestidos")
public class VestidoController {

    @Autowired
    private VestidoService vestidoService;


    @PostMapping("/uploadImage")
    public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file) throws IOException {
        try {
            // Guardar el archivo
            String fileName = vestidoService.saveImage(file);
            // Devolver la URL accesible
            return ResponseEntity.ok("/uploads/" + fileName);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al subir la imagen");
        }
    }

    @PostMapping
@PreAuthorize("hasRole('ADMIN')")
public ResponseEntity<Vestido> crearVestido(@RequestBody Vestido vestido) {
    Vestido nuevoVestido = vestidoService.guardarVestido(vestido);
    return ResponseEntity.status(HttpStatus.CREATED).body(nuevoVestido);
}

    // Obtener todos los vestidos
    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'WORKER')")
    public ResponseEntity<List<Vestido>> obtenerTodosLosVestidos() {
        List<Vestido> vestidos = vestidoService.obtenerTodosLosVestidos();
        return ResponseEntity.ok(vestidos);
    }

    // Obtener un vestido por ID
    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'WORKER')")
    public ResponseEntity<Vestido> obtenerVestidoPorId(@PathVariable Long id) {
        Optional<Vestido> vestido = vestidoService.obtenerVestidoPorId(id);
        return vestido.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Crear o actualizar un vestido
    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'WORKER')")
    public ResponseEntity<Vestido> actualizarVestido(@PathVariable Long id, @RequestBody Vestido vestido) {
        if (vestidoService.obtenerVestidoPorId(id).isPresent()) {
            // Setea el ID en el objeto vestido si está ausente
            vestido.setId(id);
            Vestido actualizado = vestidoService.guardarVestido(vestido);
            return ResponseEntity.ok(actualizado);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    

    // Actualizar disponibilidad de un vestido
    @PutMapping("/{id}/disponibilidad")
    @PreAuthorize("hasAnyRole('ADMIN', 'WORKER')")
    public ResponseEntity<Void> actualizarDisponibilidad(@PathVariable Long id, @RequestParam boolean disponible) {
        vestidoService.actualizarDisponibilidad(id, disponible);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
@PreAuthorize("hasRole('ADMIN', 'WORKER')")
public ResponseEntity<Void> eliminarVestido(@PathVariable Long id) {
    vestidoService.eliminarVestido(id);
    return ResponseEntity.noContent().build();
}
}


