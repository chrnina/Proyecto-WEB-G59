import {Entity, model, property, hasMany} from '@loopback/repository';
import {Compras} from './compras.model';

@model()
export class Tarjetacredito extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  numero: string;

  @property({
    type: 'date',
    required: true,
  })
  fechavencimiento: string;

  @property({
    type: 'string',
    required: true,
  })
  ccv: string;

  @hasMany(() => Compras)
  compras: Compras[];

  constructor(data?: Partial<Tarjetacredito>) {
    super(data);
  }
}

export interface TarjetacreditoRelations {
  // describe navigational properties here
}

export type TarjetacreditoWithRelations = Tarjetacredito & TarjetacreditoRelations;
