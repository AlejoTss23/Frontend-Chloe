import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/service/authservice.service';
import { VestidoService } from 'src/app/service/vestido.service';

@Component({
  selector: 'app-crear-vestido-dialog',
  templateUrl: './crear-vestido-dialog.component.html'
})
export class CrearVestidoDialogComponent implements OnInit {
  vestidoForm: FormGroup;
  selectedFile: File | null = null;
  isAdmin: boolean = false;


  constructor(
    private fb: FormBuilder,
    private vestidoService: VestidoService,
    private authService: AuthService,
    public dialogRef: MatDialogRef<CrearVestidoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any // Hacer `data` opcional
  ) {
    this.vestidoForm = this.fb.group({
      color: ['', Validators.required],
      nombre: ['', Validators.required],
      precio: [0, [Validators.required, Validators.min(0)]],
      descripcion: [''],
      foto: ['']
    });
  }

  ngOnInit(): void {
    const role = this.authService.getUserRole();
    this.isAdmin = role === 'ROLE_ADMIN'; // Solo permitir la funcionalidad si el usuario es ADMIN

    if (!this.isAdmin) {
      this.cerrar(); // Cierra el dialog si no es administrador
    }
    // Si hay datos recibidos, cargar los valores en el formulario
    if (this.data) {
      this.vestidoForm.patchValue({
        color: this.data.color,
        nombre: this.data.nombre,
        precio: this.data.precio,
        descripcion: this.data.descripcion,
        foto: this.data.foto
      });
    }
  }

  cerrar(): void {
    this.dialogRef.close();
  }

  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files[0]) {
      this.selectedFile = fileInput.files[0];
    }
  }

  confirmarCreacion(): void {
    if (this.isAdmin && this.vestidoForm.valid) {
      if (this.selectedFile) {
        this.vestidoService.uploadImage(this.selectedFile).subscribe((fileName) => {
          this.vestidoForm.get('foto')?.setValue(fileName);
          this.dialogRef.close(this.vestidoForm.value);
        });
      } else {
        this.dialogRef.close(this.vestidoForm.value);
      }
    }
  }



}



