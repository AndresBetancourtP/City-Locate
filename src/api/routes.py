# This module takes care of starting the API Server, Loading the DB and Adding the endpoints

from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Anuncio
from api.utils import generate_sitemap, APIException


api = Blueprint('api', __name__)


@api.route('/user', methods=['GET','POST'])
def handle_user():
    if request.method == 'GET':
        response_body = {
            "msg": "Hola, este es tu GET /user response"
        }
        return jsonify(response_body), 200
    else:
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

            new_user = User(body['email'], body['password'], body['username'], body['profile_name'])
            try:
                db.session.add(new_user)
                db.session.commit()
                return ""
            except Exception as err:
                return 'Ha ocurrido un error!', 500
        else:
            return "Ya hay registrado un usuario con ese email!", 400

        return "Method not implemented yet!",500

    @api.route('/profile/<string:user_name>', methods=['GET'])
    def get_profile(user_name):
        profile = User.query.filter_by(username=user_name).one_or_none()
        if profile == None:
            return 'Ese usuario no esta registrado', 404
        else:
            return jsonify(profile.get_profile()), 200


    @api.route('/anuncio', methods=['GET'])
    def get_anuncio():
        all_anuncio = Anuncio.query.all()
        return jsonify(
                [ anunciar.serialize() for anuncio in all_anuncios ]
            ), 200


    @api.route('/anuncios', methods=['POST'])
    def post_anuncio():
        body = request.json
        if "content" not in body:
            return "Ese anuncio no tiene información", 400
        if "email" not in body:
            return "Debes incluir un email. ✝", 400
        else:
            author = User.query.filter_by(email=body["email"]).one_or_none()
            if author == None:
                return "Ese usuario no existe en City Locate.", 404
            else:
                new_anuncio = anunciar(body["content"], author)
                db.session.add(new_anuncio) 
                try:
                    db.session.commit() 
                    return "Anuncio publicador con exito!", 201
                except Exception as err:
                    return "Ha ocurrido un error de servidor", 500
                    return "Algo ha salido mal, vuelve a intentarlo", 404