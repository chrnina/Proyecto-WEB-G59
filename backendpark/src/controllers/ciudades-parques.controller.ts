import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Ciudades,
  Parques,
} from '../models';
import {CiudadesRepository} from '../repositories';

export class CiudadesParquesController {
  constructor(
    @repository(CiudadesRepository)
    public ciudadesRepository: CiudadesRepository,
  ) { }

  @get('/ciudades/{id}/parques', {
    responses: {
      '200': {
        description: 'Parques belonging to Ciudades',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Parques)},
          },
        },
      },
    },
  })
  async getParques(
    @param.path.string('id') id: typeof Ciudades.prototype.id,
  ): Promise<Parques> {
    return this.ciudadesRepository.parques(id);
  }
}
