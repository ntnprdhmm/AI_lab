import numpy as np
import pandas as pd
from sklearn.cluster import KMeans
from sklearn import preprocessing

df = pd.read_csv('../../data/iris.csv')
df.drop(['Id'], 1, inplace=True)

X = np.array(df.drop('Species', 1))
X = preprocessing.scale(X)
y = df['Species']

kmeans = KMeans(n_clusters=3)
kmeans.fit(X)

labels = kmeans.labels_
labels_unique = np.unique(labels)

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
