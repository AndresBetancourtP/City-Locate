# This module takes care of starting the API Server, Loading the DB and Adding the endpoints

from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Publicacion, Anuncio
from api.utils import generate_sitemap, APIException
import hashlib
import json

#importe decorador jwt_required
from flask_jwt_extended import jwt_required
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity

api = Blueprint('api', __name__)


@api.route('/user/<string:user_name>', methods=['GET'])
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

@api.route('/users', methods=['GET'])        

@api.route('/anuncio', methods=['GET'])
def get_anuncio():
        all_anuncio = Anuncio.query.all()
        return jsonify(
                list(reversed(([ anuncio.serialize() for anuncio in all_anuncio])))
            ), 200

@api.route('/anuncio', methods=['POST'])
#@jwt_required()
def post_anuncio():
        body = request.json
        
        if "content" not in body:
            return "Ese anuncio no tiene información", 400
        else:
            #author = User.query.filter_by(username=get_jwt_identity()).one_or_none()
            author = User.query.filter_by(username=body['username']).one_or_none()
            if author == None:
                return "Ese usuario no existe en City Locate.", 404
            else:
                new_anuncio = Publicacion(body["content"], author, body["image"])
                db.session.add(new_anuncio) 
                try:
                    db.session.commit() 
                    return jsonify(new_anuncio.serialize()), 201
                except Exception as err:
                    return jsonify({ "error": "Ha ocurrido un error de servidor"}), 500
                    return "Algo ha salido mal, vuelve a intentarlo", 404   

@api.route("/login", methods=["POST"])
def login():
    username = request.json.get("username", None)
    password = request.json.get("password", None)
    if username == None or password == None:
        return jsonify({"msg": "Bad username or password"}), 401
    else:
        profile = User.query.filter_by(username=username, password=hashlib.md5( password.encode() ).hexdigest()).one_or_none()
        if profile == None:
            return 'El usuario no esta registrado', 404
        else:
            access_token = create_access_token(identity=username)
            return jsonify({"token": access_token })

@api.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200
