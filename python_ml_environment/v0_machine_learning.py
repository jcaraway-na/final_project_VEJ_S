# Import dependencies
import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
import matplotlib.pyplot as plt
from sklearn.metrics import accuracy_score

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
v0_df['dayofweek'] = pd.to_datetime(v0_df['crash_date']).apply(lambda x: x.weekday())

# Import population csv
pop_df = pd.read_csv('/Users/elizabethhalprin/Documents/bootcamp/Final_Project/final_project_VEJ_S/python_etl_processing/austin_pop.csv')

# Merge Vision Zero data with population data
merged_df = v0_df.merge(pop_df, left_on="year", right_on="Year", how="left").drop(columns='Year')
merged_df['year_month'] = merged_df['year'].astype(str) + "_" + merged_df['month'].astype(str).str.zfill(2)

# Create dataframe of total serious crashes by month
plot_srs = merged_df[['year_month', 'serious_fl']]
plot_srs = plot_srs.groupby('year_month').sum()

# Create dataframe of total serious crashes by year
year_df = merged_df[['year', 'serious_fl']]
year_df = year_df.groupby('year').sum()
year_df = year_df.merge(pop_df, left_on="year", right_on="Year", how="left")

# Plot the dataframe of total serious crashes per month
plot_srs.plot(color='rebeccapurple', title='Serious Crashes Per Month')

# Get precovid data on serious crashes to train model - drop 2012 because it's not a complete month of data
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
    labels = df['year'].astype(str) + "_" + df['month'].astype(str).str.zfill(2)

    # Predict using model trained on pre-covid data
    predictions = rfc_srs.predict(X)
    predict_df = pd.DataFrame({'Month': labels, 'Prediction': predictions, 'Actual': y})

    # Get accuracy score
    print(f'Accuracy Score: {accuracy_score(y, predictions)}')

    # Plot the results
    results_df = predict_df.drop_duplicates()
    results_df = results_df.sort_values('Month')
    results_df['Crashes_Avoided'] = results_df.apply(lambda row: row.Prediction - row.Actual, axis=1)
    crashes_avoided = results_df['Crashes_Avoided'].sum()
    print(f'Crashes Avoided: {crashes_avoided}')
    print(results_df)
    results_df.plot.line(x='Month', y=['Prediction', 'Actual'], alpha=0.75, rot=45, color=['rebeccapurple', 'salmon'], title='Predicted Serious Crashes, Compared to Actual')

# Look at April-Sep 2020
predict_srs(2020, 2021, 4, 9)

# Plot number of crashes involving pedestrians over time
plot_pedestrians = merged_df[['year_month', 'pedestrian_fl']]
plot_pedestrians = plot_pedestrians.groupby('year_month').sum()
plot_pedestrians = plot_pedestrians.sort_values('year_month')
plot_pedestrians.plot(color='mediumpurple', title='Crashes Involving Pedestrians, 2012-2022')

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
    labels = df['year'].astype(str) + "_" + df['month'].astype(str).str.zfill(2)
    
    # Predict using model trained on pre-covid data
    predictions = rfc_pd.predict(X)
    predict_df = pd.DataFrame({"Month": labels, "Prediction": predictions, "Actual": y})
    
    # Get accuracy score
    print(f"Accuracy Score: {accuracy_score(y, predictions)}")
    
    # Plot the results
    results_df = predict_df.drop_duplicates()
    results_df = results_df.sort_values('Month')
    results_df['Crashes Avoided'] = results_df.apply(lambda row: row.Prediction - row.Actual, axis=1)
    crashes_avoided = results_df['Crashes Avoided'].sum()
    print(f"Crashes Avoided: {crashes_avoided}")
    print(results_df)
    results_df.plot.line(x="Month", y=["Prediction", "Actual"], alpha=0.75, rot=45, color=['rebeccapurple', 'salmon'], title="Predicted Crashes Involving Pedestrians, Compared to Actual")

# Look at April-Sep 2020
predict_pedestrians(2020, 2021, 4, 9)

# Look at number of crashes by time of day, pre-covid
precovid_hours = merged_df[(merged_df['year'].between(2012,2020,inclusive='neither'))]
precovid_hours = precovid_hours[['hour', 'crash_id']].groupby('hour', as_index=False).count()
precovid_hours = precovid_hours.rename(columns={'crash_id': 'total_crashes'})
precovid_hours['average_crashes'] = precovid_hours['total_crashes'] / (365*7)

# Look at number of crashes by time of day, during covid
covid_hours = merged_df[(merged_df['year'] == 2020) & (merged_df['month'].between(4,9, inclusive='both'))]
covid_hours = covid_hours[['hour', 'crash_id']].groupby('hour', as_index=False).count()
covid_hours = covid_hours.rename(columns={'crash_id': 'total_crashes'})
covid_hours['average_crashes'] = covid_hours['total_crashes'] / (365/2)

# Compare time of day by era
hours_comparison = pd.DataFrame({'Hour': precovid_hours['hour'], 'PreCovid_Crashes': precovid_hours['average_crashes'], 'Covid_Crashes': covid_hours['average_crashes']})
hours_comparison.plot(x='Hour', y=['PreCovid_Crashes', 'Covid_Crashes'], title="Average Number of Crashes by Time of Day", color=['mediumpurple', 'salmon'])

# Look at number of crashes by day of week, pre-covid
precovid_dayofweek = merged_df[merged_df['year'].between(2012, 2020, inclusive='neither')]
precovid_dayofweek = precovid_dayofweek[['crash_id', 'dayofweek']].groupby('dayofweek').count()
precovid_dayofweek = precovid_dayofweek.rename(columns={'crash_id': 'total_crashes'})
precovid_dayofweek['average_crashes'] = precovid_dayofweek['total_crashes'] / 365

# Look at number of crashes by day of week, covid
covid_dayofweek = merged_df[(merged_df['year'] == 2020) & (merged_df['month'].between(4,10, inclusive='both'))]
covid_dayofweek = covid_dayofweek[['crash_id', 'dayofweek']].groupby('dayofweek').count()
covid_dayofweek = covid_dayofweek.rename(columns={'crash_id': 'total_crashes'})
covid_dayofweek['average_crashes'] = covid_dayofweek['total_crashes'] / 30.5

# Compare day of week by era
dayofweek_labels = ['Mon', 'Tues', 'Weds', 'Thurs', 'Fri', 'Sat', 'Sun']
compare_dayofweek_df = pd.DataFrame({'dayofweek': dayofweek_labels, 'precovid_average_crashes': precovid_dayofweek['average_crashes'],
                                    'covid_average_crashes': covid_dayofweek['average_crashes']})
compare_dayofweek_df.plot(x='dayofweek', y=['precovid_average_crashes', 'covid_average_crashes'], title="Crashes by Day, Pre and During COVID", color=['mediumpurple', 'salmon'])

# Look at number of crashes by month, pre-covid
precovid_months = merged_df[(merged_df['year'].between(2012,2020,inclusive='neither'))]
precovid_months = precovid_months[['month', 'crash_id']].groupby('month', as_index=False).count()
precovid_months = precovid_months.rename(columns={'crash_id': 'precovid_crashes'})
precovid_months['average_precovid'] = precovid_months['precovid_crashes'] / (7)

# Look at number of crashes by month, during covid
months_2020 = merged_df[merged_df['year'] == 2020]
months_2020 = months_2020[['month', 'crash_id']].groupby('month', as_index=False).count()
months_2020 = months_2020.rename(columns={'crash_id': 'crashes_2020'})

# Look at number of crashes by month, 2021
months_2021 = merged_df[merged_df['year'] == 2021]
months_2021 = months_2021[['month', 'crash_id']].groupby('month', as_index=False).count()
months_2021 = months_2021.rename(columns={'crash_id': 'crashes_2021'})

# Compare months by era
months_comparison = pd.DataFrame({'Month': precovid_months['month'], 'PreCovid_Crashes_Per_Month': precovid_months['average_precovid'], 'Crashes_2020': months_2020['crashes_2020'], 'Crashes_2021': months_2021['crashes_2021']})
months_comparison.plot(x='Month', y=['PreCovid_Crashes_Per_Month', 'Crashes_2020', 'Crashes_2021'], title="Average Number of Crashes by Month", color=['rebeccapurple', 'mediumpurple', 'salmon'])