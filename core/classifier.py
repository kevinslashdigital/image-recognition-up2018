# import the necessary packages
from keras.preprocessing.image import img_to_array
from keras.models import load_model
import numpy as np
import pickle
import cv2

def sort_labels(labels):
    result = labels
    parrent_labels = ['idcard', 'passport', 'driverlicense']
    b = False
    for label in parrent_labels:
        if label == labels[0]:
            b = True
    if b == False :
        result = [labels[1],labels[0]]
    return result

def classify(model=None, image_data=None, image_path=None, **kwargs):
    if model == None:
        # load the trained convolutional neural network and the label
        model = load_model(kwargs['finalized_model'])

    image = image_data
    if image_path != None:
        image = cv2.imread(image_path)
    # pre-process the image for classification
    image = cv2.resize(image, kwargs.get("image_dims")[:-1])
    image = image.astype("float") / 255.0
    image = img_to_array(image)
    image = np.expand_dims(image, axis=0)

    # binarizer
    lb = pickle.loads(open(kwargs["output_label"], "rb").read())
    # classify the input image
    print("[INFO] classifying image...")
    proba = model.predict(image)[0]
    idxs = np.argsort(proba)[::-1][:2]
    labels_with_pct = []
    labels = []
    # loop over the indexes of the high confidence class labels
    for (i, j) in enumerate(idxs):
        label = "{}: {:.2f}%".format(lb.classes_[j], proba[j] * 100)
        print(label)
        labels_with_pct.append({lb.classes_[j]:proba[j] * 100})
        labels.append(lb.classes_[j])

    # show the probabilities for each of the individual labels
    # for (label, p) in zip(lb.classes_, proba):
    #     print("{}: {:.2f}%".format(label, p * 100))

    prediction = sort_labels(labels)
    return prediction, labels_with_pct

