package com.chole.BackendChole.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.chole.BackendChole.model.Balance;

@Repository
public interface BalanceRepository extends JpaRepository<Balance, Long> {
}
