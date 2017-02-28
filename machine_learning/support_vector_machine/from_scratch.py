import numpy as np
import matplotlib.pyplot as plt
from matplotlib import style
style.use('ggplot')

class Support_Vector_Machine:
    # visualization => if we want to graph the data
    def __init__(self, visualization=True):
        self.visualization = visualization
        self.colors = {1: 'r', -1: 'b'}
        if self.visualization: 
            self.fig = plt.figure()
            self.ax = self.fig.add_subplot(1, 1, 1)
    
    # train 
    def fit(self, data):
        self.data = data

        # { ||w||: [w, b] }
        opt_dic = {}

        transforms = [
            [1, 1],
            [-1, 1],
            [-1, -1],
            [1, -1]
        ]

        all_data = []
        for yi in self.data:
            for featureset in self.data[yi]:
                for feature in featureset:
                    all_data.append(feature)
        
        self.max_feature_value = max(all_data)
        self.min_feature_value = min(all_data)
        all_data = None
    
        # yi(xi.w + b) = 1
        # we know we have found a rly good value for w and b when for both classes, the value is close to 1

        # step size for the search of minimum (bowl drawing)
        step_sizes = [self.max_feature_value * 0.1,
                      self.max_feature_value * 0.01,
                      # point of expense (deeper = very expensive but better results) 
                      self.max_feature_value * 0.005]
    
        # b don't need as much optimization as w, so multiply it (less expensive)
        b_range_multiple = 1
        b_multiple = 5
        latest_optimum = self.max_feature_value * 10

        for step in step_sizes:
            w = np.array([latest_optimum, latest_optimum])
            optimized = False
            while not optimized:
                for b in np.arange(-1 * (self.max_feature_value * b_range_multiple), self.max_feature_value * b_range_multiple, step * b_multiple):
                    for transformation in transforms:
                        w_t = w * transformation
                        found_option = True
                        # i is the class in the dict
                        for i in self.data:
                            for xi in self.data[i]:
                                # yi(xi.w + b) >= 1
                                yi = i
                                if not yi*(np.dot(w_t, xi) + b) >= 1:
                                    found_option = False
                        if found_option:
                            # linalg.norm = magnitude of the vector
                            opt_dic[np.linalg.norm(w_t)] = [w_t, b]
                
                if w[0] < 0:
                    optimized = True
                    print('Optimized a step.')
                else: 
                    w = w - step
            
            norms = sorted([n for n in opt_dic])
            opt_choice = opt_dic[norms[0]]

            self.w = opt_choice[0]
            self.b = opt_choice[1]


    def predict(self, features):
        # sign of (x.w + b)
        classfication = np.sign(np.dot(np.array(features), self.w) + self.b)
        if classfication != 0 and self.visualization:
            self.ax.scatter(features[0], features[1], s=200, marker='*', c=self.colors[classfication])

        return classfication

    def visualize(self):
        for i in data_dict:
            for x in data_dict[i]:
                self.ax.scatter(x[0], x[1], s=100, color=self.colors[i])
        
        # x.w + b = v = hyperplane
        # positive support vector = 1
        # negative support vector = -1
        # decision boudary = 0
        def hyperplane(x, w, b, v):
            return (-w[0] * x - b + v) / w[1]

        # positive support vector hyperplane : (w.x + b) = 1
        psv1 = hyperplane(self.min_feature_value, self.w, self.b, 1)
        psv2 = hyperplane(self.max_feature_value, self.w, self.b, 1)
        self.ax.plot([self.min_feature_value, self.max_feature_value], [psv1, psv2], 'k')

        # negative support vector hyperplane : (w.x + b) = -1
        nsv1 = hyperplane(self.min_feature_value, self.w, self.b, -1)
        nsv2 = hyperplane(self.max_feature_value, self.w, self.b, -1)
        self.ax.plot([self.min_feature_value, self.max_feature_value], [nsv1, nsv2], 'k')

        # decision boudary hyperplane : (w.x + b) = 0
        db1 = hyperplane(self.min_feature_value, self.w, self.b, 0)
        db2 = hyperplane(self.max_feature_value, self.w, self.b, 0)
        self.ax.plot([self.min_feature_value, self.max_feature_value], [db1, db2], 'y--')

        plt.savefig('svm.svg')

data_dict = {
    -1: np.array([
        [1, 7],
        [2, 8],
        [3, 8]
    ]),
    1: np.array([
        [5, 1],
        [6, -1],
        [7, 3]
    ])
}

svm = Support_Vector_Machine()
svm.fit(data=data_dict)

predict_us = [
    [0, 10],
    [3, 4],
    [3, 5],
    [5, 5], 
    [5, 6],
    [6, -5],
    [5, 8]
]

for p in predict_us:
    svm.predict(p)

svm.visualize()