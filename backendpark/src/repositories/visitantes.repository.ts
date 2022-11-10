import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Visitantes, VisitantesRelations, Parques} from '../models';
import {ParquesRepository} from './parques.repository';

export class VisitantesRepository extends DefaultCrudRepository<
  Visitantes,
  typeof Visitantes.prototype.id,
  VisitantesRelations
> {

  public readonly parques: HasManyRepositoryFactory<Parques, typeof Visitantes.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ParquesRepository') protected parquesRepositoryGetter: Getter<ParquesRepository>,
  ) {
    super(Visitantes, dataSource);
    this.parques = this.createHasManyRepositoryFactoryFor('parques', parquesRepositoryGetter,);
    this.registerInclusionResolver('parques', this.parques.inclusionResolver);
  }
}
