package com.chole.BackendChole.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.chole.BackendChole.model.GastoIngreso;
import com.chole.BackendChole.service.GastoIngresoService;

@RestController
@RequestMapping("/api/gastos-ingresos")
public class GastoIngresoController {
    @Autowired
    private GastoIngresoService service;

    @PostMapping("/agregar")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<GastoIngreso> agregarGastoIngreso(@RequestBody GastoIngreso gastoIngreso) {
        return ResponseEntity.ok(service.saveGastoIngreso(gastoIngreso));
    }

    @GetMapping("/listar")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<GastoIngreso>> listarGastosIngresos() {
        return ResponseEntity.ok(service.getAllGastosIngresos());
    }

    @GetMapping("/balance")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Double> obtenerBalanceTotal() {
        return ResponseEntity.ok(service.calcularBalanceTotal());
    }
}

