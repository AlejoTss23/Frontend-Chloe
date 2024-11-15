package com.chole.BackendChole.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.chole.BackendChole.model.Alquiler;

public interface AlquilerRepository extends JpaRepository<Alquiler, Long> {
    // Método personalizado para encontrar alquileres por vestido
    List<Alquiler> findByVestidoId(Long vestidoId);
}

