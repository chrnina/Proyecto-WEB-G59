import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Usuarios,
  Parques,
} from '../models';
import {UsuariosRepository} from '../repositories';

export class UsuariosParquesController {
  constructor(
    @repository(UsuariosRepository) protected usuariosRepository: UsuariosRepository,
  ) { }

  @get('/usuarios/{id}/parques', {
    responses: {
      '200': {
        description: 'Array of Usuarios has many Parques',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Parques)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Parques>,
  ): Promise<Parques[]> {
    return this.usuariosRepository.parques(id).find(filter);
  }

  @post('/usuarios/{id}/parques', {
    responses: {
      '200': {
        description: 'Usuarios model instance',
        content: {'application/json': {schema: getModelSchemaRef(Parques)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Usuarios.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Parques, {
            title: 'NewParquesInUsuarios',
            exclude: ['id'],
            optional: ['usuariosId']
          }),
        },
      },
    }) parques: Omit<Parques, 'id'>,
  ): Promise<Parques> {
    return this.usuariosRepository.parques(id).create(parques);
  }

  @patch('/usuarios/{id}/parques', {
    responses: {
      '200': {
        description: 'Usuarios.Parques PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Parques, {partial: true}),
        },
      },
    })
    parques: Partial<Parques>,
    @param.query.object('where', getWhereSchemaFor(Parques)) where?: Where<Parques>,
  ): Promise<Count> {
    return this.usuariosRepository.parques(id).patch(parques, where);
  }

  @del('/usuarios/{id}/parques', {
    responses: {
      '200': {
        description: 'Usuarios.Parques DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Parques)) where?: Where<Parques>,
  ): Promise<Count> {
    return this.usuariosRepository.parques(id).delete(where);
  }
}
