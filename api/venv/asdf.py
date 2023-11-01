import requests
from flask import jsonify

API_KEY = 'mnpPJeIBGqdmWMgaMaVxQ'
url = 'https://www.carboninterface.com/api/v1/estimates'
headers = {
    'Authorization': f'Bearer {API_KEY}',
    'Content-Type': 'application/json'
}

def fetch_electricity():
    attributes = ['mwh','100','us','tx']
    params = {
        "type": "electricity",
        "electricity_unit": attributes[0],
        "electricity_value": int(attributes[1]),
        "country": attributes[2],
        "state": attributes[3]
    }

    response = requests.get(url, headers=headers, params=params)

    if response.status_code == 200:
        data_row = response.json()
        return data_row[0]
    else:
        return"error" + str(response.status_code)
    
print(fetch_electricity())
    
