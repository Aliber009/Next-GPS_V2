from app import db,app
from flask import Flask, request, jsonify
import json
from sqlalchemy.dialects import postgresql
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.ext.mutable import MutableDict

class entites(db.Model):
    id = db.Column('entite_id', db.Integer, primary_key=True)
    arr = db.Column(postgresql.ARRAY(db.JSON))
    
def __init__(self ,arr):
    self.arr=arr   
def __repr__(self):
    return f"<entite {self.arr}>"   
@app.route('/flsk/entites', methods=['POST', 'GET']) 
def handle_entites():
    if request.method == 'POST':
        if request.is_json:
            data = request.get_json()
            new_entite = entites(
                arr=data['arr']
                )
            db.session.add(new_entite)
            db.session.commit()
            return {"message": f"entite has been created successfully."}
        else:
            return {"error": "The request payload is not in JSON format"}  

    elif request.method == 'GET':
         Entites = entites.query.all()
         results = [
            {
                "id": entite.id,
                "arr":entite.arr
            }for entite in Entites]
         return jsonify(results)
@app.route('/flsk/entites/<entite_id>', methods=['PUT'])
def handle_entite_user(entite_id):
    if(entites.query.all() == []) :
        data = request.get_json()
        new_entite = entites(arr=data['arr'])
        db.session.add(new_entite)
        db.session.commit()
        return {"message": f"entite has been created successfully."}
    entite_user = entites.query.get_or_404(entite_id)
    if request.method == 'PUT':
        data = request.get_json()
        entite_user.arr = data['arr']
        db.session.add(entite_user)
        db.session.commit()
        return {"message": f"Entite successfully updated"}