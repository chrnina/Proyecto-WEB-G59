import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Parques, ParquesRelations, Zonas, Comida, Planes, Atracciones} from '../models';
import {ZonasRepository} from './zonas.repository';
import {ComidaRepository} from './comida.repository';
import {PlanesRepository} from './planes.repository';
import {AtraccionesRepository} from './atracciones.repository';

export class ParquesRepository extends DefaultCrudRepository<
  Parques,
  typeof Parques.prototype.id,
  ParquesRelations
> {

  public readonly zonas: HasManyRepositoryFactory<Zonas, typeof Parques.prototype.id>;

  public readonly comidas: HasManyRepositoryFactory<Comida, typeof Parques.prototype.id>;

  public readonly planes: HasManyRepositoryFactory<Planes, typeof Parques.prototype.id>;

  public readonly atracciones: HasManyRepositoryFactory<Atracciones, typeof Parques.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ZonasRepository') protected zonasRepositoryGetter: Getter<ZonasRepository>, @repository.getter('ComidaRepository') protected comidaRepositoryGetter: Getter<ComidaRepository>, @repository.getter('PlanesRepository') protected planesRepositoryGetter: Getter<PlanesRepository>, @repository.getter('AtraccionesRepository') protected atraccionesRepositoryGetter: Getter<AtraccionesRepository>,
  ) {
    super(Parques, dataSource);
    this.atracciones = this.createHasManyRepositoryFactoryFor('atracciones', atraccionesRepositoryGetter,);
    this.registerInclusionResolver('atracciones', this.atracciones.inclusionResolver);
    this.planes = this.createHasManyRepositoryFactoryFor('planes', planesRepositoryGetter,);
    this.registerInclusionResolver('planes', this.planes.inclusionResolver);
    this.comidas = this.createHasManyRepositoryFactoryFor('comidas', comidaRepositoryGetter,);
    this.registerInclusionResolver('comidas', this.comidas.inclusionResolver);
    this.zonas = this.createHasManyRepositoryFactoryFor('zonas', zonasRepositoryGetter,);
    this.registerInclusionResolver('zonas', this.zonas.inclusionResolver);
  }
}
