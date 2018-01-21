import matplotlib.pyplot as plt
from random import uniform, random

"""
Classification with a simple perceptron

If x < y, the point has the label 1
If x >= y, the point has the label -1

This code train a perceptron to guess the right label for a given point.
"""

def f(x, a, b):
    """ calculate y = ax + b

        Args:
            x -- float
            a -- float
            b -- float

        return y
    """
    return  a * x + b

class Point(object):
    def __init__(self, max_value, linear_function, A, B):
        self.x = random()*max_value
        self.y = random()*max_value
        self.label = 1 if linear_function(self.x, A, B) >= self.y else -1

class Perceptron(object):
    """ Define a simple perceptron with 2 inputs
    """
    def __init__(self):
        self.learning_rate = 0.1
        # 2 weights for the point, 1 for the bias
        self.weights = [0]*3
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
        return Perceptron.activation_function(s)

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
    A = 2
    B = 5
    BIAS = 1
    NB_POINTS_FOR_TRAINING = 150
    NB_POINTS_TO_PREDICT = 15

    # create a new perceptron
    perceptron = Perceptron()
    # train the perceptron
    points = [None]*NB_POINTS_FOR_TRAINING
    for i in range(len(points)):
        point = Point(GRID_SIZE, f, A, B)
        perceptron.train([point.x, point.y, BIAS], point.label)
        plt.scatter(point.x, point.y, c = 'yellow' if point.label == 1 else 'black', s=25)
        points[i] = point
    # try the perceptron
    for _ in range(NB_POINTS_TO_PREDICT):
        point = Point(GRID_SIZE, f, A, B)
        guess = perceptron.guess([point.x, point.y, BIAS])
        print("x:%f y:%f" % (point.x, point.y))
        plt.scatter(point.x, point.y, c='yellow' if guess == 1 else 'black', marker="s", s=80)
    # add a separator line
    line_points = []
    for i in range(GRID_SIZE+1):
        y = f(i, A, B)
        line_points.append(y)
        if y > GRID_SIZE:
            break
    plt.plot(line_points)

    plt.show()
