import numpy as np
import pandas as pd
from sklearn.cluster import MeanShift
from sklearn import preprocessing

df = pd.read_csv('../../data/iris.csv')
df.drop(['Id'], 1, inplace=True)

X = np.array(df.drop('Species', 1))
X = preprocessing.scale(X)
y = df['Species']

ms = MeanShift()
ms.fit(X)

labels = ms.labels_
cluster_centers = ms.cluster_centers_
labels_unique = np.unique(labels)
n_clusters_ = len(labels_unique)

print("Number of estimated clusters : %d" % n_clusters_)
print("Labels : " + ' '.join([str(label) for label in labels_unique.tolist()]))

# create a dict with statistics on clusters
dic = {}
species = np.unique(y)
for c in labels_unique:
    # init cluster
    dic[c] = {}
    # add species
    for s in species:
        dic[c][s] = 0

# loop on labels
for i in range(len(labels)):
    dic[ labels[i] ][ y[i] ] += 1

print(dic)
