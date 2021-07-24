from werkzeug.utils import secure_filename
from app import db,app
from flask import Flask, request, jsonify, Response,flash, redirect, url_for
from werkzeug.datastructures import ImmutableMultiDict
import os 

UPLOAD_FOLDER = './uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


class img(db.Model):

    id = db.Column('imageId', db.Integer, primary_key=True)
    imag= db.Column(db.LargeBinary, unique=True, nullable=False)
    picName=db.Column( db.Text,nullable=False)


def __init__(self, picName,imag):
   
    self.picName = picName
    self.imag=imag
    


def __repr__(self):
    return f"<pic{self.picName}>"


@app.route('/upload', methods=['POST'])
def upload_file():

    name=request.form.get("picName")
    file=request.files.get("imag")
    if not file :
        return 'No pic uploaded!', 400

    filename = secure_filename(file.filename)
    if not filename :
        return 'Bad upload!', 400    
    #print(request.form)       
    new_img = img(
               imag=file,picName=name    
           )
    
    file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))

    #db.session.add(new_img)
    #db.session.commit()
    return {"message": f"image {filename} has been created successfully."}
     
            
    
       
    

@app.route('/<int:id>')
def get_img(id):
    imgage = img.query.filter_by(id=id).first()
    if not imgage:
        return 'Img Not Found!', 404

    return Response(imgage.imag)    