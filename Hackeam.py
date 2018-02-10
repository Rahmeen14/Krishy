import tensorflow as tf
import numpy as np
import pandas as pd

RANDOM_SEED = 42
tf.set_random_seed(RANDOM_SEED)

def init_weights(shape):
    weights = tf.random_normal(shape, stddev=0.1)
    return tf.Variable(weights)

def forwardprop(X, w_1, w_2):
    h    = tf.nn.sigmoid(tf.matmul(X, w_1))
    yhat = tf.matmul(h, w_2)
    return yhat

def get_data():

    df = pd.read_csv(r'C:\Users\Shreya\Desktop\Climate Data.csv')
    df = df.values
    Xdata = df[:,5:8]
    Ydata = df[:,8:14]

    # Prepend the column of 1s for bias
    N, M  = Xdata.shape
    all_X = np.ones((N, M + 1))
    all_X[:, 1:] = Xdata

    all_Y = Ydata
    return all_X, all_Y   

def predict(w_1, w_2, t1, t2, r, s, crop):
    X = tf.constant([[t1, t2, r, s]])
    yhat = forwardprop(X, w_1, w_2)
    cropMap = {'wheat':0, 'maize':1, 'rice':2, 'pulse':3, 'sugarcane':4, 'jute':5}
    prediction = tf.argmax(yhat, axis=1)
    print(prediction == cropMap[crop])


def main(t1, t2, r, s, crop):

    train_X, train_y = get_data()
       
    # Layer's sizes
    x_size = 4   # Number of input nodes: 4 features and 1 bias
    h_size = 5   # Number of hidden nodes
    y_size = 6   # Number of outcomes (3 iris flowers)

    # Symbols
    X = tf.placeholder("float", shape=[None, x_size])
    y = tf.placeholder("float", shape=[None, y_size])

    # Weight initializations
    w_1 = init_weights((x_size, h_size))
    w_2 = init_weights((h_size, y_size))

    # Forward propagation
    yhat    = forwardprop(X, w_1, w_2)

    # Backward propagation
    cost    = tf.reduce_mean(tf.nn.softmax_cross_entropy_with_logits(labels=y, logits=yhat))
    updates = tf.train.GradientDescentOptimizer(0.01).minimize(cost)

    # Run SGD
    sess = tf.Session()
    init = tf.global_variables_initializer()
    sess.run(init)

    for epoch in range(100):
        # Train with each example
        for i in range(1332):
            sess.run(updates, feed_dict={X: train_X[i: i + 1], y: train_y[i: i + 1]})
    sess.close()
    predict(w_1, w_2, t1, t2, r, s, crop)
    
main(10.0,15.0,55.0,10.0,'jute')
#%%