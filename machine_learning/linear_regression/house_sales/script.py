import pandas as pd
import numpy as np
import math
from sklearn import preprocessing, model_selection
from sklearn.linear_model import LinearRegression

PREDICTION_SET_SIZE = 8

print('\n============== HOUSE PRICE ==============\n')

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
X_train, X_test, y_train, y_test = model_selection.train_test_split(X, y, test_size = 0.1)

## get 2 tests rows => the data to predict
X_predict = X_test[:PREDICTION_SET_SIZE]
X_test = X_test[PREDICTION_SET_SIZE:]
y_predict = y_test[:PREDICTION_SET_SIZE]
y_test = y_test[PREDICTION_SET_SIZE:]

## fit classifier
clf = LinearRegression()
clf.fit(X_train, y_train)

## test classifier
accuracy = clf.score(X_test, y_test)
print('ACCURACY : %.4f \n' % accuracy)

## predict and compare with the real price
print('PREDICTIONS : ')
predicted = clf.predict(X_predict)
for i in range(len(y_predict)):
    difference = (predicted[i] - y_predict[i]) / y_predict[i]
    print('*%d [predicted] : %d $ [real] : %d $     | error : %.2f %%' % (i+1, predicted[i], y_predict[i], difference))

print('\n=========================================\n')