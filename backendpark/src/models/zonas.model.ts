import {Entity, model, property} from '@loopback/repository';

@model()
export class Zonas extends Entity {
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
  descripcion: string;

  @property({
    type: 'string',
  })
  parquesId?: string;

  constructor(data?: Partial<Zonas>) {
    super(data);
  }
}

export interface ZonasRelations {
  // describe navigational properties here
}

export type ZonasWithRelations = Zonas & ZonasRelations;
