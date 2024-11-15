package com.chole.BackendChole.service;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.chole.BackendChole.Repository.VestidoRepository;
import com.chole.BackendChole.model.Vestido;

import io.jsonwebtoken.io.IOException;

@Service
public class VestidoService {

    @Autowired
    private VestidoRepository vestidoRepository;

  private final String uploadDir = "uploads/";

    public String saveImage(MultipartFile file) throws IOException, java.io.IOException {
        // Crear el directorio si no existe
        Path uploadPath = Paths.get(uploadDir);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        // Generar un nombre único para la imagen
        String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
        Path filePath = uploadPath.resolve(fileName);

        // Guardar el archivo en el servidor
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        return fileName;
    }

    // Obtener todos los vestidos
    public List<Vestido> obtenerTodosLosVestidos() {
        return vestidoRepository.findAll();
    }

    // Obtener un vestido por ID
    public Optional<Vestido> obtenerVestidoPorId(Long id) {
        return vestidoRepository.findById(id);
    }

    // Crear o actualizar un vestido
    public Vestido guardarVestido(Vestido vestido) {
        if (vestido.getId() != null && vestidoRepository.existsById(vestido.getId())) {
            // Actualiza el vestido existente
            return vestidoRepository.save(vestido);
        }
        // Si no hay ID, creará uno nuevo
        return vestidoRepository.save(vestido);
    }

    // Marcar un vestido como alquilado o disponible
    public void actualizarDisponibilidad(Long vestidoId, boolean disponible) {
        Optional<Vestido> vestidoOpt = vestidoRepository.findById(vestidoId);
        if (vestidoOpt.isPresent()) {
            Vestido vestido = vestidoOpt.get();
            vestido.setDisponible(disponible);
            vestidoRepository.save(vestido);
        }
    }

    public void eliminarVestido(Long id) {
        vestidoRepository.deleteById(id);
    }
}

