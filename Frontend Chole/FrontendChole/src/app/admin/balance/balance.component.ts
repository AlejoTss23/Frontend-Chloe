import { Component, OnInit } from '@angular/core';
import { BalanceService } from 'src/app/service/balance.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html'
})
export class BalanceComponent implements OnInit {
  balances: any[] = [];

  constructor(private balanceService: BalanceService, private router: Router) {}

  ngOnInit() {
    this.obtenerBalances();
  }

  obtenerBalances() {
    this.balanceService.getBalances().subscribe(data => {
      this.balances = data;
    });
  }

  crearBalance() {
    const nuevoBalance = { fecha: new Date().toISOString().split('T')[0], totalBalance: 0, variables: [] };
    this.balanceService.createBalance(nuevoBalance).subscribe(data => {
      this.obtenerBalances(); // Refrescar la lista después de crear
    });
  }

  verDetalle(balanceId: number) {
    this.router.navigate(['/admin/balances', balanceId, 'variables']);
  }

  eliminarBalance(balanceId: number) {
    this.balanceService.deleteBalance(balanceId).subscribe(() => {
      this.obtenerBalances(); // Actualizar la lista después de eliminar
    });
  }
}
