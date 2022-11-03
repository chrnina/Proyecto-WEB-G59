import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Zonas, ZonasRelations} from '../models';

export class ZonasRepository extends DefaultCrudRepository<
  Zonas,
  typeof Zonas.prototype.id,
  ZonasRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(Zonas, dataSource);
  }
}
