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
  Comida,
  Parques,
} from '../models';
import {ComidaRepository} from '../repositories';

export class ComidaParquesController {
  constructor(
    @repository(ComidaRepository) protected comidaRepository: ComidaRepository,
  ) { }

  @get('/comidas/{id}/parques', {
    responses: {
      '200': {
        description: 'Array of Comida has many Parques',
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
    return this.comidaRepository.parques(id).find(filter);
  }

  @post('/comidas/{id}/parques', {
    responses: {
      '200': {
        description: 'Comida model instance',
        content: {'application/json': {schema: getModelSchemaRef(Parques)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Comida.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Parques, {
            title: 'NewParquesInComida',
            exclude: ['id'],
            optional: ['comidaId']
          }),
        },
      },
    }) parques: Omit<Parques, 'id'>,
  ): Promise<Parques> {
    return this.comidaRepository.parques(id).create(parques);
  }

  @patch('/comidas/{id}/parques', {
    responses: {
      '200': {
        description: 'Comida.Parques PATCH success count',
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
    return this.comidaRepository.parques(id).patch(parques, where);
  }

  @del('/comidas/{id}/parques', {
    responses: {
      '200': {
        description: 'Comida.Parques DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Parques)) where?: Where<Parques>,
  ): Promise<Count> {
    return this.comidaRepository.parques(id).delete(where);
  }
}
