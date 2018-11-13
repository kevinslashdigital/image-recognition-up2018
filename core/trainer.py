import keras
from keras.utils import multi_gpu_model
from keras.preprocessing.image import ImageDataGenerator
import matplotlib.pyplot as plt
import numpy as np
import tensorflow as tf
from keras import backend as K
from model.cnn import CNN

num_cores = 4
num_GPU = 0
num_CPU = 4
# config = tf.ConfigProto(intra_op_parallelism_threads=num_cores,\
#         inter_op_parallelism_threads=num_cores, allow_soft_placement=True,\
#         device_count = {'CPU' : num_CPU, 'GPU' : num_GPU})
# config.gpu_options.allow_growth=True
# sess = tf.Session(config=config)
# K.set_session(sess)

# Model support
def train_model():
  train_datagen = ImageDataGenerator(
    rescale = 1./255,
    shear_range = 0.2,
    zoom_range = 0.2,
    horizontal_flip = True)

  test_datagen = ImageDataGenerator(rescale = 1./255)
  # load train data 
  training_set = train_datagen.flow_from_directory(
    'dataset/train',
    target_size = (64, 64),
    batch_size = 32,
    class_mode = 'binary')
  # load validation data
  validation_set = test_datagen.flow_from_directory(
    'dataset/validation',
    target_size = (64, 64),
    batch_size = 32,
    class_mode = 'binary')
  # test_set = test_datagen.flow_from_directory(
  #   'dataset/test',
  #   target_size = (64, 64),
  #   batch_size = 32,
  #   class_mode = 'binary')

  model = CNN().create_model((64, 64,3),3)
  model.compile(optimizer = 'adam', loss = 'binary_crossentropy', metrics = ['accuracy'])
  model.fit_generator(training_set,
    steps_per_epoch = 20,
    nb_epoch = 5,
    validation_data = validation_set,
    verbose=1)
    
if __name__ == "__main__":
    # construct the argument parse and parse the arguments
    train_model()
