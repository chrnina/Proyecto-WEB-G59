import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Ciudades, CiudadesRelations, Parques} from '../models';
import {ParquesRepository} from './parques.repository';

export class CiudadesRepository extends DefaultCrudRepository<
  Ciudades,
  typeof Ciudades.prototype.id,
  CiudadesRelations
> {

  public readonly parques: BelongsToAccessor<Parques, typeof Ciudades.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ParquesRepository') protected parquesRepositoryGetter: Getter<ParquesRepository>,
  ) {
    super(Ciudades, dataSource);
    this.parques = this.createBelongsToAccessorFor('parques', parquesRepositoryGetter,);
    this.registerInclusionResolver('parques', this.parques.inclusionResolver);
  }
}
