import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingpageComponent } from './Parte Visual/landingpage/landingpage.component';
import { LoginComponent } from './Parte Visual/login/login.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { FormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReferenciasComponent } from './Parte Visual/referencias/referencias.component';
import { BienvenidaComponent } from './Parte Visual/bienvenida/bienvenida.component';
import { AlquilerComponent } from './Parte Visual/alquiler/alquiler.component';
import { HeaderComponent } from './Parte Visual/header/header.component';
import { AdminUsuariosComponent } from './Administracion/admin-usuarios/admin-usuarios.component';
import { MatDialogModule } from '@angular/material/dialog';

import { FooterComponent } from './Parte Visual/footer/footer.component';
import { CarruselComponent } from './Parte Visual/carrusel/carrusel.component';
import { NosotrosComponent } from './Parte Visual/nosotros/nosotros.component';
import { BalanceComponent } from './admin/balance/balance.component';
import { VariableComponent } from './admin/variable/variable.component';
import { VestidoAdminComponent } from './components/vestido-admin/vestido-admin.component';
import { DetalleVestidoDialogComponent } from './components/detalle-vestido-dialog/detalle-vestido-dialog.component';
import { AlquilarVestidoDialogComponent } from './components/alquiler-dialog/alquiler-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CrearVestidoDialogComponent } from './components/crear-vestido-dialog/crear-vestido-dialog.component';




export function tokenGetter() {
  return localStorage.getItem('jwtToken');
}
@NgModule({
  declarations: [
    AppComponent,
    LandingpageComponent,
    LoginComponent,
    ReferenciasComponent,
    BienvenidaComponent,
    AlquilerComponent,
    HeaderComponent,
    AdminUsuariosComponent,

    FooterComponent,
    CarruselComponent,
    NosotrosComponent,
    BalanceComponent,
    VariableComponent,
    VestidoAdminComponent,
    DetalleVestidoDialogComponent,
    AlquilarVestidoDialogComponent,
    CrearVestidoDialogComponent,





  ],
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    SidenavComponent,
      JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:8080'],
        disallowedRoutes: ['localhost:8080/auth/login'],
      },
    }),
    
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
