from flask import Flask, request, jsonify
from pprint import pprint
from portail import predict_corona
app = Flask(__name__)
@app.route('/')
def index():
    return "Welcome to the CoronaAPI"
@app.route('/predict_corona', methods=['GET', 'POST'])
def predict_home_price():
     print('-------------------------')
     pprint(request)
     gender= int(request.args.get('gender'))
     age_year= int(request.args.get('age_year'))
     fever= int(request.args.get('fever'))
     cough= int(request.args.get('cough'))
     runny_nose= int(request.args.get('runny_nose'))
     muscle_soreness= int(request.args.get('muscle_soreness'))
     pneumonia= int(request.args.get('pneumonia'))
     diarrhea= int(request.args.get('diarrhea'))
     travel_history= int(request.args.get('travel_history'))
     dic= predict_corona(gender, age_year, fever, cough, runny_nose, muscle_soreness, pneumonia, diarrhea,travel_history)
     print(dic["score"])
     print(dic["predict"])

     response = jsonify({"score": dic["score"],
                         "predict": dic["predict"]})
     return response

if __name__ == "__main__" :
    app.run(debug=True)