package com.chole.BackendChole.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.chole.BackendChole.model.Evento;
import com.chole.BackendChole.model.Vestido;
import com.chole.BackendChole.service.EventoService;

@RestController
@RequestMapping("/api/eventos")
public class EventoController {

    @Autowired
    private EventoService eventoService;

    // Crear un nuevo evento
    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'WORKER')")
    public ResponseEntity<Evento> crearEvento(@RequestBody Evento evento) {
        Evento nuevoEvento = eventoService.crearEvento(evento);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevoEvento);
    }

    // Obtener todos los eventos
    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'RWORKER')")
    public ResponseEntity<List<Evento>> obtenerTodosLosEventos() {
        List<Evento> eventos = eventoService.obtenerTodosLosEventos();
        return ResponseEntity.ok(eventos);
    }

    // Agregar un vestido a un evento
    @PostMapping("/{eventoId}/vestidos")
    @PreAuthorize("hasAnyRole('ADMIN', 'WORKER')")
    public ResponseEntity<Evento> agregarVestidoAEvento(@PathVariable Long eventoId, @RequestBody Vestido vestido) {
        Evento eventoActualizado = eventoService.agregarVestidoAEvento(eventoId, vestido);
        return ResponseEntity.ok(eventoActualizado);
    }
}


