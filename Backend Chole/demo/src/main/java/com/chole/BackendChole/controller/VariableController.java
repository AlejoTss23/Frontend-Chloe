package com.chole.BackendChole.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.chole.BackendChole.model.Variable;
import com.chole.BackendChole.service.VariableService;

@RestController
@RequestMapping("/api/variables")
public class VariableController {

    @Autowired
    private VariableService variableService;

    @PutMapping("/{variableId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Variable> actualizarVariable(
            @PathVariable Long variableId, @RequestBody Variable variableActualizada) {
        Variable variable = variableService.actualizarVariable(variableId, variableActualizada);
        return ResponseEntity.ok(variable);
    }

    @DeleteMapping("/{variableId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> eliminarVariable(@PathVariable Long variableId) {
        variableService.eliminarVariable(variableId);
        return ResponseEntity.noContent().build();
    }
}



