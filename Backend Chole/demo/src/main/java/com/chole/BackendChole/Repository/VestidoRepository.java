package com.chole.BackendChole.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.chole.BackendChole.model.Vestido;

public interface VestidoRepository extends JpaRepository<Vestido, Long> {
    // Método personalizado para encontrar vestidos disponibles
    List<Vestido> findByDisponible(boolean disponible);
}

