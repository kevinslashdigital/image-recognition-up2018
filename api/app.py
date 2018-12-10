import os 
import sys
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
import json
# from ..core.classifier import Classifier
from flask import request
from flask import jsonify
from flask import Flask, Response
from flask_cors import CORS
from hashlib import sha1
import numpy as np
import datetime
import cv2
from core.classifier import classify
from keras.models import load_model
import tensorflow as tf
graph = tf.get_default_graph()

app = Flask(__name__)
CORS(app)

try:
  model = load_model('../core/training-model/lenet.model')
except Exception as e:
  print(e)
  raise Exception("Model not found!")
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
def classification():
  # try:

  target_photo = get_path()
  print(target_photo)
  print("files",len(request.files))
  photo = request.files.get('photo').read()
  # # target_tmp = os.path.join(TMP_DIR, '{0}.jpg'.format(sha1sum))
  # with open(target_photo, 'wb+') as fp:
  #   fp.write(photo)
  np_arr = np.frombuffer(photo, dtype=np.uint8)
  image = cv2.imdecode(np_arr, 1) 
  with graph.as_default():
    labels = open("../core/label_match.pickle",'rb') 
    predic = classify(image_data=image, input_shape=(48, 48), model=model, labels=labels)
  # except Exception as e:
  #   print(e)

  response = {
    "prediction" : {
      "label": predic[0],
      "prob":  predic[1].tolist()
    },
    "similarity": {
      "labels": predic[2],
      "probs": predic[3].tolist(),
      "pair": predic[4]
    },
    "status" :"200"
  }

  return Response(json.dumps(response), mimetype="applicaition/json")
 
if __name__ == "__main__":
  app.run(port=4000)