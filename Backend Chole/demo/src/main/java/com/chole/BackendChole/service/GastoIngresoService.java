package com.chole.BackendChole.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.chole.BackendChole.Repository.GastoIngresoRepository;
import com.chole.BackendChole.model.GastoIngreso;

@Service
public class GastoIngresoService {
    @Autowired
    private GastoIngresoRepository repository;

    public GastoIngreso saveGastoIngreso(GastoIngreso gastoIngreso) {
        return repository.save(gastoIngreso);
    }

    public List<GastoIngreso> getAllGastosIngresos() {
        return repository.findAll();
    }

    public Double calcularBalanceTotal() {
        Double totalIngresos = repository.findByCategoria("Ingreso")
                                          .stream()
                                          .mapToDouble(GastoIngreso::getMonto)
                                          .sum();
        Double totalGastos = repository.findByCategoria("Gasto")
                                       .stream()
                                       .mapToDouble(GastoIngreso::getMonto)
                                       .sum();
        return totalIngresos - totalGastos;
    }
}

