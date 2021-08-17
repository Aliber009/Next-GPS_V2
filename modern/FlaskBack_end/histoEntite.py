from app import db,app
from flask import Flask, request, jsonify
import json
from datetime import datetime


class histoEntite(db.Model):

    id = db.Column('seq_id', db.Integer, primary_key=True)
    SeqId = db.Column(db.String(100))
    Centre = db.Column(db.String(100))
    Date = db.Column(db.DateTime)
    
   


def __init__(self,SeqId,Date,Centre ):

    self.SeqId = SeqId
    self.Date = Date
    self.Centre = Centre
    


def __repr__(self):
    return f"<driver {self.Centre}>"


@app.route('/flsk/histoEntite', methods=['POST', 'GET'])
def handle_histoEntite():
    if request.method == 'POST':
        if request.is_json:
            data = request.get_json()
            new_seqEnt = histoEntite(
                 SeqId=data['SeqId'], Date=datetime.now(), Centre=data['Centre'])
            db.session.add(new_seqEnt)
            db.session.commit()
            return {"message": f"cost {new_seqEnt.Centre} has been created successfully."}
        else:
            return {"error": "The request payload is not in JSON format"}

    elif request.method == 'GET':
        histodriver = histoEntite.query.all()
        results = [
            {
                "id": last.id,
                "SeqId": last.SeqId,
                "Date": last.Date,
                "Centre":last.Centre
            } for last in histodriver]
        return jsonify(results)

@app.route('/flsk/histoEntite/<drive_id>', methods=['PUT', 'DELETE'])
def handle_seqEnt_user(drive_id):
    drive_user = histoEntite.query.get_or_404(drive_id)
    if request.method == 'PUT':
        data = request.get_json()
        drive_user.SeqId = data['SeqId']
        drive_user.Date = datetime.now()
        # cost_user.DeviceID=data['DeviceID']
        #mission_user.missionID = data['missionID']

        db.session.add(drive_user)
        db.session.commit()
        return {"message": f"seq_user {drive_user.Centre} successfully updated"}

    elif request.method == 'DELETE':
        db.session.delete(drive_user)
        db.session.commit()
        return {"message": f"seq_user {drive_user.Centre} successfully deleted."}

   # End of class seqlast