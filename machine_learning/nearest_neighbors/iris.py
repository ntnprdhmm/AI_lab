import numpy as np
import pandas as pd
from sklearn import preprocessing, model_selection, neighbors

df = pd.read_csv('../data/iris.csv')
df.drop(['Id'], 1, inplace=True)

X = np.array(df.drop('Species', 1))
y = np.array(df['Species'])

X_train, X_test, y_train, y_test = model_selection.train_test_split(X, y, test_size=0.2)

clf = neighbors.KNeighborsClassifier()
clf.fit(X_train, y_train)

accuracy = clf.score(X_test, y_test)
print('accuracy : %.4f' % accuracy)
