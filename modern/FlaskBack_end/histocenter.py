from app import db,app
from flask import Flask, request, jsonify
import json
from datetime import datetime


class histoCenter(db.Model):

    id = db.Column('center_id', db.Integer, primary_key=True)
    center = db.Column(db.String(100))
    driverId = db.Column(db.Integer)
    Date = db.Column(db.DateTime)
    
   


def __init__(self,center,Date,driverId ):

    self.center = center
    self.Date = Date
    self.driverId = driverId
    


def __repr__(self):
    return f"<driver {self.driverId}>"


@app.route('/flsk/histocenter', methods=['POST', 'GET'])
def handle_histocenter():
    if request.method == 'POST':
        if request.is_json:
            data = request.get_json()
            new_driver = histoCenter(
                 center=data['center'], Date=datetime.now(), driverId=data['driverId'])
            db.session.add(new_driver)
            db.session.commit()
            return {"message": f"cost {new_driver.driverId} has been created successfully."}
        else:
            return {"error": "The request payload is not in JSON format"}

    elif request.method == 'GET':
        histodriver = histoCenter.query.all()
        results = [
            {
                "id": last.id,
                "center": last.center,
                "Date": last.Date,
                "driverId":last.driverId
                

            } for last in histodriver]
        return jsonify(results)


@app.route('/flsk/histocenter/<drive_id>', methods=['PUT', 'DELETE'])
def handle_drive_userCenter(drive_id):
    drive_user = histoCenter.query.get_or_404(drive_id)
    if request.method == 'PUT':
        data = request.get_json()
        drive_user.center = data['center']
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