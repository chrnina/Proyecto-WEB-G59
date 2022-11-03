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
  Tarjetacredito,
  Compras,
} from '../models';
import {TarjetacreditoRepository} from '../repositories';

export class TarjetacreditoComprasController {
  constructor(
    @repository(TarjetacreditoRepository) protected tarjetacreditoRepository: TarjetacreditoRepository,
  ) { }

  @get('/tarjetacreditos/{id}/compras', {
    responses: {
      '200': {
        description: 'Array of Tarjetacredito has many Compras',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Compras)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Compras>,
  ): Promise<Compras[]> {
    return this.tarjetacreditoRepository.compras(id).find(filter);
  }

  @post('/tarjetacreditos/{id}/compras', {
    responses: {
      '200': {
        description: 'Tarjetacredito model instance',
        content: {'application/json': {schema: getModelSchemaRef(Compras)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Tarjetacredito.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Compras, {
            title: 'NewComprasInTarjetacredito',
            exclude: ['id'],
            optional: ['tarjetacreditoId']
          }),
        },
      },
    }) compras: Omit<Compras, 'id'>,
  ): Promise<Compras> {
    return this.tarjetacreditoRepository.compras(id).create(compras);
  }

  @patch('/tarjetacreditos/{id}/compras', {
    responses: {
      '200': {
        description: 'Tarjetacredito.Compras PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Compras, {partial: true}),
        },
      },
    })
    compras: Partial<Compras>,
    @param.query.object('where', getWhereSchemaFor(Compras)) where?: Where<Compras>,
  ): Promise<Count> {
    return this.tarjetacreditoRepository.compras(id).patch(compras, where);
  }

  @del('/tarjetacreditos/{id}/compras', {
    responses: {
      '200': {
        description: 'Tarjetacredito.Compras DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Compras)) where?: Where<Compras>,
  ): Promise<Count> {
    return this.tarjetacreditoRepository.compras(id).delete(where);
  }
}
