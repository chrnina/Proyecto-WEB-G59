import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeguridadRoutingModule } from './seguridad-routing.module';
import { LoginComponent } from './general/login/login.component';
import { RecuperarPassComponent } from './general/recuperar-pass/recuperar-pass.component';
import { AsignarPassComponent } from './general/asignar-pass/asignar-pass.component';
import { CrearUserComponent } from './Usuarios/crear-user/crear-user.component';
import { EditarUserComponent } from './Usuarios/editar-user/editar-user.component';
import { ConsutarUserComponent } from './Usuarios/consutar-user/consutar-user.component';
import { EliminarUserComponent } from './Usuarios/eliminar-user/eliminar-user.component';


@NgModule({
  declarations: [
    LoginComponent,
    RecuperarPassComponent,
    AsignarPassComponent,
    CrearUserComponent,
    EditarUserComponent,
    ConsutarUserComponent,
    EliminarUserComponent
  ],
  imports: [
    CommonModule,
    SeguridadRoutingModule
  ]
})
export class SeguridadModule { }
