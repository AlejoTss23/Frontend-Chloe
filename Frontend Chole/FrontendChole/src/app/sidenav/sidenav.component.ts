import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../service/authservice.service';
@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatSidenavModule, MatListModule, RouterModule,CommonModule ],
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent  {
  
  constructor(
    private authService: AuthService,
    changeDetectorRef: ChangeDetectorRef, 
    media: MediaMatcher, 
    private router: Router  // Aquí se inyecta el Router
  ) {}

  logout(): void {
    this.authService.logout();  // Llama al método de logout en AuthService
    this.router.navigate(['/landingpage']);  // Redirige a la página principal
  }
}
