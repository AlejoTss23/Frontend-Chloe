package com.chole.BackendChole.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.chole.BackendChole.model.Variable;

@Repository
public interface VariableRepository extends JpaRepository<Variable, Long> {
}
