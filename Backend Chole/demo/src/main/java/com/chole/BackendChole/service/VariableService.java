package com.chole.BackendChole.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.chole.BackendChole.Repository.BalanceRepository;
import com.chole.BackendChole.Repository.VariableRepository;
import com.chole.BackendChole.model.Balance;
import com.chole.BackendChole.model.Variable;

@Service
public class VariableService {

    @Autowired
    private VariableRepository variableRepository;

    @Autowired
    private BalanceRepository balanceRepository;

    public Variable agregarVariable(Long balanceId, Variable variable) {
        Balance balance = balanceRepository.findById(balanceId)
            .orElseThrow(() -> new ResourceNotFoundException("Balance no encontrado con id: " + balanceId));

        variable.setBalance(balance); // Asocia la variable al balance
        Variable nuevaVariable = variableRepository.save(variable); // Guarda solo la variable

        // Recalcula el balance total después de agregar la variable
        recalcularTotalBalance(balance);
        balanceRepository.save(balance); // Guarda el balance con el balance total actualizado

        return nuevaVariable;
    }
    

    public Variable actualizarVariable(Long variableId, Variable variableActualizada) {
        Variable variable = variableRepository.findById(variableId)
            .orElseThrow(() -> new ResourceNotFoundException("Variable no encontrada con id: " + variableId));

        variable.setNombre(variableActualizada.getNombre());
        variable.setMonto(variableActualizada.getMonto());
        variable.setEsIngreso(variableActualizada.isEsIngreso());

        // Recalcular el balance total
        Balance balance = variable.getBalance();
        recalcularTotalBalance(balance);
        balanceRepository.save(balance);

        return variableRepository.save(variable);
    }

    public void eliminarVariable(Long variableId) {
        Variable variable = variableRepository.findById(variableId)
            .orElseThrow(() -> new ResourceNotFoundException("Variable no encontrada con id: " + variableId));

        Balance balance = variable.getBalance();
        variableRepository.delete(variable);

        // Recalcular el balance total después de eliminar la variable
        recalcularTotalBalance(balance);
        balanceRepository.save(balance);
    }
    private void recalcularTotalBalance(Balance balance) {
        double totalBalance = balance.getVariables().stream()
            .mapToDouble(var -> var.isEsIngreso() ? var.getMonto() : -var.getMonto())
            .sum();
        balance.setTotalBalance(totalBalance);
        System.out.println("Total Balance Calculado después de actualizar: " + totalBalance);
    }  

    public List<Variable> obtenerVariablesPorBalance(Long balanceId) {
        Balance balance = balanceRepository.findById(balanceId)
                .orElseThrow(() -> new ResourceNotFoundException("Balance no encontrado con ID: " + balanceId));
        return balance.getVariables();
    }
}
