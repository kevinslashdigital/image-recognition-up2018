import json
# from ..core.classifier import Classifier
from flask import request
from flask import jsonify
from flask import Flask
from flask_cors import CORS
from hashlib import sha1
import numpy as np
import os
import datetime

app = Flask(__name__)
CORS(app)

# cd ai
# FLASK_APP=app.py flask run
# postman https://www.getpostman.com/collections/888b925425a9151ee06e
@app.route("/")
def hello():
  return "Hello World!"

def get_path():
  DATA_DIR = os.environ.get('DATA_DIR', 'data')
  format = "%y%m%d"
  now = datetime.datetime.utcnow().strftime(format)
  upload_key = 'image'
  target = os.path.join(DATA_DIR,"{}/{}".format(now, upload_key))
  print(target)
  try:
    os.makedirs(target)
  except:
    print('cannot create file')

  # sha1sum = sha1(photo).hexdigest()
  # nparr = np.fromstring(photo, np.uint8)

  target_photo = os.path.join(target, '{0}.jpg'.format(now))
  return target_photo

@app.route('/classify', methods=['POST'])
def classify():
  try:

    target_photo = get_path()
    print(target_photo)
    print("files",len(request.files))
    photo = request.files.get('photo').read()
    # target_tmp = os.path.join(TMP_DIR, '{0}.jpg'.format(sha1sum))
    with open(target_photo, 'wb+') as fp:
      fp.write(photo)
  except Exception as e:
    print(e)
  response = {
    "prediction" : 'hello',
    "status" :"200"
  }

  return jsonify(response)
 