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
  Parques,
} from '../models';
import {PlanesRepository} from '../repositories';

export class PlanesParquesController {
  constructor(
    @repository(PlanesRepository) protected planesRepository: PlanesRepository,
  ) { }

  @get('/planes/{id}/parques', {
    responses: {
      '200': {
        description: 'Array of Planes has many Parques',
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
    return this.planesRepository.parques(id).find(filter);
  }

  @post('/planes/{id}/parques', {
    responses: {
      '200': {
        description: 'Planes model instance',
        content: {'application/json': {schema: getModelSchemaRef(Parques)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Planes.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Parques, {
            title: 'NewParquesInPlanes',
            exclude: ['id'],
            optional: ['planesId']
          }),
        },
      },
    }) parques: Omit<Parques, 'id'>,
  ): Promise<Parques> {
    return this.planesRepository.parques(id).create(parques);
  }

  @patch('/planes/{id}/parques', {
    responses: {
      '200': {
        description: 'Planes.Parques PATCH success count',
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
    return this.planesRepository.parques(id).patch(parques, where);
  }

  @del('/planes/{id}/parques', {
    responses: {
      '200': {
        description: 'Planes.Parques DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Parques)) where?: Where<Parques>,
  ): Promise<Count> {
    return this.planesRepository.parques(id).delete(where);
  }
}
