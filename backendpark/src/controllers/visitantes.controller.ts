import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Credenciales , Visitantes} from '../models';
import {VisitantesRepository} from '../repositories';

export class VisitantesController {
  constructor(
    @repository(VisitantesRepository)
    public visitantesRepository : VisitantesRepository,
  ) {}

  @post('/Registro')
  @response(200, {
    description: 'Visitantes model instance',
    content: {'application/json': {schema: getModelSchemaRef(Visitantes)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Visitantes, {
            title: 'NewVisitantes',
            exclude: ['id'],
          }),
        },
      },
    })
    visitantes: Omit<Visitantes, 'id'>,
  ): Promise<Visitantes> {
    return this.visitantesRepository.create(visitantes);
  }

  @get('/visitantes/count')
  @response(200, {
    description: 'Visitantes model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Visitantes) where?: Where<Visitantes>,
  ): Promise<Count> {
    return this.visitantesRepository.count(where);
  }

  @get('/visitantes')
  @response(200, {
    description: 'Array of Visitantes model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Visitantes, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Visitantes) filter?: Filter<Visitantes>,
  ): Promise<Visitantes[]> {
    return this.visitantesRepository.find(filter);
  }

  @patch('/visitantes')
  @response(200, {
    description: 'Visitantes PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Visitantes, {partial: true}),
        },
      },
    })
    visitantes: Visitantes,
    @param.where(Visitantes) where?: Where<Visitantes>,
  ): Promise<Count> {
    return this.visitantesRepository.updateAll(visitantes, where);
  }

  @get('/visitantes/{id}')
  @response(200, {
    description: 'Visitantes model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Visitantes, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Visitantes, {exclude: 'where'}) filter?: FilterExcludingWhere<Visitantes>
  ): Promise<Visitantes> {
    return this.visitantesRepository.findById(id, filter);
  }

  @patch('/visitantes/{id}')
  @response(204, {
    description: 'Visitantes PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Visitantes, {partial: true}),
        },
      },
    })
    visitantes: Visitantes,
  ): Promise<void> {
    await this.visitantesRepository.updateById(id, visitantes);
  }

  @put('/visitantes/{id}')
  @response(204, {
    description: 'Visitantes PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() visitantes: Visitantes,
  ): Promise<void> {
    await this.visitantesRepository.replaceById(id, visitantes);
  }

  @del('/visitantes/{id}')
  @response(204, {
    description: 'Visitantes DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.visitantesRepository.deleteById(id);
  }
  /**
   * Metodos propios
   */
  @post('/Login')
  @response(200,{
    description:'Identidicacion de personas'
  })
  async identificar(
    @requestBody() credenciales: Credenciales
  ):Promise< Visitantes  | null>{
    let personaEncontrada = await this.visitantesRepository.findOne({
      where:{
        email:credenciales.usuario,
        clave: credenciales.password
      }
    });
    return personaEncontrada;
  }
}
  