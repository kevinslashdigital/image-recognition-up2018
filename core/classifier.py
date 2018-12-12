# import the necessary packages
from keras.preprocessing.image import img_to_array
from keras.models import load_model
import numpy as np
import pickle
import cv2
import operator

def get_label(labels,predict):
  for key,value in labels.items():
    if value == predict:
        return key

def classify(image_data=None, image_path=None,input_shape=None, model=None, labels=None):
  if model == None:
    model = load_model('training-model/cnn.model')
  image = image_data
  if image_path != None:
    image = cv2.imread(image_path)
  # pre-process the image for classification
  image = cv2.resize(image,input_shape )
  image = image.astype("float") / 255.0
  image = img_to_array(image)
  image = np.expand_dims(image, axis=0)
  print("[INFO] classifying image...")

  if labels == None:
    # load label match
    labels = open("label_match.pickle",'rb')  
  # load the object from the file into var b
  label_match = pickle.load(labels)  
  # prediction = model.predict(image)
  # prediction = model.predict_classes(image)
  prediction = model.predict_proba(image)

  index = prediction.argmax(axis=-1)
  data = dict()
  for i in range(0, len(prediction[0])):
    data[get_label(label_match,i)] = prediction[0][i].tolist()
  
  pair = sorted(data.items(), key=operator.itemgetter(1), reverse=True)
  predic_label = get_label(label_match,index), prediction[0][index], label_match, prediction[0], dict(pair)

  return predic_label

if __name__ == "__main__":
  # construct the argument parse and parse the arguments
  classify(image_path='/Users/macbook/Downloads/Python/AI Image Recognition/image-recognition-up2018/core/dataset/test/ក/ក-1038.png',input_shape=(48, 48))
