package com.chole.BackendChole.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.chole.BackendChole.model.Balance;
import com.chole.BackendChole.model.Variable;
import com.chole.BackendChole.service.BalanceService;
import com.chole.BackendChole.service.VariableService;

@RestController
@RequestMapping("/api/balances")
public class BalanceController {

    @Autowired
    private BalanceService balanceService;

    @Autowired
    private VariableService variableService;

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Balance> crearBalance(@RequestBody Balance balance) {
        Balance nuevoBalance = balanceService.crearBalance(balance);
        return ResponseEntity.ok(nuevoBalance);
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Balance>> obtenerBalances() {
        List<Balance> balances = balanceService.obtenerBalances();
        return ResponseEntity.ok(balances);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Balance> obtenerBalancePorId(@PathVariable Long id) {
        Optional<Balance> balanceOpt = balanceService.obtenerBalancePorId(id);
        return balanceOpt.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> eliminarBalance(@PathVariable Long id) {
        balanceService.eliminarBalance(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{balanceId}/variables")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Variable> agregarVariable(@PathVariable Long balanceId, @RequestBody Variable variable) {
        Variable nuevaVariable = variableService.agregarVariable(balanceId, variable);
        return ResponseEntity.ok(nuevaVariable);
    }

    @GetMapping("/{balanceId}/variables")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Variable>> obtenerVariablesPorBalance(@PathVariable Long balanceId) {
        List<Variable> variables = variableService.obtenerVariablesPorBalance(balanceId);
        return ResponseEntity.ok(variables);
    }

    
}



