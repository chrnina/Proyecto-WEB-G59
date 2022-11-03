import {Entity, model, property, hasMany} from '@loopback/repository';
import {Parques} from './parques.model';

@model()
export class Comida extends Entity {
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
  imagen: string;

  @property({
    type: 'string',
    required: true,
  })
  menu: string;

  @property({
    type: 'number',
    required: true,
  })
  precio: number;

  @hasMany(() => Parques)
  parques: Parques[];

  @property({
    type: 'string',
  })
  parquesId?: string;

  constructor(data?: Partial<Comida>) {
    super(data);
  }
}

export interface ComidaRelations {
  // describe navigational properties here
}

export type ComidaWithRelations = Comida & ComidaRelations;
