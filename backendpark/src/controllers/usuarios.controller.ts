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
import { Keys } from '../config/Keys';
import {Credenciales, Rol, Usuarios} from '../models';
import {RolRepository, UsuariosRepository} from '../repositories';
import { AutenticacionService } from '../services';
const fetchs= require("node-fetch");

export class UsuariosController {
  constructor(
    @repository(UsuariosRepository)
    public usuariosRepository : UsuariosRepository,
    @service (AutenticacionService)
    public servicioAutenticacion: AutenticacionService,
  ) {}

  @post('/registro')
  @response(200, {
    description: 'Usuarios model instance',
    content: {'application/json': {schema: getModelSchemaRef(Usuarios)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuarios, {
            title: 'NewUsuarios',
            exclude: ['id'],
          }),
        },
      },
    })
    usuarios: Omit<Usuarios, 'id'>,
  ): Promise<Usuarios> {
    let clave= this.servicioAutenticacion.GenerarPassword();
    let claveCifrada= this.servicioAutenticacion.EncriptarPassword(clave);
    usuarios.clave= claveCifrada;
    let u= await this.usuariosRepository.create(usuarios);
    if(usuarios.nombre=="usuarios"){
    }
    
  //Notificacion del usuario

    let destino = u.email;
    let asunto = "Registro en adventure park";
    let mensaje = `Hola, ${u.nombre}, su usuario de accesso a adventure park es: ${u.email} y su contraseña es: ${clave}`

    fetchs(`${Keys.urlNotificaciones}/e-mail?correo_destino=${destino}&asunto=${asunto}&contenido=${mensaje}`).then((data:any)=>{
      console.log(data);
    })
    return u;
  }

  @get('/usuarios/count')
  @response(200, {
    description: 'Usuarios model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Usuarios) where?: Where<Usuarios>,
  ): Promise<Count> {
    return this.usuariosRepository.count(where);
  }

  @get('/usuarios')
  @response(200, {
    description: 'Array of Usuarios model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Usuarios, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Usuarios) filter?: Filter<Usuarios>,
  ): Promise<Usuarios[]> {
    return this.usuariosRepository.find(filter);
  }

  @patch('/usuarios')
  @response(200, {
    description: 'Usuarios PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuarios, {partial: true}),
        },
      },
    })
    usuarios: Usuarios,
    @param.where(Usuarios) where?: Where<Usuarios>,
  ): Promise<Count> {
    return this.usuariosRepository.updateAll(usuarios, where);
  }

  @get('/usuarios/{id}')
  @response(200, {
    description: 'Usuarios model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Usuarios, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Usuarios, {exclude: 'where'}) filter?: FilterExcludingWhere<Usuarios>
  ): Promise<Usuarios> {
    return this.usuariosRepository.findById(id, filter);
  }

  @patch('/usuarios/{id}')
  @response(204, {
    description: 'Usuarios PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuarios, {partial: true}),
        },
      },
    })
    usuarios: Usuarios,
  ): Promise<void> {
    await this.usuariosRepository.updateById(id, usuarios);
  }

  @put('/usuarios/{id}')
  @response(204, {
    description: 'Usuarios PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() usuarios: Usuarios,
  ): Promise<void> {
    await this.usuariosRepository.replaceById(id, usuarios);
  }

  @del('/usuarios/{id}')
  @response(204, {
    description: 'Usuarios DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.usuariosRepository.deleteById(id);
  }
  /**
   * Metodos Propios
   */
  

   @get('/usuarios/{nombre}')
   @response(200, {
     description: 'Usuarios model instance',
     content: {
       'application/json': {
         schema: getModelSchemaRef(Usuarios, {includeRelations: true}),
       },
     },
   })
   async findByNombre(
     @param.path.string('nombre') nombre: string,
     
   ): Promise<Usuarios|null> {
     var usuario: any= await this.usuariosRepository.findOne({
      where:{
          nombre:usuario.nombre
      }
     });
     return usuario;
   }
   
   @post('/user/login')
   @response(200,{
     description: "Login con Token de los usuarios"
   })
   async login(
     @requestBody () credenciales: Credenciales
   ){
     let user= await this.servicioAutenticacion.IdentificarUsuario(credenciales)
     if (user){
       let token= this.servicioAutenticacion.GeneracionTokenUsuario(user);
       return{
         info:{
           nombre: user.nombre,
           apellido: user.apellido,
           rol:{
            id: user.rols}
         },
         tk: token
       }
     }else{
      throw new HttpErrors[401]("Datos Invalidos")
     }
   }
}
function fetch(arg0: string) {
  throw new Error('Function not implemented.');
}

