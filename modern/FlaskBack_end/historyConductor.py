from app import db,app
from flask import Flask, request, jsonify
import json
from datetime import datetime


class histoConductor(db.Model):

    id = db.Column('seq_id', db.Integer, primary_key=True)
    CarId = db.Column(db.String(100))
    driverId = db.Column(db.Integer)
    added=db.Column(db.Boolean)
    removed=db.Column(db.Boolean)
    Date = db.Column(db.DateTime)
    
   


def __init__(self,CarId,Date,driverId,added,removed ):

    self.CarId = CarId
    self.added = added
    self.removed = removed
    self.Date = Date
    self.driverId = driverId
    


def __repr__(self):
    return f"<driver {self.driverId}>"


@app.route('/histoconductor', methods=['POST', 'GET'])
def handle_histo():
    if request.method == 'POST':
        if request.is_json:
            data = request.get_json()
            new_driver = histoConductor(
                added=data['added'],removed=data['removed'], CarId=data['CarId'], Date=datetime.now(), driverId=data['driverId'])
            db.session.add(new_driver)
            db.session.commit()
            return {"message": f"cost {new_driver.driverId} has been created successfully."}
        else:
            return {"error": "The request payload is not in JSON format"}

    elif request.method == 'GET':
        histodriver = histoConductor.query.all()
        results = [
            {
                "id": last.id,
                "added": last.added,
                "removed": last.removed,
                "CarId": last.CarId,
                "Date": last.Date,
                "driverId":last.driverId
                

            } for last in histodriver]
        return jsonify(results)


@app.route('/histoconductor/<drive_id>', methods=['PUT', 'DELETE'])
def handle_drive_user(drive_id):
    drive_user = histoConductor.query.get_or_404(drive_id)
    if request.method == 'PUT':
        data = request.get_json()
        drive_user.added = data['added']
        drive_user.removed = data['removed']
        drive_user.CarId = data['CarId']
        drive_user.Date = datetime.now()
        # cost_user.DeviceID=data['DeviceID']
        #mission_user.missionID = data['missionID']

        db.session.add(drive_user)
        db.session.commit()
        return {"message": f"seq_user {drive_user.driverId} successfully updated"}

    elif request.method == 'DELETE':
        db.session.delete(drive_user)
        db.session.commit()
        return {"message": f"seq_user {drive_user.driverId} successfully deleted."}

   # End of class seqlast