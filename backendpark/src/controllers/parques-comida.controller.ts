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
  Comida,
} from '../models';
import {ParquesRepository} from '../repositories';

export class ParquesComidaController {
  constructor(
    @repository(ParquesRepository) protected parquesRepository: ParquesRepository,
  ) { }

  @get('/parques/{id}/comidas', {
    responses: {
      '200': {
        description: 'Array of Parques has many Comida',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Comida)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Comida>,
  ): Promise<Comida[]> {
    return this.parquesRepository.comidas(id).find(filter);
  }

  @post('/parques/{id}/comidas', {
    responses: {
      '200': {
        description: 'Parques model instance',
        content: {'application/json': {schema: getModelSchemaRef(Comida)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Parques.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Comida, {
            title: 'NewComidaInParques',
            exclude: ['id'],
            optional: ['parquesId']
          }),
        },
      },
    }) comida: Omit<Comida, 'id'>,
  ): Promise<Comida> {
    return this.parquesRepository.comidas(id).create(comida);
  }

  @patch('/parques/{id}/comidas', {
    responses: {
      '200': {
        description: 'Parques.Comida PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Comida, {partial: true}),
        },
      },
    })
    comida: Partial<Comida>,
    @param.query.object('where', getWhereSchemaFor(Comida)) where?: Where<Comida>,
  ): Promise<Count> {
    return this.parquesRepository.comidas(id).patch(comida, where);
  }

  @del('/parques/{id}/comidas', {
    responses: {
      '200': {
        description: 'Parques.Comida DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Comida)) where?: Where<Comida>,
  ): Promise<Count> {
    return this.parquesRepository.comidas(id).delete(where);
  }
}
