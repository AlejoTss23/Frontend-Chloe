package com.chole.BackendChole.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.chole.BackendChole.model.Evento;

public interface EventoRepository extends JpaRepository<Evento, Long> {
    // Método personalizado para encontrar eventos por nombre (opcional)
    List<Evento> findByNombre(String nombre);
}

