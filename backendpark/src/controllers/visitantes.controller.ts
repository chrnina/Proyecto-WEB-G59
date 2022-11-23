import { service } from '@loopback/core';
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
  HttpErrors,
} from '@loopback/rest';
import { request } from 'http';
import { Keys } from '../config/Keys';
import {Credenciales , Usuarios, Visitantes} from '../models';
import {VisitantesRepository} from '../repositories';
import { AutenticacionService } from '../services';
import { UsuariosController } from './usuarios.controller';
const fetch= require("node-fetch");

export class VisitantesController {
  constructor(
    @repository(VisitantesRepository)
    public visitantesRepository : VisitantesRepository,
    @service(AutenticacionService)
    public servicioAutenticacion : AutenticacionService,
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
  ): Promise< Visitantes> {
    let clave= this.servicioAutenticacion.GenerarPassword();
    let claveCifrada= this.servicioAutenticacion.EncriptarPassword(clave);
    visitantes.clave= claveCifrada;
    let v= await this.visitantesRepository.create(visitantes);
    if(visitantes.nombre=="visitantes"){
      let p= await this.visitantesRepository.create(visitantes);
    }
    
    //Notificacion del usuario

    let destino = v.email;
    let asunto = "Regidtro en adventure park";
    let mensaje = `Hola, ${v.nombre}, su usuario de accesso a adventure park es: ${v.email} y su contraseña es: ${clave}`

    fetch(`${Keys.urlNotificaciones}/e-mail?correo_destino=${destino}&asunto=${asunto}&contenido=${mensaje}`).then((data:any)=>{
      console.log(data);
    })
    return v;
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
    @requestBody() credenciales:Credenciales
  ):Promise<Visitantes | null>{
    credenciales.password=this.servicioAutenticacion.EncriptarPassword(credenciales.password);
    let personaEncontrada = await this.visitantesRepository.findOne({
      where:{
        email:credenciales.usuario,
        clave: credenciales.password
      }
    });
    return personaEncontrada;
  }
  @post('/LoginT')
  @response(200,{
    description:"Identificacion de Usuarios con Asignacion de Token"
  })
  async identificarToken(
    @requestBody () credenciales: Credenciales
  ){
    credenciales.password=this.servicioAutenticacion.EncriptarPassword(credenciales.password);
    let v = await this.servicioAutenticacion.IdentificarPersona(credenciales);
    if(v){
      let token = this.servicioAutenticacion.GeneracionToken(v);
      return {
        informacion:{
          nombre: v.nombre,
          id: v.id
        },
        tk: token
      }
    } else{
      throw new HttpErrors[401]("Datos Invalidos!");
    }
  }
}
  