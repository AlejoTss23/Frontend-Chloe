package com.chole.BackendChole.service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.chole.BackendChole.Repository.AlquilerRepository;
import com.chole.BackendChole.Repository.VestidoRepository;
import com.chole.BackendChole.model.Alquiler;
import com.chole.BackendChole.model.Vestido;

@Service
public class AlquilerService {

    @Autowired
    private AlquilerRepository alquilerRepository;

    @Autowired
    private VestidoService vestidoService;

    @Autowired
    private VestidoRepository vestidoRepository;

    // Crear un nuevo alquiler
public Alquiler crearAlquiler(Alquiler alquiler) {
    if (alquiler.getVestido() == null || alquiler.getVestido().getId() == null) {
        throw new IllegalArgumentException("El alquiler debe tener un vestido asociado con un ID válido.");
    }

    // Recupera el vestido completo usando su ID
    Vestido vestidoCompleto = vestidoRepository.findById(alquiler.getVestido().getId())
            .orElseThrow(() -> new RuntimeException("Vestido no encontrado"));

    // Asigna el vestido completo al alquiler
    alquiler.setVestido(vestidoCompleto);

    // Marcar el vestido como no disponible
    vestidoService.actualizarDisponibilidad(vestidoCompleto.getId(), false);
    
    return alquilerRepository.save(alquiler);
}

    

    // Obtener todos los alquileres
    public List<Alquiler> obtenerTodosLosAlquileres() {
        return alquilerRepository.findAll();
    }

    // Finalizar un alquiler y marcar el vestido como disponible
    public void finalizarAlquiler(Long alquilerId) {
        Alquiler alquiler = alquilerRepository.findById(alquilerId)
                .orElseThrow(() -> new RuntimeException("Alquiler no encontrado"));
        // Marcar el vestido como disponible nuevamente
        vestidoService.actualizarDisponibilidad(alquiler.getVestido().getId(), true);
        alquilerRepository.deleteById(alquilerId);
    }

public Alquiler actualizarAlquiler(Long id, Alquiler alquiler) {
    Optional<Alquiler> alquilerExistenteOpt = alquilerRepository.findById(id);
    
    if (alquilerExistenteOpt.isPresent()) {
        Alquiler alquilerExistente = alquilerExistenteOpt.get();
        // Actualiza los campos necesarios en el alquiler existente
        alquilerExistente.setNombreCliente(alquiler.getNombreCliente());
        alquilerExistente.setApellidoCliente(alquiler.getApellidoCliente());
        alquilerExistente.setFechaAlquiler(alquiler.getFechaAlquiler());
        alquilerExistente.setFechaDevolucion(alquiler.getFechaDevolucion());
        alquilerExistente.setPrecioAlquiler(alquiler.getPrecioAlquiler());

        // Guarda el alquiler actualizado en el repositorio
        return alquilerRepository.save(alquilerExistente);
    } else {
        throw new NoSuchElementException("Alquiler con ID " + id + " no encontrado.");
    }
}

    
    public void eliminarAlquiler(Long id) {
        Optional<Alquiler> alquilerOpt = alquilerRepository.findById(id);
        if (alquilerOpt.isPresent()) {
            Alquiler alquiler = alquilerOpt.get();
            Vestido vestido = alquiler.getVestido();
            vestido.setDisponible(true); // Marca el vestido como disponible
            vestidoRepository.save(vestido); // Guarda el cambio en la disponibilidad del vestido
            alquilerRepository.delete(alquiler);
        }
    }
    
}

