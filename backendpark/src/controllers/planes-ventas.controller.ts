import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Planes,
  Ventas,
} from '../models';
import {PlanesRepository} from '../repositories';

export class PlanesVentasController {
  constructor(
    @repository(PlanesRepository) protected planesRepository: PlanesRepository,
  ) { }

  @get('/planes/{id}/ventas', {
    responses: {
      '200': {
        description: 'Array of Planes has many Ventas',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Ventas)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Ventas>,
  ): Promise<Ventas[]> {
    return this.planesRepository.ventas(id).find(filter);
  }

  @post('/planes/{id}/ventas', {
    responses: {
      '200': {
        description: 'Planes model instance',
        content: {'application/json': {schema: getModelSchemaRef(Ventas)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Planes.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ventas, {
            title: 'NewVentasInPlanes',
            exclude: ['id'],
            optional: ['planesId']
          }),
        },
      },
    }) ventas: Omit<Ventas, 'id'>,
  ): Promise<Ventas> {
    return this.planesRepository.ventas(id).create(ventas);
  }

  @patch('/planes/{id}/ventas', {
    responses: {
      '200': {
        description: 'Planes.Ventas PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ventas, {partial: true}),
        },
      },
    })
    ventas: Partial<Ventas>,
    @param.query.object('where', getWhereSchemaFor(Ventas)) where?: Where<Ventas>,
  ): Promise<Count> {
    return this.planesRepository.ventas(id).patch(ventas, where);
  }

  @del('/planes/{id}/ventas', {
    responses: {
      '200': {
        description: 'Planes.Ventas DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Ventas)) where?: Where<Ventas>,
  ): Promise<Count> {
    return this.planesRepository.ventas(id).delete(where);
  }
}
