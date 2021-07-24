# Python Flask- File upload

#import packages
from flask import Flask
import os
from flask import Flask, request, redirect, url_for, render_template, send_from_directory
from werkzeug.utils import secure_filename
import sys
from PIL import Image



UPLOAD_FOLDER = '/' 

ALLOWED_EXTENSIONS = {'jpg', 'jpeg','png','JPG','JPEG','PNG'}

application = Flask(__name__)
DIR_PATH = os.path.dirname(os.path.realpath(__file__))
application.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# limit upload size upto 8mb
application.config['MAX_CONTENT_LENGTH'] = 8 * 1024 * 1024

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


#application = Flask(__name__)

@application.route("/here",methods=['POST'])
def index():
    if request.method == 'POST':
        if 'file' not in request.files:
            print('No file attached in request')
            return redirect(request.url)
        file = request.files['file']
        if file.filename == '':
            print('No file selected')
            return redirect(request.url)
        if file and allowed_file(file.filename):

            filename = secure_filename(file.filename)
            path = os.path.join(application.config['UPLOAD_FOLDER'],filename)
            file.save(path)
	       
	           
	    


	   
    return "yes yes"



    

if __name__ == "__main__":
    application.debug=True
    application.run(host='0.0.0.0')