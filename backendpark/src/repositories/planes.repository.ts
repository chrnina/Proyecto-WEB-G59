import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Planes, PlanesRelations, Parques, Ventas} from '../models';
import {ParquesRepository} from './parques.repository';
import {VentasRepository} from './ventas.repository';

export class PlanesRepository extends DefaultCrudRepository<
  Planes,
  typeof Planes.prototype.id,
  PlanesRelations
> {

  public readonly parques: HasManyRepositoryFactory<Parques, typeof Planes.prototype.id>;

  public readonly ventas: HasManyRepositoryFactory<Ventas, typeof Planes.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ParquesRepository') protected parquesRepositoryGetter: Getter<ParquesRepository>, @repository.getter('VentasRepository') protected ventasRepositoryGetter: Getter<VentasRepository>,
  ) {
    super(Planes, dataSource);
    this.ventas = this.createHasManyRepositoryFactoryFor('ventas', ventasRepositoryGetter,);
    this.registerInclusionResolver('ventas', this.ventas.inclusionResolver);
    this.parques = this.createHasManyRepositoryFactoryFor('parques', parquesRepositoryGetter,);
    this.registerInclusionResolver('parques', this.parques.inclusionResolver);
  }
}
