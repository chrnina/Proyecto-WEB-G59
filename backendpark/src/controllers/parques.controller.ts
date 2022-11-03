import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Parques} from '../models';
import {ParquesRepository} from '../repositories';

export class ParquesController {
  constructor(
    @repository(ParquesRepository)
    public parquesRepository : ParquesRepository,
  ) {}

  @post('/parques')
  @response(200, {
    description: 'Parques model instance',
    content: {'application/json': {schema: getModelSchemaRef(Parques)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Parques, {
            title: 'NewParques',
            exclude: ['id'],
          }),
        },
      },
    })
    parques: Omit<Parques, 'id'>,
  ): Promise<Parques> {
    return this.parquesRepository.create(parques);
  }

  @get('/parques/count')
  @response(200, {
    description: 'Parques model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Parques) where?: Where<Parques>,
  ): Promise<Count> {
    return this.parquesRepository.count(where);
  }

  @get('/parques')
  @response(200, {
    description: 'Array of Parques model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Parques, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Parques) filter?: Filter<Parques>,
  ): Promise<Parques[]> {
    return this.parquesRepository.find(filter);
  }

  @patch('/parques')
  @response(200, {
    description: 'Parques PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Parques, {partial: true}),
        },
      },
    })
    parques: Parques,
    @param.where(Parques) where?: Where<Parques>,
  ): Promise<Count> {
    return this.parquesRepository.updateAll(parques, where);
  }

  @get('/parques/{id}')
  @response(200, {
    description: 'Parques model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Parques, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Parques, {exclude: 'where'}) filter?: FilterExcludingWhere<Parques>
  ): Promise<Parques> {
    return this.parquesRepository.findById(id, filter);
  }

  @patch('/parques/{id}')
  @response(204, {
    description: 'Parques PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Parques, {partial: true}),
        },
      },
    })
    parques: Parques,
  ): Promise<void> {
    await this.parquesRepository.updateById(id, parques);
  }

  @put('/parques/{id}')
  @response(204, {
    description: 'Parques PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() parques: Parques,
  ): Promise<void> {
    await this.parquesRepository.replaceById(id, parques);
  }

  @del('/parques/{id}')
  @response(204, {
    description: 'Parques DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.parquesRepository.deleteById(id);
  }
}
