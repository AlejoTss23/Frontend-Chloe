import { Component, OnInit } from '@angular/core';
import { AlquilerService } from 'src/app/service/alquiler.service';
import { VestidoService } from 'src/app/service/vestido.service';
import { EventoService } from 'src/app/service/evento.service';
import { MatDialog } from '@angular/material/dialog';
import { DetalleVestidoDialogComponent } from '../detalle-vestido-dialog/detalle-vestido-dialog.component';
import { AlquilarVestidoDialogComponent } from '../alquiler-dialog/alquiler-dialog.component';
import { CrearVestidoDialogComponent } from '../crear-vestido-dialog/crear-vestido-dialog.component';


@Component({
  selector: 'app-vestido-admin',
  templateUrl: './vestido-admin.component.html',
  styleUrls: ['./vestido-admin.component.css']
})
export class VestidoAdminComponent implements OnInit {
  vestidos: any[] = [];
  alquileres: any[] = [];


  constructor(
    private vestidoService: VestidoService,
    private alquilerService: AlquilerService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {

    this.loadVestidos();
    this.loadAlquileres();
  }

  // Cargar la lista de vestidos
  loadVestidos(): void {
    this.vestidoService.getVestidos().subscribe(
      (data) => (this.vestidos = data),
      (error) => console.error('Error loading vestidos:', error)
    );
  }


// Crear un nuevo vestido
crearVestido(): void {
  const dialogRef = this.dialog.open(CrearVestidoDialogComponent, {
    width: '400px'
  });

  dialogRef.afterClosed().subscribe((vestidoData) => {
    if (vestidoData) {
      this.vestidoService.createVestido(vestidoData).subscribe(
        () => this.loadVestidos(),
        (error) => console.error('Error creating vestido:', error)
      );
    }
  });
}


  // Ver detalles de un vestido
  verDetalles(vestido: any): void {
    this.dialog.open(DetalleVestidoDialogComponent, {
      width: '400px',
      data: { vestido }
    });
  }

  // Alquilar un vestido
  alquilarVestido(vestido: any): void {
    const dialogRef = this.dialog.open(AlquilarVestidoDialogComponent, {
      width: '400px',
      data: { vestido }
    });

    dialogRef.afterClosed().subscribe((alquilerData) => {
      if (alquilerData) {
        alquilerData.vestido = { id: vestido.id, ...vestido };
        this.alquilerService.createAlquiler(alquilerData).subscribe(
          () => {
            this.loadAlquileres();
            this.loadVestidos();
          },
          (error) => console.error('Error creating alquiler:', error)
        );
      }
    });
  }

  // Editar un vestido
// Editar un vestido
updateVestido(vestido: any): void {
  const dialogRef = this.dialog.open(CrearVestidoDialogComponent, {
    width: '400px',
    data: { ...vestido } // Pasa los datos actuales del vestido
  });

  dialogRef.afterClosed().subscribe((updatedVestido) => {
    if (updatedVestido) {
      this.vestidoService.updateVestido(vestido.id, updatedVestido).subscribe(
        () => this.loadVestidos(),
        (error) => console.error('Error updating vestido:', error)
      );
    }
  });
}



  // Eliminar un vestido
  deleteVestido(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este vestido?')) {
      this.vestidoService.deleteVestido(id).subscribe(
        () => this.loadVestidos(),
        (error) => console.error('Error deleting vestido:', error)
      );
    }
  }

  // Cargar la lista de alquileres
  loadAlquileres(): void {
    this.alquilerService.getAlquileres().subscribe(
      (data) => (this.alquileres = data),
      (error) => console.error('Error loading alquileres:', error)
    );
  }

  editarAlquiler(alquiler: any): void {
    const dialogRef = this.dialog.open(AlquilarVestidoDialogComponent, {
      width: '400px',
      data: { alquiler } // Envía el alquiler completo
    });
  
    dialogRef.afterClosed().subscribe((updatedAlquiler) => {
      if (updatedAlquiler) {
        this.alquilerService.updateAlquiler(alquiler.id, updatedAlquiler).subscribe(
          () => this.loadAlquileres(),
          (error) => console.error('Error updating alquiler:', error)
        );
      }
    });
  }

  eliminarAlquiler(alquilerId: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este alquiler?')) {
      this.alquilerService.deleteAlquiler(alquilerId).subscribe(
        () => this.loadAlquileres(),
        (error) => console.error('Error deleting alquiler:', error)
      );
    }
  }
  
}
