import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import { repository } from '@loopback/repository';
import { Keys } from '../config/Keys';
import { Credenciales, Rol, Usuarios, Visitantes } from '../models';
import { RolRepository, UsuariosRepository, VisitantesRepository } from '../repositories';
const generador=require("generate-password");
const cryptojs=require("crypto-js");
const JWT=require("jsonwebtoken");

@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(
    @repository (VisitantesRepository)
    public repositorioVisitantes: VisitantesRepository,
    @repository (UsuariosRepository)
    public repositorioUsuario: UsuariosRepository,
    @repository (RolRepository)
    public repositorioRol: RolRepository
    ) {}
  
  /*
   * Add service methods here
   */
  GenerarPassword(){
    let password= generador.generate({
      length: 7,
      numbers: true
    });
    return password;
  }
  EncriptarPassword(password:string){
    let passwordE=cryptojs.MD5(password)
    return passwordE;
  }

  IdentificarPersona(credenciales:Credenciales){
    try {
      let v= this.repositorioVisitantes.findOne({
        where:{email:credenciales.usuario, clave:credenciales.password}
      });
      if (v){
        return v;
      }
      return false;
    } catch  {
      return false;
    }
  }
  IdentificarUsuario(credenciales:Credenciales){
    try {
      let u= this.repositorioUsuario.findOne({
        where:{email:credenciales.usuario, clave:credenciales.password}
      });
      if (u){
        return u;
      }
      return false;
    } catch  {
      return false;
    }
  }

  GeneracionToken(visitantes:Visitantes){
    let token = JWT.sign({
      data:{
        id: visitantes.id,
        email: visitantes.email,
        nombre: visitantes.nombre + " " + visitantes.apellido
      }

    },Keys.claveJWT
    )
    return token;
  }
  ValidarToken(token:string){
    try {
      let datos=JWT.verify(token,Keys.claveJWT);
      return datos;
    } catch  {
      return false;
    } 
  }
  /**
   * Generacion Token para usuario
   */
   GeneracionTokenUsuario(usuarios:Usuarios){
    let r= this.repositorioRol.findOne({
      where:{
        usuariosId: usuarios.id
      }
    })
    let token = JWT.sign({
      data:{
        id: usuarios.id,
        email: usuarios.email,
        nombre: usuarios.nombre + " " + usuarios.apellido,
        roles: usuarios.rols
      }

    },Keys.claveJWT
    )
    return token;
   }

}
