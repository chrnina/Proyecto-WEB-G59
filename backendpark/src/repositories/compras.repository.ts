import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Compras, ComprasRelations, Tarjetacredito} from '../models';
import {TarjetacreditoRepository} from './tarjetacredito.repository';

export class ComprasRepository extends DefaultCrudRepository<
  Compras,
  typeof Compras.prototype.id,
  ComprasRelations
> {

  public readonly tarjetacredito: BelongsToAccessor<Tarjetacredito, typeof Compras.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('TarjetacreditoRepository') protected tarjetacreditoRepositoryGetter: Getter<TarjetacreditoRepository>,
  ) {
    super(Compras, dataSource);
    this.tarjetacredito = this.createBelongsToAccessorFor('tarjetacredito', tarjetacreditoRepositoryGetter,);
    this.registerInclusionResolver('tarjetacredito', this.tarjetacredito.inclusionResolver);
  }
}
