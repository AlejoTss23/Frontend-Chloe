import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-alquiler-dialog',
  templateUrl: './alquiler-dialog.component.html',
  styleUrls: ['./alquiler-dialog.component.css']
})

export class AlquilarVestidoDialogComponent {
  alquilerForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AlquilarVestidoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { alquiler?: any, vestido?: any }, // Añadir alquiler como opcional
    private fb: FormBuilder
  ) {
    // Si se pasa un alquiler, cargamos sus datos en el formulario. Si no, usamos el vestido para un nuevo alquiler
    this.alquilerForm = this.fb.group({
      nombreCliente: [data.alquiler?.nombreCliente || '', Validators.required],
      apellidoCliente: [data.alquiler?.apellidoCliente || '', Validators.required],
      fechaAlquiler: [data.alquiler?.fechaAlquiler || '', Validators.required],
      fechaDevolucion: [data.alquiler?.fechaDevolucion || '', Validators.required],
      precioAlquiler: [data.alquiler?.precioAlquiler || data.vestido?.precio || 0, [Validators.required, Validators.min(0)]]
    });
  }

  cerrar(): void {
    this.dialogRef.close();
  }

  confirmarAlquiler(): void {
    if (this.alquilerForm.valid) {
      const alquilerData = {
        ...this.alquilerForm.value,
        vestido: this.data.vestido ? { id: this.data.vestido.id } : this.data.alquiler.vestido // Para diferenciar edición de creación
      };
      console.log(alquilerData);
      this.dialogRef.close(alquilerData);
    }
  }
}
