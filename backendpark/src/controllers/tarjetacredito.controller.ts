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
import {Tarjetacredito} from '../models';
import {TarjetacreditoRepository} from '../repositories';

export class TarjetacreditoController {
  constructor(
    @repository(TarjetacreditoRepository)
    public tarjetacreditoRepository : TarjetacreditoRepository,
  ) {}

  @post('/tarjetacreditos')
  @response(200, {
    description: 'Tarjetacredito model instance',
    content: {'application/json': {schema: getModelSchemaRef(Tarjetacredito)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tarjetacredito, {
            title: 'NewTarjetacredito',
            exclude: ['id'],
          }),
        },
      },
    })
    tarjetacredito: Omit<Tarjetacredito, 'id'>,
  ): Promise<Tarjetacredito> {
    return this.tarjetacreditoRepository.create(tarjetacredito);
  }

  @get('/tarjetacreditos/count')
  @response(200, {
    description: 'Tarjetacredito model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Tarjetacredito) where?: Where<Tarjetacredito>,
  ): Promise<Count> {
    return this.tarjetacreditoRepository.count(where);
  }

  @get('/tarjetacreditos')
  @response(200, {
    description: 'Array of Tarjetacredito model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Tarjetacredito, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Tarjetacredito) filter?: Filter<Tarjetacredito>,
  ): Promise<Tarjetacredito[]> {
    return this.tarjetacreditoRepository.find(filter);
  }

  @patch('/tarjetacreditos')
  @response(200, {
    description: 'Tarjetacredito PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tarjetacredito, {partial: true}),
        },
      },
    })
    tarjetacredito: Tarjetacredito,
    @param.where(Tarjetacredito) where?: Where<Tarjetacredito>,
  ): Promise<Count> {
    return this.tarjetacreditoRepository.updateAll(tarjetacredito, where);
  }

  @get('/tarjetacreditos/{id}')
  @response(200, {
    description: 'Tarjetacredito model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Tarjetacredito, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Tarjetacredito, {exclude: 'where'}) filter?: FilterExcludingWhere<Tarjetacredito>
  ): Promise<Tarjetacredito> {
    return this.tarjetacreditoRepository.findById(id, filter);
  }

  @patch('/tarjetacreditos/{id}')
  @response(204, {
    description: 'Tarjetacredito PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tarjetacredito, {partial: true}),
        },
      },
    })
    tarjetacredito: Tarjetacredito,
  ): Promise<void> {
    await this.tarjetacreditoRepository.updateById(id, tarjetacredito);
  }

  @put('/tarjetacreditos/{id}')
  @response(204, {
    description: 'Tarjetacredito PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() tarjetacredito: Tarjetacredito,
  ): Promise<void> {
    await this.tarjetacreditoRepository.replaceById(id, tarjetacredito);
  }

  @del('/tarjetacreditos/{id}')
  @response(204, {
    description: 'Tarjetacredito DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.tarjetacreditoRepository.deleteById(id);
  }
}
