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
  Atracciones,
} from '../models';
import {ParquesRepository} from '../repositories';

export class ParquesAtraccionesController {
  constructor(
    @repository(ParquesRepository) protected parquesRepository: ParquesRepository,
  ) { }

  @get('/parques/{id}/atracciones', {
    responses: {
      '200': {
        description: 'Array of Parques has many Atracciones',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Atracciones)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Atracciones>,
  ): Promise<Atracciones[]> {
    return this.parquesRepository.atracciones(id).find(filter);
  }

  @post('/parques/{id}/atracciones', {
    responses: {
      '200': {
        description: 'Parques model instance',
        content: {'application/json': {schema: getModelSchemaRef(Atracciones)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Parques.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Atracciones, {
            title: 'NewAtraccionesInParques',
            exclude: ['id'],
            optional: ['parquesId']
          }),
        },
      },
    }) atracciones: Omit<Atracciones, 'id'>,
  ): Promise<Atracciones> {
    return this.parquesRepository.atracciones(id).create(atracciones);
  }

  @patch('/parques/{id}/atracciones', {
    responses: {
      '200': {
        description: 'Parques.Atracciones PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Atracciones, {partial: true}),
        },
      },
    })
    atracciones: Partial<Atracciones>,
    @param.query.object('where', getWhereSchemaFor(Atracciones)) where?: Where<Atracciones>,
  ): Promise<Count> {
    return this.parquesRepository.atracciones(id).patch(atracciones, where);
  }

  @del('/parques/{id}/atracciones', {
    responses: {
      '200': {
        description: 'Parques.Atracciones DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Atracciones)) where?: Where<Atracciones>,
  ): Promise<Count> {
    return this.parquesRepository.atracciones(id).delete(where);
  }
}
