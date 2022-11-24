import {Model, model, property} from '@loopback/repository';

@model()
export class Cambiopassword extends Model {
  @property({
    type: 'string',
    required: true,
  })
  actual: string;

  @property({
    type: 'string',
    required: true,
  })
  nueva: string;

  @property({
    type: 'string',
    required: true,
  })
  revalidar: string;


  constructor(data?: Partial<Cambiopassword>) {
    super(data);
  }
}

export interface CambiopasswordRelations {
  // describe navigational properties here
}

export type CambiopasswordWithRelations = Cambiopassword & CambiopasswordRelations;
