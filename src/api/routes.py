# This module takes care of starting the API Server, Loading the DB and Adding the endpoints

from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Publicacion
from api.utils import generate_sitemap, APIException
import hashlib
import json

#importe decorador jwt_required
from flask_jwt_extended import jwt_required
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity

api = Blueprint('api', __name__)

@api.route('/users', methods=['GET'])        
def get_users():
        return jsonify([users.userlist() for users in User.query.all()]),200  

@api.route('/user/<string:user_name>', methods=['GET'])
@jwt_required()
def get_user(user_name):
        profile = User.query.filter_by(username=user_name).one_or_none()
        if profile == None:
            return 'Usuario no existe', 404
        return jsonify(profile.get_profile()), 200

@api.route('/user', methods=['POST'])
def post_user():
    
        body = request.json

        if 'email' not in body:
            return 'El usuario no tiene email', 400
        if 'password' not in body:
            return 'El usuario no tiene password', 400
        if 'username' not in body:
            return 'El usuario no tiene username', 400
        if 'profile_name' not in body:
            return 'El usuario no tiene profile_name', 400

        profile = User.query.filter_by(email=body['email']).one_or_none()

        if profile == None:

            new_user = User(body['email'], hashlib.md5( body['password'].encode() ).hexdigest(), body['username'], body['profile_name'])
 
            try:
                db.session.add(new_user)
                db.session.commit()
                return "Se ha creado el usuario satisfactoriamente"
            except Exception as err:
                return 'Ha ocurrido un error!', 500
        else:
            return "Ya hay registrado un usuario con ese email!", 400

        return "Method not implemented yet!",500

@api.route('/user/<int:id_user>', methods=['DELETE'])
def delete_user(id_user):
    user = User.query.filter_by(id=id_user).one_or_none()
    if user == None:
        return 'No existe el Usuario', 404
    else:
        try:
            db.session.delete(user)
            db.session.commit()
            return "Se ha borrado el Usuario sastifastoriamente", 200
        except Exception as err:
            return 'Ha ocurrido un error', 500

@api.route('/user/<string:user_name>', methods=['PUT'])
def update_user(user_name):
    body = request.json
    if "email" not in body:
        return "Este usuario no tiene correo", 400
    if "profile_name" not in body:
        return "Este usuario no tiene profile name", 400
    else:
        user = User.query.filter_by(username=user_name).one_or_none()
        if user == None:
            return "No existe el Usuario", 400            
        try:
            user.email = body['email']
            user.profile_name = body['profile_name']
            db.session.commit() 
            return jsonify(user.get_profile()), 201
        except Exception as err:
            return jsonify({ "error": "Ha ocurrido un error de servidor"}), 500

@api.route('/userpass', methods=['PUT'])
def update_userpass():
    username = request.json.get("username", None)
    password = request.json.get("password", None)
    new_password = request.json.get("new_password", None)
    
    if username == None or password == None or new_password == None:
        return jsonify({"msg": "Bad username or password"}), 401
    else:
               
        user = User.query.filter_by(username=username, password=hashlib.md5( password.encode() ).hexdigest()).one_or_none()
        #user = User.query.filter_by(username=user_name).one_or_none()

        if user == None:
            return "Credenciales Incorrectas", 400     
                          
        try:
            user.password = hashlib.md5( new_password.encode() ).hexdigest()
            db.session.commit() 
            return "Password cambiado con exito", 200 
        except Exception as err:
            return jsonify({ "error": "Ha ocurrido un error de servidor"}), 500 
            

            

@api.route('/anuncio/<int:id_publicacion>', methods=['PUT'])
def update_anuncio(id_publicacion):
    body = request.json
    if "content" not in body:
        return "Este anuncio no tiene contenido", 400
    if "image" not in body:
        return "Este anuncio no tiene imagen", 400
    else:
        publicacion = Publicacion.query.filter_by(id=id_publicacion).one_or_none()
        if publicacion == None:
            return "No existe la publicacion", 400            
        try:
            publicacion.content = body['content']
            publicacion.content = body['image']
            db.session.commit() 
            return jsonify(publicacion.get_content()), 201
        except Exception as err:
            return jsonify({ "error": "Ha ocurrido un error de servidor"}), 500

@api.route('/anuncio/<int:id_publicacion>', methods=['DELETE'])
@jwt_required()
def delete_anuncio(id_publicacion):
    publicacion = Publicacion.query.filter_by(id=id_publicacion).one_or_none()
    if publicacion == None:
        return 'No existe el anuncio', 404
    else:
        try:
            db.session.delete(publicacion)
            db.session.commit()
            return "Se ha borrado el Anuncio sastifastoriamente", 200
        except Exception as err:
            return 'Ha ocurrido un error', 500

@api.route('/anuncios', methods=['GET'])        
#@jwt_required()
def anuncios():
            return jsonify([anuncios.get_content() for anuncios in Publicacion.query.all()]),200

@api.route('/anuncio', methods=['GET'])
def get_anuncio():
        all_anuncio = Publicacion.query.all()
        return jsonify(
                list(reversed(([ anuncio.serialize() for anuncio in all_anuncio])))
            ), 200

@api.route('/anuncio', methods=['POST'])
#@jwt_required()
def post_anuncio():
        body = request.json
        
        if "content" not in body:
            return "Ese anuncio no tiene información", 400
        if "image" not in body:
            return "Favor agregar una imagen", 400
        if "marca" not in body:
            return "Favor agregar la marca del vehiculo", 400
        else:
            #current_userid = get_jwt_identity()
            new_anuncio = Publicacion(body["content"], 1, body["image"], body["marca"])
            db.session.add(new_anuncio) 
            try:
                db.session.commit() 
                return jsonify(new_anuncio.serialize()), 201
            except Exception as err:
                return jsonify({ "error": "Ha ocurrido un error de servidor"}), 500
                
@api.route("/login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    if email == None or password == None:
        return jsonify({"msg": "Bad email or password"}), 401
    else:
        profile = User.query.filter_by(email=email, password=hashlib.md5( password.encode() ).hexdigest()).one_or_none()
        if profile == None:
            return 'Credenciales Incorrectas', 404
        else:
            access_token = create_access_token(identity=email)
            return jsonify({"token": access_token, "user":profile.username })

@api.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200  
