import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParametrosRoutingModule } from './parametros-routing.module';
import { CrearClientesComponent } from './Clientes/crear-clientes/crear-clientes.component';
import { EditarClientesComponent } from './Clientes/editar-clientes/editar-clientes.component';
import { ConsultarClientesComponent } from './Clientes/consultar-clientes/consultar-clientes.component';
import { EliminarClientesComponent } from './Clientes/eliminar-clientes/eliminar-clientes.component';


@NgModule({
  declarations: [
    CrearClientesComponent,
    EditarClientesComponent,
    ConsultarClientesComponent,
    EliminarClientesComponent
  ],
  imports: [
    CommonModule,
    ParametrosRoutingModule
  ]
})
export class ParametrosModule { }
