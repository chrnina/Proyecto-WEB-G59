import {Entity, model, property, hasMany} from '@loopback/repository';
import {Parques} from './parques.model';
import {Ventas} from './ventas.model';

@model()
export class Planes extends Entity {
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
  codigo: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  color: string;

  @property({
    type: 'string',
    required: true,
  })
  valor: string;

  @hasMany(() => Parques)
  parques: Parques[];

  @property({
    type: 'string',
  })
  parquesId?: string;

  @hasMany(() => Ventas)
  ventas: Ventas[];

  @property({
    type: 'string',
  })
  ventasId?: string;

  constructor(data?: Partial<Planes>) {
    super(data);
  }
}

export interface PlanesRelations {
  // describe navigational properties here
}

export type PlanesWithRelations = Planes & PlanesRelations;
