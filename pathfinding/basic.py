import numpy as np

class NeuralNetwork(object):

    def __init__(self):
        self.inputLayerSize = 2
        self.outputLayerSize = 1
        self.hiddenLayerSize = 3

        # weights
        self.W1 = np.random.randn(self.inputLayerSize, self.hiddenLayerSize)
        self.W2 = np.random.randn(self.hiddenLayerSize, self.outputLayerSize)

    def sigmoid(self, z):
        return 1 / (1 + np.exp(-z))

    # Propagate inputs through network
    def forward(self, X):
        self.z2 = np.dot(X, self.W1)
        self.a2 = self.sigmoid(self.z2)
        self.z3 = np.dot(self.a2, self.W2)
        yHat = self.sigmoid(self.z3)
        return yHat

NN = NeuralNetwork()
X = np.array(([3,5], [5,1], [10,2]), dtype=float)

yHat = NN.forward(X)
print(yHat)