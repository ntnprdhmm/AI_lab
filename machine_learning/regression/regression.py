import numpy as np
import matplotlib.pyplot as plt
from matplotlib import style

style.use('fivethirtyeight')

xs = np.array([1, 2, 3, 4, 5, 6])
ys = np.array([5, 4, 6, 5, 6, 7])

def slope(xs, ys):
    m = ( ((np.mean(xs) * np.mean(ys)) - np.mean(xs * ys)) /
            ((np.mean(xs)**2) - np.mean(xs**2)) )
    return m

def y_intersect(m, xs, ys):
    return np.mean(ys) - m * np.mean(xs)


def best_fit_line(x, m, b):
    return (m*x) + b

m = slope(xs, ys)
b = y_intersect(m, xs, ys)

regression_line = [best_fit_line(x, m, b) for x in xs]

predict_x = 8
predict_y = best_fit_line(predict_x, m, b)

plt.scatter(predict_x, predict_y, color='g')
plt.scatter(xs, ys)
plt.plot(xs, regression_line)
plt.savefig('regression_line.svg')