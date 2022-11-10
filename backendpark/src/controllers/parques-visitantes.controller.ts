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
  Visitantes,
} from '../models';
import {ParquesRepository} from '../repositories';

export class ParquesVisitantesController {
  constructor(
    @repository(ParquesRepository) protected parquesRepository: ParquesRepository,
  ) { }

  @get('/parques/{id}/visitantes', {
    responses: {
      '200': {
        description: 'Array of Parques has many Visitantes',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Visitantes)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Visitantes>,
  ): Promise<Visitantes[]> {
    return this.parquesRepository.visitantes(id).find(filter);
  }

  @post('/parques/{id}/visitantes', {
    responses: {
      '200': {
        description: 'Parques model instance',
        content: {'application/json': {schema: getModelSchemaRef(Visitantes)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Parques.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Visitantes, {
            title: 'NewVisitantesInParques',
            exclude: ['id'],
            optional: ['parquesId']
          }),
        },
      },
    }) visitantes: Omit<Visitantes, 'id'>,
  ): Promise<Visitantes> {
    return this.parquesRepository.visitantes(id).create(visitantes);
  }

  @patch('/parques/{id}/visitantes', {
    responses: {
      '200': {
        description: 'Parques.Visitantes PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Visitantes, {partial: true}),
        },
      },
    })
    visitantes: Partial<Visitantes>,
    @param.query.object('where', getWhereSchemaFor(Visitantes)) where?: Where<Visitantes>,
  ): Promise<Count> {
    return this.parquesRepository.visitantes(id).patch(visitantes, where);
  }

  @del('/parques/{id}/visitantes', {
    responses: {
      '200': {
        description: 'Parques.Visitantes DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Visitantes)) where?: Where<Visitantes>,
  ): Promise<Count> {
    return this.parquesRepository.visitantes(id).delete(where);
  }
}
