'''
@author: Sarthak Tandon
 
This file takes as input, the features of user pertaining weather and other factors 
to determine whether a certain crop is feasible for a farmer given his location, time of 
year and other such factors

The code below implements a neural network to accomplish the same.
'''


import tensorflow as tf
import pandas as pd

RANDOM_SEED = 42
tf.set_random_seed(RANDOM_SEED)
num_epochs = 100

def init_weights(shape):
    weights = tf.random_normal(shape, stddev=0.1)
    return tf.Variable(weights)

def forwardprop(X, w_1, w_2, b_1, b_2):
    h = tf.nn.sigmoid(tf.matmul(X, w_1) + b_1)
    yhat = tf.matmul(h, w_2) + b_2
    return yhat

def get_data():
    inputData = pd.read_csv(r'C:\Users\Shreya\Desktop\Climate Data.csv')
    all_X = tf.constant(inputData[4:8])
    all_Y = tf.constant(inputData[8:14])
    return all_X, all_Y

train_X, train_y = get_data()
# Layer's sizes
x_size = 4  # Number of input nodes
h_size = 5  # Number of hidden nodes
y_size = 6  # Number of outcomes 

# Symbols
# X = tf.placeholder("float", shape=[None, x_size])
# y = tf.placeholder("float", shape=[None, y_size])

# Weight initializations
w_1 = init_weights((x_size, h_size))
w_2 = init_weights((h_size, y_size))
b_1init = init_weights((None, h_size))
b_2init = init_weights((None, y_size))
b_1 = tf.Variable(dtype = tf.float64, expected_shape = [1332, h_size])
b_2 = tf.Variable(dtype = tf.float64, expected_shape = [1332, y_size])

for i in range(1332):
    b_1[i] = b_1init
    
for i in range(1332):
    b_2[i] = b_2init


# Forward propagation
yhat    = forwardprop(train_X, w_1, w_2, b_1, b_2)

# Backward propagation
cost    = tf.reduce_sum(tf.reduce_sum(tf.square(tf.subtract(train_y,yhat)), 1),0)
updates = tf.train.GradientDescentOptimizer(0.01).minimize(cost)

# Run
sess = tf.Session()
init = tf.global_variables_initializer()
sess.run(init)

for epoch in range(num_epochs):
    # Train with each example
    sess.run(updates)
sess.close()

#%%
    
    