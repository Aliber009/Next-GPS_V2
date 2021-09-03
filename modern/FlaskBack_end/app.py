

from flask import Flask, request, jsonify
import json
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS, cross_origin
from datetime import datetime

#from flask_classful import FlaskView, route


app = Flask(__name__)


CORS(app)
# db should exist beforehand
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql+psycopg2://postgres:yassine1998@localhost:5432/missionsDB'
UPLOAD_FOLDER = './uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


db = SQLAlchemy(app)
migrate = Migrate(app, db)


import conductor

import LastDetach

import historyConductor

import testImages

import histocenter

import entites

import histoEntite


class missions(db.Model):

    id = db.Column('mission_id', db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    Description = db.Column(db.String(500))
    Accomplie = db.Column(db.Boolean)


def __init__(self, name, Description, Accomplie):
    self.name = name
    self.Description = Description
    self.Accomplie = Accomplie


def __repr__(self):
    return f"<mission {self.name}>"
    # end  of class missions


# class conductor

# Class of refs


class refs(db.Model):
    id = db.Column('ref_id', db.Integer, primary_key=True)
    ref = db.Column(db.String(100))
    DeviceID = db.Column(db.Integer)


def __init__(self, ref, DeviceID):
    self.ref = ref
    self.DeviceID = DeviceID


def __repr__(self):
    return f"<ref {self.ref}>"


@app.route('/flsk/refs', methods=['POST', 'GET'])
def handle_refs():
    if request.method == 'POST':
        if request.is_json:
            data = request.get_json()
            new_ref = refs(
                ref=data['ref'], DeviceID=data['DeviceID'])
            db.session.add(new_ref)
            db.session.commit()
            return {"message": f"cost {new_ref.ref} has been created successfully."}
        else:
            return {"error": "The request payload is not in JSON format"}

    elif request.method == 'GET':
        allrefs = refs.query.all()
        results = [
            {
                "id": ref.id,
                "DeviceID": ref.DeviceID

            } for ref in allrefs]
        return jsonify(results)


@app.route('/flsk/refs/<refs_id>', methods=['PUT', 'DELETE'])
def handle_refs_user(refs_id):
    ref_user = refs.query.get_or_404(refs_id)
    if request.method == 'PUT':
        data = request.get_json()
        ref_user.ref = data['ref']
        ref_user.DeviceID = data['DeviceID']
        #mission_user.missionID = data['missionID']

        db.session.add(ref_user)
        db.session.commit()
        return {"message": f"cost_user {ref_user.ref} successfully updated"}

    elif request.method == 'DELETE':
        db.session.delete(ref_user)
        db.session.commit()
        return {"message": f"cost_user {ref_user} successfully deleted."}
# end of class refs

# class costs


class costs(db.Model):
    id = db.Column('costs_id', db.Integer, primary_key=True)
    type = db.Column(db.String(100))
    Somme = db.Column(db.Integer)
    DeviceID = db.Column(db.Integer)
    Date = db.Column(db.DateTime)


def __init__(self, type, Somme, Date, DeviceID):
    self.type = type
    self.Somme = Somme
    self.Date = Date
    self.DeviceID = DeviceID


def __repr__(self):
    return f"<costs {self.type}>"


@app.route('/flsk/costs', methods=['POST', 'GET'])
def handle_Costs():
    if request.method == 'POST':
        if request.is_json:
            data = request.get_json()
            new_Cost = costs(
                type=data['type'], Somme=data['Somme'], Date=datetime.now(), DeviceID=data['DeviceID'])
            db.session.add(new_Cost)
            db.session.commit()
            return {"message": f"cost {new_Cost.type} has been created successfully."}
        else:
            return {"error": "The request payload is not in JSON format"}

    elif request.method == 'GET':
        Costs = costs.query.all()
        results = [
            {
                "id": Cost.id,
                "type": Cost.type,
                "Somme": Cost.Somme,
                "Date": Cost.Date,
                "DeviceID": Cost.DeviceID

            } for Cost in Costs]
        return jsonify(results)


@app.route('/flsk/costs/<costs_id>', methods=['PUT', 'DELETE'])
def handle_costs_user(costs_id):
    cost_user = costs.query.get_or_404(costs_id)
    if request.method == 'PUT':
        data = request.get_json()
        cost_user.type = data['type']
        cost_user.Somme = data['Somme']
        cost_user.Date = datetime.now()
        # cost_user.DeviceID=data['DeviceID']
        # mission_user.missionID = data['missionID']
        db.session.add(cost_user)
        db.session.commit()
        return {"message": f"cost_user {cost_user.type} successfully updated"}
    elif request.method == 'DELETE':
        db.session.delete(cost_user)
        db.session.commit()
        return {"message": f"cost_user {cost_user} successfully deleted."}
   # End of class costs

# start table missions


class mission_users(db.Model):

    id = db.Column('mission_users_id', db.Integer, primary_key=True)
    nameUser = db.Column(db.String(100))
    notified = db.Column(db.Boolean)
    missionID = db.Column(db.Integer)
    startDate = db.Column(db.DateTime)
    endDate = db.Column(db.DateTime)


def __init__(self, nameUser, notified,  missionID, startDate, endDate):
    self.nameUser = nameUser
    self.notified = notified
    self.missionID = missionID
    self.endDate = endDate
    self.startDate = startDate


def __repr__(self):
    return f"<mission_users {self.nameUser}>"


db.create_all()  # if you add a new table  call this after your model class


@app.route('/flsk/mission_users', methods=['POST', 'GET'])
def handle_mission_users():

    if request.method == 'POST':
        if request.is_json:
            data = request.get_json()
            new_mission_users = mission_users(
                nameUser=data['nameUser'], notified=False,  missionID=data['missionID'], startDate=datetime.now())
            db.session.add(new_mission_users)
            db.session.commit()
            return {"message": f"mission {new_mission_users.nameUser} has been created successfully."}
        else:
            return {"error": "The request payload is not in JSON format"}

    elif request.method == 'GET':
        users = mission_users.query.all()
        results = [
            {
                "id": user.id,
                "nameUser": user.nameUser,
                "notified": user.notified,
                "missionID": user.missionID,
                "startDate": user.startDate,
                "endDate": user.endDate

            } for user in users]

        return jsonify(results)


@app.route('/flsk/mission_users/<mission_users_id>', methods=['PUT', 'DELETE'])
def handle_mission_user(mission_users_id):
    mission_user = mission_users.query.get_or_404(mission_users_id)
    if request.method == 'PUT':
        data = request.get_json()
        mission_user.nameUser = data['nameUser']
        mission_user.notified = data['notified']
        mission_user.endDate = data['endDate']
    #mission_user.missionID = data['missionID']

        db.session.add(mission_user)
        db.session.commit()
        return {"message": f"missionsUser {mission_user.nameUser} successfully updated"}

    elif request.method == 'DELETE':
        db.session.delete(mission_user)
        db.session.commit()
        return {"message": f"missionUser {mission_user} successfully deleted."}


@app.route('/flsk/missions', methods=['POST', 'GET'])
def handle_missions():

    if request.method == 'POST':
        if request.is_json:
            data = request.get_json()
            new_mission = missions(
                name=data['name'], Description=data['Description'], Accomplie=False)
            db.session.add(new_mission)
            db.session.commit()
            return {"mission_id": f"{new_mission.id}"}
        else:
            return {"error": "The request payload is not in JSON format"}

    elif request.method == 'GET':
        themissions = missions.query.all()
        results = [
            {
                "id": mission.id,
                "name": mission.name,
                "Description": mission.Description,
                "Accomplie": mission.Accomplie

            } for mission in themissions]

        return jsonify(results)


@app.route('/flsk/missions/<mission_id>', methods=['GET', 'PUT', 'DELETE'])
def handle_mission(mission_id):
    mission = missions.query.get_or_404(mission_id)

    if request.method == 'GET':
        response = {
            "name": mission.name,
            "Description": mission.Description,
            "Accomplie": mission.Accomplie

        }
        return response

    elif request.method == 'PUT':
        data = request.get_json()
        mission.name = data['name']
        mission.Description = data['Description']
        mission.Accomplie = data['Accomplie']

        db.session.add(mission)
        db.session.commit()
        return {"message": f"car {mission.name} successfully updated"}

    elif request.method == 'DELETE':
        db.session.delete(mission)
        db.session.commit()
        return {"message": f"Car {mission.name} successfully deleted."}


if __name__ == '__main__':
    app.run(debug=True)
