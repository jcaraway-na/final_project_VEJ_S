# Import dependencies
import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
import matplotlib.pyplot as plt
from sklearn.metrics import accuracy_score, classification_report

# Import data
v0_df = pd.read_csv('/Users/elizabethhalprin/Documents/bootcamp/Final_Project/final_project_VEJ_S/python_etl_processing/v0_df.csv')

# Create 'serious' flag if crash caused fatality or serious injury
v0_df['serious_fl'] = v0_df.apply(lambda row: 1 if row['crash_fatal_fl'] == 1 or row['sus_serious_injry_cnt'] == 1 else 0, axis=1)

# Separate out date column
v0_df['year'] = pd.DatetimeIndex(v0_df['crash_date']).year
v0_df['month'] = pd.DatetimeIndex(v0_df['crash_date']).month
v0_df['day'] = pd.DatetimeIndex(v0_df['crash_date']).day
v0_df['crash_time'] = pd.to_datetime(v0_df['crash_time'])
v0_df['hour'] = pd.DatetimeIndex(v0_df['crash_time']).hour

# Import population csv
pop_df = pd.read_csv('/Users/elizabethhalprin/Documents/bootcamp/Final_Project/final_project_VEJ_S/python_etl_processing/austin_pop.csv')

# Merge Vision Zero data with population data
merged_df = v0_df.merge(pop_df, left_on="year", right_on="Year", how="left").drop(columns='Year')
merged_df['year_month'] = merged_df['year'].astype(str) + "_" + merged_df['month'].astype(str)

# Create dataframe of total serious accidents by month
plot_srs = merged_df[['year_month', 'serious_fl']]
plot_srs = plot_srs.groupby('year_month').sum()

# Create dataframe of total serious accidents by year
year_df = merged_df[['year', 'serious_fl']]
year_df = year_df.groupby('year').sum()
year_df = year_df.merge(pop_df, left_on="year", right_on="Year", how="left")

# Plot the dataframe of total serious accidents per month
plot_srs.plot()

# Get precovid data on serious accidents to train model - drop 2012 because it's not a complete month of data
pcsrs_df = merged_df[(merged_df['year'] < 2020) & (merged_df['year'] > 2012)]
pcsrs_df = pcsrs_df.merge(plot_srs, left_on='year_month', right_on='year_month', how='left').rename(columns={'serious_fl_y': 'total_serious'})
pcsrs_df = pcsrs_df[['year', 'month', 'day', 'hour', 'Population', 'Growth Rate', 'total_serious']]

# Split into X and Y
X_srs = pcsrs_df.drop(columns=['total_serious'])
y_srs = pcsrs_df['total_serious']

# Split into testing and training data
X_srs_train, X_srs_test, y_srs_train, y_srs_test = train_test_split(X_srs, y_srs)

# Create a Random Forest Model
rfc_srs = RandomForestClassifier(n_estimators=500).fit(X_srs_train, y_srs_train)
print(f'Training Score: {rfc_srs.score(X_srs_train, y_srs_train)}')
print(f'Testing Score: {rfc_srs.score(X_srs_test, y_srs_test)}')

# Create function to test model against covid timeframes
def predict_srs(start_year, end_year, start_month, end_month):
    # Create a dataframe with particular timeframem
    df = merged_df.loc[(merged_df['year'].between(start_year, end_year, inclusive='left')) & (merged_df['month'].between(start_month, end_month, inclusive='both'))]
    plot_df = merged_df[['year_month', 'serious_fl']]
    plot_df = plot_df.groupby('year_month').sum()
    df = df.merge(plot_df, left_on='year_month', right_on='year_month', how='left')
    df = df.rename(columns={'serious_fl_y': 'total_serious'})
    df = df[['year', 'month', 'day', 'hour', 'Population', 'Growth Rate', 'total_serious']]

    # Split into X and y
    X = df.drop(columns=['total_serious'])
    y = df['total_serious']
    labels = df['year'].astype(str) + "_" + df['month'].astype(str)

    # Predict using model trained on pre-covid data
    predictions = rfc_srs.predict(X)
    predict_df = pd.DataFrame({'Month': labels, 'Prediction': predictions, 'Actual': y})

    # Get accuracy score
    print(f'Accuracy Score: {accuracy_score(y, predictions)}')

    # Plot the results
    results_df = predict_df.drop_duplicates()
    results_df['Accidents_Avoided'] = results_df.apply(lambda row: row.Prediction - row.Actual, axis=1)
    accidents_avoided = results_df['Accidents_Avoided'].sum()
    print(f'Accidents Avoided: {accidents_avoided}')
    print(results_df)
    results_df.plot.line(x='Month', y=['Prediction', 'Actual'], alpha=0.75, rot=45)

# Look at April-Sep 2020
predict_srs(2020, 2021, 4, 9)

# Plot number of accidents involving pedestrians over time
plot_pedestrians = merged_df[['year_month', 'pedestrian_fl']]
plot_pedestrians = plot_pedestrians.groupby('year_month').sum()
plot_pedestrians.plot()

# Get precovid pedestrian data to train model
pcpd_df = merged_df[(merged_df['year'] < 2020) & (merged_df['year'] > 2012)]
pcpd_df = pcpd_df.merge(plot_pedestrians, left_on="year_month", right_on="year_month", how="left")
pcpd_df = pcpd_df.rename(columns={"pedestrian_fl_y": "total_pedestrian"})
pcpd_df = pcpd_df[['year', 'month', 'day', 'hour', 'Population', 'Growth Rate', 'total_pedestrian']]

# Split into X and y
X_pd = pcpd_df.drop(columns=['total_pedestrian'])
y_pd = pcpd_df['total_pedestrian']

# Split into testing and training data
X_pd_train, X_pd_test, y_pd_train, y_pd_test = train_test_split(X_pd, y_pd)

# Create Random Forest model
rfc_pd = RandomForestClassifier(n_estimators=500).fit(X_pd_train, y_pd_train)
print(f'Training Score: {rfc_pd.score(X_pd_train, y_pd_train)}')
print(f'Testing Score: {rfc_pd.score(X_pd_test, y_pd_test)}')

# Create function to compare predictions to actuals
def predict_pedestrians(start_year, end_year, start_month, end_month):
    # Create a dataframe with particular timeframe
    df = merged_df.loc[(merged_df['year'].between(start_year, end_year, inclusive='left')) & (merged_df['month'].between(start_month, end_month, inclusive='both'))]
    plot_df = merged_df[['year_month', 'pedestrian_fl']]
    plot_df = plot_df.groupby('year_month').sum()
    df = df.merge(plot_df, left_on='year_month', right_on='year_month', how='left').rename(columns={"pedestrian_fl_y": "total_pedestrian"})
    df = df[['year', 'month', 'day', 'hour', 'Population', 'Growth Rate', 'total_pedestrian']]
    
    # Split into X and Y
    X = df.drop(columns=['total_pedestrian'])
    y = df['total_pedestrian']
    labels = df['year'].astype(str) + "_" + df['month'].astype(str)
    
    # Predict using model trained on pre-covid data
    predictions = rfc_pd.predict(X)
    predict_df = pd.DataFrame({"Month": labels, "Prediction": predictions, "Actual": y})
    
    # Get accuracy score
    print(f"Accuracy Score: {accuracy_score(y, predictions)}")
    
    # Plot the results
    results_df = predict_df.drop_duplicates()
    results_df['Accidents Avoided'] = results_df.apply(lambda row: row.Prediction - row.Actual, axis=1)
    accidents_avoided = results_df['Accidents Avoided'].sum()
    print(f"Accidents Avoided: {accidents_avoided}")
    print(results_df)
    results_df.plot.line(x="Month", y=["Prediction", "Actual"], alpha=0.75, rot=45, title="Predicted Accidents Involving Pedestrians, Compared to Actual")

# Look at April-Sep 2020
predict_pedestrians(2020, 2021, 4, 9)