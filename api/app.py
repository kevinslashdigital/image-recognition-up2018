import json
# from ..core.classifier import Classifier
from flask import request
from flask import jsonify
from flask import Flask
from hashlib import sha1
import numpy as np
import os
import datetime

app = Flask(__name__)

# cd ai
# FLASK_APP=app.py flask run
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
  target_photo = get_path()
  # print("files",len(flask.request.files))
  photo = request.files.get('photo').read()
  # target_tmp = os.path.join(TMP_DIR, '{0}.jpg'.format(sha1sum))
  with open(target_photo, 'wb+') as fp:
    fp.write(photo)

  response = {
    "prediction" : 'hello',
    "status" :"200"
  }

  return jsonify(response)
 