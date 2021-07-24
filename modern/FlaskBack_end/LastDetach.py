from app import db,app
from flask import Flask, request, jsonify
import json
from datetime import datetime


class lastdetach(db.Model):

    id = db.Column('seq_id', db.Integer, primary_key=True)
    CarId = db.Column(db.Integer)
    Seqname = db.Column(db.String(100))
    driverId = db.Column(db.Integer)
    Date = db.Column(db.DateTime)
    
   


def __init__(self,Seqname,CarId,Date,driverId ):

    self.CarId = CarId
    self.Seqname = Seqname
    self.Date = Date
    self.driverId = driverId
    


def __repr__(self):
    return f"<driver {self.Seqname}>"


@app.route('/lastdetach', methods=['POST', 'GET'])
def handle_detach():
    if request.method == 'POST':
        if request.is_json:
            data = request.get_json()
            new_seq = lastdetach(
                Seqname=data['Seqname'], CarId=data['CarId'], Date=datetime.now(), driverId=data['driverId'])
            db.session.add(new_seq)
            db.session.commit()
            return {"message": f"cost {new_seq.Seqname} has been created successfully."}
        else:
            return {"error": "The request payload is not in JSON format"}

    elif request.method == 'GET':
        lasts = lastdetach.query.all()
        results = [
            {
                "id": last.id,
                "Seqname": last.Seqname,
                "CarId": last.CarId,
                "Date": last.Date,
                "driverId":last.driverId
                

            } for last in lasts]
        return jsonify(results)


@app.route('/lastdetach/<seq_id>', methods=['PUT', 'DELETE'])
def handle_seq_user(seq_id):
    seq_user = lastdetach.query.get_or_404(seq_id)
    if request.method == 'PUT':
        data = request.get_json()
        seq_user.Seqname = data['Seqname']
        seq_user.CarId = data['CarId']
        seq_user.Date = datetime.now()
        # cost_user.DeviceID=data['DeviceID']
        #mission_user.missionID = data['missionID']

        db.session.add(seq_user)
        db.session.commit()
        return {"message": f"seq_user {seq_user.Seqname} successfully updated"}

    elif request.method == 'DELETE':
        db.session.delete(seq_user)
        db.session.commit()
        return {"message": f"seq_user {seq_user.Seqname} successfully deleted."}

   # End of class seqlast