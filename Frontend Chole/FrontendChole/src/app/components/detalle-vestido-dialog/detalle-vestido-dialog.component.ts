import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/service/authservice.service';

@Component({
  selector: 'app-detalle-vestido-dialog',
  templateUrl: './detalle-vestido-dialog.component.html',
  styleUrls: ['./detalle-vestido-dialog.component.css']
})
export class DetalleVestidoDialogComponent {
  canViewPrice: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<DetalleVestidoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { vestido: any },
private authservice: AuthService
  ) {}

  ngOnInit(): void {
    const role = this.authservice.getUserRole();
    this.canViewPrice = role === 'ROLE_ADMIN'; // Solo ADMIN puede ver el precio
  }

  // Cierra el modal
  cerrar(): void {
    this.dialogRef.close();
  }
}

