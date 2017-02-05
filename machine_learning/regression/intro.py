import pandas as pd
import quandl
import math
import numpy as np
from sklearn import preprocessing, cross_validation, svm
from sklearn.linear_model import LinearRegression

# df = DataFrame (pandas)
df = quandl.get('WIKI/GOOGL')

df = df[['Adj. Open', 'Adj. High', 'Adj. Low', 'Adj. Close', 'Adj. Volume']]
df['HL_PCT'] = (df['Adj. High'] - df['Adj. Close']) / df['Adj. Close'] * 100.0
df['PCT_change'] = (df['Adj. Close'] - df['Adj. Open']) / df['Adj. Open'] * 100.0

# just get the column that we care about
df = df[['Adj. Close', 'HL_PCT', 'PCT_change', 'Adj. Volume']]

forecast_col = 'Adj. Close'
# replace NA/NaN with a value (cause we can't work with NA/Nan in machine learning)
df.fillna(-99999, inplace=True)

# try to predict 10% of the dataframe
forecast_out = int(math.ceil(0.01*len(df)))

df['label'] = df[forecast_col].shift(-forecast_out)
# drop rows where there is no labels
df.dropna(inplace=True)

# features : everything except label column
X = np.array(df.drop(['label'], 1))
# labels : the label column of course
y = np.array(df['label'])

# normalization
X = preprocessing.scale(X)

# fit classifier with 20% of our data
X_train, X_test, y_train, y_test = cross_validation.train_test_split(X, y, test_size=0.2)
clf = LinearRegression()
clf.fit(X_train, y_train)

# test classifier (accuracy)
accuracy = clf.score(X_test, y_test)

print(accuracy)