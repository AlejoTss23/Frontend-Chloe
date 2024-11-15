package com.chole.BackendChole.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.chole.BackendChole.Repository.BalanceRepository;
import com.chole.BackendChole.model.Balance;

@Service
public class BalanceService {

    @Autowired
    private BalanceRepository balanceRepository;

    public Balance crearBalance(Balance balance) {
        double totalBalance = balance.getVariables().stream()
            .mapToDouble(var -> var.isEsIngreso() ? var.getMonto() : -var.getMonto())
            .sum();
        balance.setTotalBalance(totalBalance);
        return balanceRepository.save(balance);
    }
    public Balance actualizarBalanceTotal(Long balanceId) {
        Balance balance = balanceRepository.findById(balanceId)
                .orElseThrow(() -> new RuntimeException("Balance not found"));
        balance.setTotalBalance(calcularTotalBalance(balance));
        return balanceRepository.save(balance);
    }

    private double calcularTotalBalance(Balance balance) {
        return balance.getVariables().stream()
            .mapToDouble(var -> var.isEsIngreso() ? var.getMonto() : -var.getMonto())
            .sum();
    }

    public List<Balance> obtenerBalances() {
        return balanceRepository.findAll();
    }

    public Optional<Balance> obtenerBalancePorId(Long id) {
        return balanceRepository.findById(id);
    }

    public void eliminarBalance(Long id) {
        balanceRepository.deleteById(id);
    }
}

