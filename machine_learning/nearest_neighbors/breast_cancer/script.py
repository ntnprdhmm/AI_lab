import numpy as np
import pandas as pd
import random
from math import sqrt
from collections import Counter

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

df = pd.read_csv('breast_cancer_wisconsin.data')
df.replace('?', -99999, inplace=True)
df.drop(['id'], 1, inplace=True)

# convert everything in the dataframe to float (some of the data have quotes)
data = df.astype(float).values.tolist()

# labels and features are on the same list, so easy to shuffle
random.shuffle(data)

# create train and test sets (2 and 4 are the cancer categories)
test_size = 0.2
train_set = {
    2: [],
    4: []
}
test_set = {
    2: [],
    4: []
}
train_data = data[:-int(test_size * len(data))]
test_data = data[-int(test_size * len(data)):]

for i in train_data:
    # i[-1] is the last column of the data row (the cancer category)
    train_set[i[-1]].append(i[:-1])

for i in test_data:
    # i[-1] is the last column of the data row (the cancer category)
    test_set[i[-1]].append(i[:-1])

# test
correct = 0
total = 0

for group in test_set:
    for data in test_set[group]:
        result = k_nearest_neighbors(train_set, data, k=5)
        if group == result:
            correct += 1
        total += 1
print('Accuracy : %.4f' % (correct/total))