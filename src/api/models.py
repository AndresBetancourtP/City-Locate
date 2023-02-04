from flask_sqlalchemy import SQLAlchemy
import arrow
import datetime

db = SQLAlchemy()



class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    username = db.Column(db.String(15), unique=True, nullable=False)
    profile_name = db.Column(db.String(50), unique=False, nullable=False)

    def __init__(self, email, password, username, profile_name):
        self.email = email
        self.password = password
        self.username = username
        self.profile_name = profile_name

        self.is_active = True


    def __repr__(self): 
        return '<User %r>' % self.email

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "username": self.username,
            "profile": self.profile_name,
            # do not serialize the password, its a security breach
        }

    def get_profile(self):
        return {
            "id": self.id,
            "email": self.email,
            "username": self.username,
            "profile": self.profile_name,
            # do not serialize the password, its a security breach
            "anuncios": [ anunciar.get_content() for anunciar in self.anuncios ]
        }

class Anuncio(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    username = db.Column(db.String(15), unique=True, nullable=False)
    profile_name = db.Column(db.String(50), unique=False, nullable=False)

    def __init__(self, email, password, username, profile_name):
        self.email = email
        self.password = password
        self.username = username
        self.profile_name = profile_name

        self.is_active = True


    def __repr__(self): 
        return '<User %r>' % self.email

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "username": self.username,
            "profile": self.profile_name,
            # do not serialize the password, its a security breach
        }

    def get_profile(self):
        return {
            "id": self.id,
            "email": self.email,
            "username": '@'+self.username,
            "profile": self.profile_name,
            # do not serialize the password, its a security breach
            "anuncios": [ anunciar.get_content() for anunciar in self.anuncios ]
        }        


class Anuncio1(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(120), unique=True, nullable=False)
    img = db.Column(db.String(80), unique=False, nullable=False)
    username = db.Column(db.String(15), unique=True, nullable=False)
    
    def __init__(self, content, username, image):
        self.content = content
        self.username = username
        self.image = image

    def serialize(self):
        return {
            "id": self.id,
            "content": self.content,
            "username": self.username,
            "image": self.image,
            # do not serialize the password, its a security breach
        }    

    def get_anuncio(self):
        return {
            "id": self.id,
            "content": self.content,
            "username": '@'+self.username,
            "image": self.image,
            
            # do not serialize the password, its a security breach
           
        }
       
    

class Publicacion(db.Model): #Query

    id = db.Column(db.Integer, primary_key=True)

    content = db.Column(db.String(280), nullable=False)
    date = db.Column(db.DateTime, nullable=False)

    author_id = db.Column( db.Integer, db.ForeignKey('user.id'))
    image = db.Column(db.String(1526), nullable=True)

    author = db.relationship("User", backref="anuncios")

    def __init__(self, content, author, image):
        self.content = content
        self.date = datetime.datetime.today()
        self.author = author
        self.image = image

    def __repr__(self):
        return '<Anuncio => %r>' % self.id

    def serialize(self):
        return {
            "content": self.content,
            "date": arrow.get(self.date).humanize(),
            "author": self.author.serialize() if self.author != None else 'No author',
            "image": self.image
        }

    def get_content(self):
        return {
            "content": self.content,
            "date": arrow.get(self.date).humanize(),}