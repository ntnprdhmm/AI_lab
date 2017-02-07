import pandas as pd
import numpy as np
import math
from sklearn import preprocessing, model_selection
from sklearn.linear_model import LinearRegression

## read and clean the data
df = pd.read_csv('./data.csv')
df = df.drop(['id', 'date', 'yr_renovated'], 1)
df.dropna(inplace=True)

## features
X = np.array(df.drop(['price'], 1))
X = preprocessing.scale(X)

## labels
y = np.array(df['price'])

## shuffle the dataset, and create train data and test data
X_train, X_test, y_train, y_test = model_selection.train_test_split(X, y, test_size = 0.01)

## fit classifier
clf = LinearRegression()
clf.fit(X_train, y_train)

## test classifier
accuracy = clf.score(X_test, y_test)
print(accuracy)