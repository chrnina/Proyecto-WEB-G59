import {Entity, model, property, hasMany} from '@loopback/repository';
import {Parques} from './parques.model';

@model()
export class Visitantes extends Entity {
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
  apellido: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  celular: string;

  @property({
    type: 'string',
    required: true,
  })
  edad: string;

  @property({
    type: 'string',
    required: false,
  })
  clave?: string;

  @hasMany(() => Parques)
  parques: Parques[];

  @property({
    type: 'string',
  })
  parquesId?: string;
   
  constructor(data?: Partial<Visitantes>) {
    super(data);
  }
}

export interface VisitantesRelations {
  // describe navigational properties here
}

export type VisitantesWithRelations = Visitantes & VisitantesRelations;
