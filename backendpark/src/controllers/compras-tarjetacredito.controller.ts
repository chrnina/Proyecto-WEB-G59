import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Compras,
  Tarjetacredito,
} from '../models';
import {ComprasRepository} from '../repositories';

export class ComprasTarjetacreditoController {
  constructor(
    @repository(ComprasRepository)
    public comprasRepository: ComprasRepository,
  ) { }

  @get('/compras/{id}/tarjetacredito', {
    responses: {
      '200': {
        description: 'Tarjetacredito belonging to Compras',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Tarjetacredito)},
          },
        },
      },
    },
  })
  async getTarjetacredito(
    @param.path.string('id') id: typeof Compras.prototype.id,
  ): Promise<Tarjetacredito> {
    return this.comprasRepository.tarjetacredito(id);
  }
}
