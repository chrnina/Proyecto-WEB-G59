import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Comida, ComidaRelations, Parques} from '../models';
import {ParquesRepository} from './parques.repository';

export class ComidaRepository extends DefaultCrudRepository<
  Comida,
  typeof Comida.prototype.id,
  ComidaRelations
> {

  public readonly parques: HasManyRepositoryFactory<Parques, typeof Comida.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ParquesRepository') protected parquesRepositoryGetter: Getter<ParquesRepository>,
  ) {
    super(Comida, dataSource);
    this.parques = this.createHasManyRepositoryFactoryFor('parques', parquesRepositoryGetter,);
    this.registerInclusionResolver('parques', this.parques.inclusionResolver);
  }
}
