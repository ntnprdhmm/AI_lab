# XOR NN from scratch

import numpy as np
import time

###########
# variables
###

n_hidden = 10   # hidden neurals
n_in = 10       # inputs
n_out = 10      # outputs
n_samples = 300  # number of examples

# hyperparameters
learning_rate = 0.01
momentum = 0.9

# generate the same random numbers everytime (non deterministic)
np.random.seed(0)

###########
# functions
###

# activation function : turn numbers into probabilities
def sigmoid(x):
    return 1.0/(1.0 + np.exp(-x))

# activation function (more accuracy)
def tanh_prime(x):
    return 1 - np.tanh(x)**2

# training function
# x : input data
# t : transpose
# V / W : layers
# bv / bw : biases (help to make more accurate prediction, 1 per layer)
def train(x, t, V, W, bv, bw):
    # forward -- matrix multiply + biases

    # Layer 1
    A = np.dot(x, V) + bv
    Z = np.tanh(A)

    # Layer 2
    B = np.dot(Z, W) + bw;
    Y = sigmoid(B)

    # backward (because it's not a loop, it go backward). Flip the matrix
    Ew = Y - t
    Ev = tanh_prime(A) * np.dot(W, Ew)

    # predict loss
    dW = np.outer(Z, Ew)
    dV = np.outer(x, Ev)

    # cross entropy
    loss = -np.mean(t * np.log(Y) + (1-t) * np.log(1-Y))

    return loss, (dV, dW, Ev, Ew)

# prediction function
def predict(x, V, W, bv, bw):
    A = np.dot(x, V) + bv
    B = np.dot(np.tanh(A), W) + bw
    # we want to return a 0 or a 1 from the probability
    return (sigmoid(B) > 0.5).astype(int)

# create layers
V = np.random.normal(scale=0.1, size=(n_in, n_hidden))
W = np.random.normal(scale=0.1, size=(n_hidden, n_out))

# initialize biases
bv = np.zeros(n_hidden)
bw = np.zeros(n_out)

params = [V, W, bv, bw]

# generate the data
X = np.random.binomial(1, 0.5, (n_samples, n_in))
T = X ^ 1

# training
for epoch in range(100):
    err = []
    update = [0] * len(params)
    t0 = time.clock()
    # for each data point, update the weights
    for i in range(X.shape[0]):
        loss, grad = train(X[i], T[i], *params)
        # update loss
        for j in range(len(params)):
            params[j] -= update[j]
        
        for j in range(len(params)):
            update[j] = learning_rate * grad[j] + momentum * update[j]

        err.append(loss)

    print('Epoch: %d, Loss: %.8f, Time: %.4fs' % (epoch, np.mean(err), time.clock()-t0))

# try to predict something
x = np.random.binomial(1, 0.5, n_in)
print('XOR prediction')
print(x)
print(predict(x, *params))