import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Usuarios, UsuariosRelations, Parques, Rol} from '../models';
import {ParquesRepository} from './parques.repository';
import {RolRepository} from './rol.repository';

export class UsuariosRepository extends DefaultCrudRepository<
  Usuarios,
  typeof Usuarios.prototype.id,
  UsuariosRelations
> {

  public readonly parques: HasManyRepositoryFactory<Parques, typeof Usuarios.prototype.id>;

  public readonly rols: HasManyRepositoryFactory<Rol, typeof Usuarios.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ParquesRepository') protected parquesRepositoryGetter: Getter<ParquesRepository>, @repository.getter('RolRepository') protected rolRepositoryGetter: Getter<RolRepository>,
  ) {
    super(Usuarios, dataSource);
    this.rols = this.createHasManyRepositoryFactoryFor('rols', rolRepositoryGetter,);
    this.registerInclusionResolver('rols', this.rols.inclusionResolver);
    this.parques = this.createHasManyRepositoryFactoryFor('parques', parquesRepositoryGetter,);
    this.registerInclusionResolver('parques', this.parques.inclusionResolver);
  }
}
