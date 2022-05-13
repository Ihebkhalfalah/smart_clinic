import pandas as pd
import numpy as np
import seaborn as sns
from scipy import stats
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn import svm
df = pd.read_csv('../../../Downloads/covid_early_stage_symptoms.csv')
df = df.rename(columns = {'SARS-CoV-2 Positive': 'covid_positive'}, inplace = False)
df['gender'].replace({'male':1, 'female':0}, inplace=True)
x = df.drop(columns=['covid_positive', 'isolation_treatment','lung_infection'])
y = df['covid_positive']
#membagi data training dan data test
x_train, x_test, y_train, y_test = train_test_split(x, y,test_size=0.3,random_state=0)
model_log = LogisticRegression()
#menerapkan dataset pada model
model_log.fit(x_train, y_train)
#melihat akurasi model
model_log.score(x_test, y_test)*100
model_svm = svm.SVC(kernel='linear',decision_function_shape='ovr', verbose=False)
model_svm.fit(x_train, y_train)
model_svm.score(x_test, y_test)*100
def predict_corona(a):

    predicted = model_log.predict(a)
    score = model_log.predict_proba(a)
    if predicted == 1 :
        result = 'Positive'
        accuracy = float(str(score[0][1]*100))
    else:
        result = 'Negative'
        accuracy = float(str(score[0][0]*100))
    pre=int(predicted[0])
    dic= {"score":accuracy , "predict":pre }
    return dic






