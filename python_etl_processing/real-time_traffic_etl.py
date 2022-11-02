from concurrent.futures.process import _ResultItem
from datetime import datetime, timedelta
import pandas as pd
import numpy as np
import requests as request
from sodapy import Socrata
import tracemalloc
tracemalloc.start()

#region RESTful API End-Points

# api base url
base_url = "https://vizion-zero-api.azurewebsites.net/"

# get request end-point
get_uri = "Traffic/get-all-traffic-data"

# get request by id end-point
get_by_id_uri = "Traffic/get-incident-by-id"

# post request end-point
post_uri = "Traffic/add-incident"

# put request by id end-point
put_uri = "Traffic/update-incident-by-id"

#endregion

# Vizion Zero website API
async def get_v0_data():
    # base url
    client = Socrata("data.austintexas.gov", None)

    # v0 uri end-point
    results = await client.get("dx9v-zd7x", limit=8000)

    # Convert to pandas DataFrame
    return results

# Get Realtime traffic report
def get_realtime_traffic():
    pastWeek = ((datetime.today())-timedelta(days=7)).isoformat()
    print(pastWeek)

    query = f'SELECT * WHERE published_date >= "{pastWeek}" LIMIT 50000'
    client = Socrata("data.austintexas.gov", None)
    results = client.get("dx9v-zd7x", query=query)
    df= pd.DataFrame.from_records(results)

    get_post_put_request(df)
# Azure asp.net webApi calls
async def get_request():
    r = await request.get(url = f'{base_url}{get_uri}')
    
    response = r.json()
    
    return response

def get_by_id(id):
    r = request.get(url = f'{base_url}{get_by_id_uri}/{id}')
    
    return r

def post_request(payload):
    print(payload)
    r = request.post(url = f'{base_url}{post_uri}', json=payload)
    
    return r

def put_request(id, payload):
    r = request.post(url = f'{base_url}{put_uri}/{id}', json=payload)

    return r

def get_post_put_request(dataframe):
        for index, row in dataframe.iterrows():

            id = row['traffic_report_id']

            # build out payload
            payload = {'traffic_report_id': row['traffic_report_id'],'published_date': row['published_date'], 'issue_reported': row['issue_reported'],
             'latitude': row['latitude'], 'longitude': row['longitude'], 'address': row['address'], 'traffic_report_status': row['traffic_report_status'], 'traffic_report_status_date_time': row['traffic_report_status_date_time']}

            # get crash id from db
            response = get_by_id(id)

            # if crash id != exist then post payload. else put payload
            if response.status_code == 204:
                print(f'Record id {id} not found!')
                print(f'POST status code: {post_request(payload).status_code}.')
            elif response.status_code == 404 or response.status_code == 403:
                if response.status_code == 404:
                    print(f'End point not found: Status code {response.status_code}.')
                else:
                    print(f'End point is forbidden: Status code {response.status_code}.')
            else:
                response = put_request(id,payload)
                print(f'PUT status code: {response.status_code}.')


async def get_raw_data():
    v0_df=pd.DataFrame.from_records(await api_calls.get_v0_data())

    # Drop unnecessary columns
    v0_df = v0_df.drop(columns=['case_id', 'rpt_latitude', 'rpt_longitude', 'rpt_block_num', 'rpt_street_pfx', 'rpt_street_name',
        'rpt_street_sfx', 'street_name', 'street_name_2', 'contrib_factr_p1_id', 'contrib_factr_p2_id','units_involved',
        'atd_mode_category_metadata','apd_confirmed_fatality', 'onsys_fl', 'private_dr_fl'])
    
    # Drop rows without latitude & longitude
    v0_df = v0_df.dropna(subset=["point"])

    # Drop time from date time column
    v0_df['crash_date'] = v0_df['crash_date'].str.split(' ',expand=True)[0]

    # Turn crash date to datetime
    v0_df['crash_date'] = pd.to_datetime(v0_df['crash_date'])

    # Encode Y/N columns
    y_n = ['crash_fatal_fl', 'road_constr_zone_fl']
    v0_df[y_n] = v0_df[y_n].replace({'Y': 1, 'N': 0})

    # Fill blank values in "flag" columns with 0, switch 'Y' to 1
    flag_columns = ['pedestrian_fl', 'motor_vehicle_fl', 'motorcycle_fl', 'bicycle_fl', 'other_fl']
    v0_df[flag_columns] = v0_df[flag_columns].replace({np.nan: '0', 'Y': 1})

    # Drop NAs
    v0_df = v0_df.dropna()

    return v0_df





# Start data pipeline
# get_realtime_traffic()

get_realtime_traffic()
