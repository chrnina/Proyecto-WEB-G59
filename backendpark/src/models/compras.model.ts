import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Tarjetacredito} from './tarjetacredito.model';

@model()
export class Compras extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'number',
    required: true,
  })
  cantidad: number;

  @property({
    type: 'string',
    required: true,
  })
  entrada: string;

  @belongsTo(() => Tarjetacredito)
  tarjetacreditoId: string;

  constructor(data?: Partial<Compras>) {
    super(data);
  }
}

export interface ComprasRelations {
  // describe navigational properties here
}

export type ComprasWithRelations = Compras & ComprasRelations;
