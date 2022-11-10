import {Entity, model, property, hasMany} from '@loopback/repository';
import {Zonas} from './zonas.model';
import {Comida} from './comida.model';
import {Planes} from './planes.model';
import {Atracciones} from './atracciones.model';
import {Visitantes} from './visitantes.model';

@model()
export class Parques extends Entity {
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
  })
  nombre?: string;

  @property({
    type: 'string',
    required: true,
  })
  direccion: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  descripcion: string;

  @property({
    type: 'string',
    required: true,
  })
  imagen: string;

  @hasMany(() => Zonas)
  zonas: Zonas[];

  @property({
    type: 'string',
  })
  comidaId?: string;

  @hasMany(() => Comida)
  comidas: Comida[];

  @property({
    type: 'string',
  })
  planesId?: string;

  @hasMany(() => Planes)
  planes: Planes[];

  @hasMany(() => Atracciones)
  atracciones: Atracciones[];

  @property({
    type: 'string',
  })
  usuariosId?: string;

  @property({
    type: 'string',
  })
  visitantesId?: string;

  @hasMany(() => Visitantes)
  visitantes: Visitantes[];

  constructor(data?: Partial<Parques>) {
    super(data);
  }
}

export interface ParquesRelations {
  // describe navigational properties here
}

export type ParquesWithRelations = Parques & ParquesRelations;
