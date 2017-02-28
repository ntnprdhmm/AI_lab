import numpy as np
import matplotlib.pyplot as plt
from math import sqrt
from matplotlib import style
from collections import Counter

style.use('fivethirtyeight')

def k_nearest_neighbors(data, new_feature, k=3):
    # calculate the euclidean distances between the new point and all the other points
    distances = []
    for group in data:
        for feature in data[group]:
            euclidean_distance = np.linalg.norm(np.array(feature) - np.array(new_feature))
            distances.append([euclidean_distance, group])
    # sort to find the closest points (and we want only the first k)
    sort = [i[1] for i in sorted(distances)[:k]]
    # then, find the group of the new feature
    result = Counter(sort).most_common(1)[0][0] 

    return result

dataset = {
    # green points on the graph
    'g': [
        [1, 2], [2, 3], [3, 1]
    ],
    # red points
    'r' : [
        [6, 5], [7, 7], [8, 6]
    ]
}

new_feature = [5, 7]

# draw the graph with the data and the new feature
for i in dataset:
    for j in dataset[i]:
        [[plt.scatter(j[0], j[1], s=100, color=i)]]

plt.scatter(new_feature[0], new_feature[1])
plt.savefig('test.svg')

# search the group of the new feature
print(k_nearest_neighbors(dataset, new_feature))