import numpy as np
from flask import Flask, request, jsonify, render_template
import pickle
from flask_cors import CORS,cross_origin

import json

app = Flask(__name__)
cors = CORS(app)
model = pickle.load(open('nbmodel.pkl', 'rb'))
covid = pickle.load(open('covid.pkl', 'rb'))
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict',methods=['POST'])
@cross_origin()
def predict():
    '''
    For rendering results on HTML GUI
    '''
    #newdata = [1, 50, 80, 33, 70, 30, 0.55, 20]
    int_features =(request.json)
    print ((int_features)['name'])
    #[1, 50, 80, 33, 70, 30, 0.55, 20]
    final_features = [np.array(int_features['name'])]
    print(final_features)

    prediction = model.predict(final_features)
    rst ={'predict':prediction[0]}
    print(rst)


    return jsonify( rst)


@app.route('/predictcovid', methods=['POST'])
@cross_origin()
def predictt():
    '''
    For rendering results on HTML GUI
    '''
    # newdata = [1, 50, 80, 33, 70, 30, 0.55, 20]
    int_features = (request.json)
    print((int_features)['name'])
    # [1, 50, 80, 33, 70, 30, 0.55, 20]
    final_features = [np.array(int_features['name'])]
    print(final_features)

    prediction = covid.predict_proba(final_features)
    predict = covid.predict(final_features)
    rst = {'predict': prediction[0][0],
           'malade': int(predict[0])}
    print(rst)

    return jsonify(rst)
@app.route('/predict_api',methods=['POST'])
def predict_api():
    '''
    For direct API calls trought request
    '''
    data = request.get_json(force=True)
    prediction = model.predict([np.array(list(data.values()))])

    output = prediction[0]
    return jsonify(output)

if __name__ == "__main__":
    app.run(debug=True)