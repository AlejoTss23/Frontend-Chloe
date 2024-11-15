package com.chole.BackendChole.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.chole.BackendChole.Repository.EventoRepository;
import com.chole.BackendChole.model.Evento;
import com.chole.BackendChole.model.Vestido;

import java.util.List;

@Service
public class EventoService {

    @Autowired
    private EventoRepository eventoRepository;

    // Crear un nuevo evento
    public Evento crearEvento(Evento evento) {
        return eventoRepository.save(evento);
    }

    // Obtener todos los eventos
    public List<Evento> obtenerTodosLosEventos() {
        return eventoRepository.findAll();
    }

    // Agregar un vestido a un evento
    public Evento agregarVestidoAEvento(Long eventoId, Vestido vestido) {
        Evento evento = eventoRepository.findById(eventoId)
                .orElseThrow(() -> new RuntimeException("Evento no encontrado"));
        evento.getVestidos().add(vestido);
        return eventoRepository.save(evento);
    }
}

