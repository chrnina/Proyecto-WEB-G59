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
  Planes,
} from '../models';
import {ParquesRepository} from '../repositories';

export class ParquesPlanesController {
  constructor(
    @repository(ParquesRepository) protected parquesRepository: ParquesRepository,
  ) { }

  @get('/parques/{id}/planes', {
    responses: {
      '200': {
        description: 'Array of Parques has many Planes',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Planes)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Planes>,
  ): Promise<Planes[]> {
    return this.parquesRepository.planes(id).find(filter);
  }

  @post('/parques/{id}/planes', {
    responses: {
      '200': {
        description: 'Parques model instance',
        content: {'application/json': {schema: getModelSchemaRef(Planes)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Parques.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Planes, {
            title: 'NewPlanesInParques',
            exclude: ['id'],
            optional: ['parquesId']
          }),
        },
      },
    }) planes: Omit<Planes, 'id'>,
  ): Promise<Planes> {
    return this.parquesRepository.planes(id).create(planes);
  }

  @patch('/parques/{id}/planes', {
    responses: {
      '200': {
        description: 'Parques.Planes PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Planes, {partial: true}),
        },
      },
    })
    planes: Partial<Planes>,
    @param.query.object('where', getWhereSchemaFor(Planes)) where?: Where<Planes>,
  ): Promise<Count> {
    return this.parquesRepository.planes(id).patch(planes, where);
  }

  @del('/parques/{id}/planes', {
    responses: {
      '200': {
        description: 'Parques.Planes DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Planes)) where?: Where<Planes>,
  ): Promise<Count> {
    return this.parquesRepository.planes(id).delete(where);
  }
}
