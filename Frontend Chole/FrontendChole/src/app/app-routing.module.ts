import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingpageComponent } from './Parte Visual/landingpage/landingpage.component';
import { LoginComponent } from './Parte Visual/login/login.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { AuthGuard } from './auth.guard';
import { AdminUsuariosComponent } from './Administracion/admin-usuarios/admin-usuarios.component';
import { BalanceComponent } from './admin/balance/balance.component';
import { VariableComponent } from './admin/variable/variable.component';
import { VestidoAdminComponent } from './components/vestido-admin/vestido-admin.component';

const routes: Routes = [
  { path: '', redirectTo: '/landingpage', pathMatch: 'full' },
  { path: 'landingpage', component: LandingpageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: SidenavComponent, canActivate: [AuthGuard], data: { requiresAuth: true } },
  { path: 'admin/usuarios', component: AdminUsuariosComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_ADMIN'] } },
  { path: 'admin/balances', component: BalanceComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_ADMIN'] } },
  { path: 'admin/balances/:balanceId/variables', component: VariableComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_ADMIN'] } },
  { path: 'admin/vestidos', component: VestidoAdminComponent, canActivate: [AuthGuard], data: { roles: ['ROLE_ADMIN', 'ROLE_WORKER'] } },
  { path: '**', redirectTo: '/landingpage', pathMatch: 'full' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
