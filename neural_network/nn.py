import numpy as np

def sigmoid(x):
    return 1 / (1 + np.exp(-x))

def sigmoid_deriv(x):
    return x * (1-x)

X = np.array([
    [0, 0, 1],
    [1, 0, 1],
    [0, 1, 1],
    [1, 1, 1]
])

Y = np.array([
    [0],
    [1],
    [1],
    [0]
])

n_input = 2
n_hidden = 2
n_output = 1

np.random.seed(0)

# weights between input layer and hidden layer
# add 1 to n_input => the bias neuron
weight_ih = 2*np.random.random((n_input+1, n_hidden)) - 1
# weights between hidden layer and output layer
weight_ho = 2*np.random.random((n_hidden, n_output)) - 1

# train
for j in range(60000):

    # forward
    l0 = X
    l1 = sigmoid(np.dot(l0, weight_ih))
    l2 = sigmoid(np.dot(l1, weight_ho))

    # backward
    l2_error = Y - l2
    l2_delta = l2_error * (sigmoid_deriv(l2))
    l1_error = l2_delta.dot(weight_ho.T)
    l1_delta = l1_error * (sigmoid_deriv(l1))

    if j % 10000 == 0:
        print("Error: %f" % abs(np.mean(l2_error)))

    # update the weights
    weight_ho += l1.T.dot(l2_delta)
    weight_ih += l0.T.dot(l1_delta)

print("RESULT")
print(l2)
