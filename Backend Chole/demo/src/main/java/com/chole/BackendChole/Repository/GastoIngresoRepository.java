package com.chole.BackendChole.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.chole.BackendChole.model.GastoIngreso;

@Repository
public interface GastoIngresoRepository extends JpaRepository<GastoIngreso, Long> {
    List<GastoIngreso> findByCategoria(String categoria);
}

