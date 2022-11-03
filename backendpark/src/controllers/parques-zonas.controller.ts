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
  Parques,
  Zonas,
} from '../models';
import {ParquesRepository} from '../repositories';

export class ParquesZonasController {
  constructor(
    @repository(ParquesRepository) protected parquesRepository: ParquesRepository,
  ) { }

  @get('/parques/{id}/zonas', {
    responses: {
      '200': {
        description: 'Array of Parques has many Zonas',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Zonas)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Zonas>,
  ): Promise<Zonas[]> {
    return this.parquesRepository.zonas(id).find(filter);
  }

  @post('/parques/{id}/zonas', {
    responses: {
      '200': {
        description: 'Parques model instance',
        content: {'application/json': {schema: getModelSchemaRef(Zonas)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Parques.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Zonas, {
            title: 'NewZonasInParques',
            exclude: ['id'],
            optional: ['parquesId']
          }),
        },
      },
    }) zonas: Omit<Zonas, 'id'>,
  ): Promise<Zonas> {
    return this.parquesRepository.zonas(id).create(zonas);
  }

  @patch('/parques/{id}/zonas', {
    responses: {
      '200': {
        description: 'Parques.Zonas PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Zonas, {partial: true}),
        },
      },
    })
    zonas: Partial<Zonas>,
    @param.query.object('where', getWhereSchemaFor(Zonas)) where?: Where<Zonas>,
  ): Promise<Count> {
    return this.parquesRepository.zonas(id).patch(zonas, where);
  }

  @del('/parques/{id}/zonas', {
    responses: {
      '200': {
        description: 'Parques.Zonas DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Zonas)) where?: Where<Zonas>,
  ): Promise<Count> {
    return this.parquesRepository.zonas(id).delete(where);
  }
}
