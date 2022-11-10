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
  Visitantes,
  Parques,
} from '../models';
import {VisitantesRepository} from '../repositories';

export class VisitantesParquesController {
  constructor(
    @repository(VisitantesRepository) protected visitantesRepository: VisitantesRepository,
  ) { }

  @get('/visitantes/{id}/parques', {
    responses: {
      '200': {
        description: 'Array of Visitantes has many Parques',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Parques)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Parques>,
  ): Promise<Parques[]> {
    return this.visitantesRepository.parques(id).find(filter);
  }

  @post('/visitantes/{id}/parques', {
    responses: {
      '200': {
        description: 'Visitantes model instance',
        content: {'application/json': {schema: getModelSchemaRef(Parques)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Visitantes.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Parques, {
            title: 'NewParquesInVisitantes',
            exclude: ['id'],
            optional: ['visitantesId']
          }),
        },
      },
    }) parques: Omit<Parques, 'id'>,
  ): Promise<Parques> {
    return this.visitantesRepository.parques(id).create(parques);
  }

  @patch('/visitantes/{id}/parques', {
    responses: {
      '200': {
        description: 'Visitantes.Parques PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Parques, {partial: true}),
        },
      },
    })
    parques: Partial<Parques>,
    @param.query.object('where', getWhereSchemaFor(Parques)) where?: Where<Parques>,
  ): Promise<Count> {
    return this.visitantesRepository.parques(id).patch(parques, where);
  }

  @del('/visitantes/{id}/parques', {
    responses: {
      '200': {
        description: 'Visitantes.Parques DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Parques)) where?: Where<Parques>,
  ): Promise<Count> {
    return this.visitantesRepository.parques(id).delete(where);
  }
}
