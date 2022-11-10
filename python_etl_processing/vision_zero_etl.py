import pandas as pd
import numpy as np
import requests as request
from sodapy import Socrata
import asyncio

#region RESTful API End-Points

# api base url
base_url = "https://vizion-zero-api.azurewebsites.net/"

# get request end-point
get_uri = "Crash/get-all-crash_data"

# get request by id end-point
get_by_id_uri = "Crash/get-crash-by-id"

# post request end-point
post_uri = "Crash/add-crash"

# put request by id end-point
put_uri = "Crash/update-crash-by-id"



# get request end-point
get_pop_uri = "Population/get-all-population-data"

# get request by id end-point
get_pop_by_id_uri = "Population/get-population-by-id"

# post request end-point
post_pop_uri = "Population/add-population"

# put request by id end-point
put_pop_uri = "Population/update-population-by-id"

#endregion


# Vizion Zero website API
def get_v0_data():
    # base url
    client = Socrata("data.austintexas.gov", None)

    # v0 uri end-point
    results = client.get("y2wy-tgr5", limit=200000)

    # Convert to pandas DataFrame
    return results

# Azure asp.net webApi calls
def get_request():
    r = request.get(url = f'{base_url}{get_uri}')
    
    response = r.json()
    
    return response
    
def get_all_pop_request():
    r = request.get(url = f'{base_url}{get_pop_uri}')
    
    response = r.json()
    
    return response

def get_crash_by_id(id):
    r = request.get(url = f'{base_url}{get_by_id_uri}/{id}')
    
    return r

def get_pop_by_id(id):
    r = request.get(url = f'{base_url}{get_pop_by_id_uri}/{id}')
    
    return r

def post_request(payload):
    print(payload)
    r = request.post(url = f'{base_url}{post_uri}', json=payload)
    
    return r

def post_pop_request(payload):
    print(payload)
    r = request.post(url = f'{base_url}{post_pop_uri}', json=payload)
    
    return r

def put_request(id, payload):
    r = request.put(url = f'{base_url}{put_uri}/{id}', json=payload)

    return r

def put_pop_request(id, payload):
    r = request.put(url = f'{base_url}{put_pop_uri}/{id}', json=payload)

    return r

def get_post_put_request(dataframe):
    dataframe['crash_date'] = dataframe['crash_date'].astype(str)
    
    for index, row in dataframe.iterrows():

        crash_id = row['crash_id']

        # build out payload
        payload = {'crash_id': row['crash_id'],'crash_fatal_fl': row['crash_fatal_fl'], 'crash_date': row['crash_date'], 'crash_time': row['crash_time'], 'crash_speed_limit': row['crash_speed_limit'], 'road_constr_zone_fl': row['road_constr_zone_fl'], 'latitude': row['latitude'], 'longitude': row['longitude'],
        'crash_sev_id': row['crash_sev_id'], 'sus_serious_injry_cnt': row['sus_serious_injry_cnt'], 'nonincap_injry_cnt': row['nonincap_injry_cnt'], 'poss_injry_cnt': row['poss_injry_cnt'], 'non_injry_cnt': row['non_injry_cnt'], 'unkn_injry_cnt': row['unkn_injry_cnt'], 'tot_injry_cnt': row['tot_injry_cnt'], 'death_cnt': row['death_cnt'],
        'pedestrian_fl': row['pedestrian_fl'], 'motor_vehicle_fl': row['motor_vehicle_fl'], 'motorcycle_fl': row['motorcycle_fl'], 'bicycle_fl': row['bicycle_fl'], 'other_fl': row['other_fl'], 'apd_confirmed_death_count': row['apd_confirmed_death_count'], 'motor_vehicle_death_count': row['motor_vehicle_death_count'],
        'motor_vehicle_serious_injury_count': row['motor_vehicle_serious_injury_count'], 'bicycle_serious_injury_count': row['bicycle_serious_injury_count'], 'pedestrian_death_count': row['pedestrian_death_count'], 'pedestrian_serious_injury_count': row['pedestrian_serious_injury_count'], 'motorcycle_death_count': row['motorcycle_death_count'],
        'motorcycle_serious_injury_count': row['motorcycle_serious_injury_count'], 'other_death_count': row['other_death_count'], 'other_serious_injury_count': row['other_serious_injury_count']}

        # get crash id from db
        response = get_crash_by_id(crash_id)
    
        test = response.json()

        # if crash id != exist then post payload. else put payload
        if response.status_code == 204:
            print(f'Record id {crash_id} not found!')
            print(f'POST status code: {post_request(payload).status_code}.')
        elif response.status_code == 404 or response.status_code == 403:
            if response.status_code == 404:
                print(f'End point not found: Status code {response.status_code}.')
            else:
                print(f'End point is forbidden: Status code {response.status_code}.')
        else:
            response = put_request(crash_id,payload)
            print(f'PUT status code: update row {index} record {crash_id} {response.status_code}.')



def get_raw_data():
    v0_df=pd.DataFrame.from_records(get_v0_data())

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

def read_popdata():
    df = pd.DataFrame()
    df = pd.read_csv('python_etl_processing/austin_pop.csv')
    print(df)
    df['year'] = df['year'].astype(int)
    df['population'] = df['population'].astype(int)
    df['growth_rate'] = df['growth_rate'].astype(float)

    for index, row in df.iterrows():

        # build out payload
        payload = {'year': row['year'],'population': row['population'], 'growth_rate': row['growth_rate']}

        print(f'POST status code: {post_pop_request(payload).status_code}.')
        



# read_popdata()
# Start data pipeline
get_post_put_request(get_raw_data())
