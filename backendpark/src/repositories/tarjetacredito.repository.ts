import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Tarjetacredito, TarjetacreditoRelations, Compras} from '../models';
import {ComprasRepository} from './compras.repository';

export class TarjetacreditoRepository extends DefaultCrudRepository<
  Tarjetacredito,
  typeof Tarjetacredito.prototype.id,
  TarjetacreditoRelations
> {

  public readonly compras: HasManyRepositoryFactory<Compras, typeof Tarjetacredito.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ComprasRepository') protected comprasRepositoryGetter: Getter<ComprasRepository>,
  ) {
    super(Tarjetacredito, dataSource);
    this.compras = this.createHasManyRepositoryFactoryFor('compras', comprasRepositoryGetter,);
    this.registerInclusionResolver('compras', this.compras.inclusionResolver);
  }
}
