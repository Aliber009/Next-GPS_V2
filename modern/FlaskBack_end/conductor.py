from app import db,app
from flask import Flask, request, jsonify
import json


class drivers(db.Model):

    id = db.Column('driver_id', db.Integer, primary_key=True)
    driverId = db.Column(db.Integer)
    name = db.Column(db.String(100))
    lastname = db.Column(db.String(100))
    etat = db.Column(db.String(100))
    Adresse = db.Column(db.String(300))
    email = db.Column(db.String(100))
    ville = db.Column(db.String(100))
    phone = db.Column(db.String(500))
    pays = db.Column(db.String(100))
    contrat = db.Column(db.String(100))
    dateEntry = db.Column(db.DateTime)
    dateSotie = db.Column(db.DateTime)
    fonction = db.Column(db.String(100))
    permis = db.Column(db.String(100))
    DateNaissance = db.Column(db.String(100))
    CentreAffectation = db.Column(db.String(100))


def __init__(self, driverId, name, lastname, etat, Adresse, email, ville, phone, pays, contrat, dateEntry, dateSotie, fonction, permis, DateNaissance, CentreAffectation):
    self.name = name
    self.driverId = driverId
    self.lastname = lastname
    self.etat = etat
    self.Adresse = Adresse
    self.email = email
    self.ville = ville
    self.phone = phone
    self.pays = pays
    self.contrat = contrat
    self.dateEntry = dateEntry
    self.dateSotie = dateSotie
    self.fonction = fonction
    self.permis = permis
    self.DateNaissance = DateNaissance
    self.CentreAffectation = CentreAffectation


def __repr__(self):
    return f"<driver {self.name}>"


@app.route('/drivers', methods=['POST', 'GET'])
def handle_drivers():
    if request.method == 'POST':
        if request.is_json:
            data = request.get_json()
            new_driver = drivers(
                name=data['name'],
                driverId=data['driverId'],
                lastname=data['lastname'],
                etat=data['etat'],
                Adresse=data['Adresse'],
                email=data['email'],
                ville=data['ville'],
                phone=data['phone'],
                pays=data['pays'],
                contrat=data['contrat'],
                dateEntry=data['dateEntry'],
                dateSotie=data['dateSotie'],
                fonction=data['fonction'],
                permis=data['permis'],
                DateNaissance=data['DateNaissance'],
                CentreAffectation=data['CentreAffectation']
            )

            db.session.add(new_driver)
            db.session.commit()
            return {"message": f"driver {new_driver.name} has been created successfully."}
        else:
            return {"error": "The request payload is not in JSON format"}

    elif request.method == 'GET':
        Drivers = drivers.query.all()
        results = [
            {
                "id": driver.id,
                "name": driver.name,
                "driverId": driver.driverId,
                "lastname": driver.lastname,
                "etat": driver.etat,
                "Adresse": driver.Adresse,
                "email": driver.email,
                "ville": driver.ville,
                "phone": driver.phone,
                "pays": driver.pays,
                "contrat": driver.contrat,
                "dateEntry": driver.dateEntry,
                "dateSotie": driver.dateSotie,
                "fonction": driver.fonction,
                "permis": driver.permis,
                "DateNaissance": driver.DateNaissance,
                "CentreAffectation": driver.CentreAffectation

            } for driver in Drivers]
        return jsonify(results)


@app.route('/drivers/<driver_id>', methods=['PUT', 'DELETE','GET'])
def handle_drivers_user(driver_id):
    driver_user = drivers.query.get_or_404(driver_id)
    if request.method== 'GET':
        result={
            "id": driver_user.id,
            "name": driver_user.name,
            "driverId": driver_user.driverId,
            "lastname": driver_user.lastname,
            "etat": driver_user.etat,
                "Adresse": driver_user.Adresse,
                "email": driver_user.email,
                "ville": driver_user.ville,
                "phone": driver_user.phone,
                "pays": driver_user.pays,
                "contrat": driver_user.contrat,
                "dateEntry": driver_user.dateEntry,
                "dateSotie": driver_user.dateSotie,
                "fonction": driver_user.fonction,
                "permis": driver_user.permis,
                "DateNaissance": driver_user.DateNaissance,
                "CentreAffectation": driver_user.CentreAffectation
            }
        return jsonify(result)    

    if request.method == 'PUT':
        data = request.get_json()
        driver_user.name = data['name']
        driver_user.lastname = data['lastname']
        driver_user.etat = data['etat']
        driver_user.Adresse = data['Adresse']
        driver_user.email = data['email']
        driver_user.ville = data['ville']
        driver_user.phone = data['phone']
        driver_user.pays = data['pays']
        driver_user.contrat = data['contrat']
        driver_user.dateEntry = data['dateEntry']
        driver_user.dateSotie = data['dateSotie']
        driver_user.fonction = data['fonction']
        driver_user.permis = data['permis']
        driver_user.DateNaissance = data['DateNaissance']
        driver_user.CentreAffectation = data['CentreAffectation']

        # cost_user.DeviceID=data['DeviceID']
        #mission_user.missionID = data['missionID']

        db.session.add(driver_user)
        db.session.commit()
        return {"message": f"driver_user {driver_user.name} successfully updated"}

    elif request.method == 'DELETE':
        db.session.delete(driver_user)
        db.session.commit()
        return {"message": f"cost_user {driver_user} successfully deleted."}
