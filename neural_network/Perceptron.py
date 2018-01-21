import matplotlib.pyplot as plt
from random import uniform, random

"""
Classification with a simple perceptron

If x < y, the point has the label 1
If x >= y, the point has the label -1

This code train a perceptron to guess the right label for a given point.
"""

class Point(object):
    def __init__(self, max_value):
        self.x = random()*max_value
        self.y = random()*max_value
        self.label = -1 if self.x > self.y else 1

class Perceptron(object):
    """ Define a simple perceptron with 2 inputs
    """
    def __init__(self):
        self.learning_rate = 0.1
        self.weights = [0]*2
        # init weights randomly
        for i in range(len(self.weights)):
            self.weights[i] = uniform(-1, 1)

    @staticmethod
    def activation_function(n):
        """ return 1 or -1 depending on the sign of the value

            Args:
                n -- int

            return 1 or -1
        """
        return 1 if n >= 0 else -1

    def guess(self, inputs):
        """ do the weighed sum of the inputs and pass the result to the
            activation function before returning a guess

            Args:
                inputs -- list of float

            return the guess, an integer
        """
        s = sum(inputs[i]*self.weights[i] for i in range(len(inputs)))
        return self.activation_function(s)

    def train(self, inputs, target):
        """ Given the inputs, make the perceptron guess.
            If the guess is not correct, tune the weights.

            Args:
                inputs -- list of float
                target -- integer -- the correct guess for these inputs
        """
        guess = self.guess(inputs)
        # error can be 0 (if guess is good), or -+ 2 if the guess is wrong
        error = target - guess
        # tune the weights
        for i in range(len(self.weights)):
            # use a learning rate to adjust weights but not fully
            self.weights[i] += error * inputs[i] * self.learning_rate

if __name__ == '__main__':
    GRID_SIZE = 10

    # create a new perceptron
    perceptron = Perceptron()
    # train the perceptron
    points = [None]*100
    for i in range(len(points)):
        point = Point(GRID_SIZE)
        perceptron.train([point.x, point.y], point.label)
        plt.scatter(point.x, point.y, c = 'yellow' if point.label == 1 else 'black', s=25)
        points[i] = point
    # try the perceptron
    for _ in range(10):
        point = Point(GRID_SIZE)
        guess = perceptron.guess([point.x, point.y])
        print("x:%f y:%f" % (point.x, point.y))
        plt.scatter(point.x, point.y, c='yellow' if guess == 1 else 'black', marker="s", s=80)
    # add a separator line
    plt.plot([i for i in range (GRID_SIZE+1)])

    plt.show()
