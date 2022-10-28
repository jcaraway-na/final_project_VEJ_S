# final_project_VEJ_S

## BACKGROUND

(Vince - Circle)

Selected Topic: If the covid pandemic did not happen, how would traffic incidents compare to current traffic incidents since the pandemic began?

Reason why we selected the topic: We selected this topic to analyze traffic trends throughout the Central Texas area.

Description of the source data: Vision Zero

Questions we hope to answer with the data:

If the covid pandemic did not happen, what would traffic incidents look like through the current date?
Since the covid pandemic happened, are commuters more or less safe/better or worse drivers?

### Contributors
<table align=center>
  <tr>
    <td align=center>Router</td>
    <td align=center>ehalprin</td>
    <td align=center>vtg401009</td>
  </tr>
  <tr>
    <td align=center>Square & X</td>
    <td align=center>Triangle & X</td>
    <td align=center>Circle & X</td>
  </tr>
  <tr>
    <td width=250>
      <a href="https://github.com/jcaraway-na">
        <img src="https://github.com/jcaraway-na.png?size=250">
      </a>
    </td>
    <td width=250>
      <a href="https://github.com/ehalprin">
        <img src="https://github.com/ehalprin.png?size=50">
      </a>
    </td>
    <td width=250>
      <a href="https://github.com/vtg401009">
        <img src="https://github.com/vtg401009.png?size=50">
      </a>
    </td>
  </tr>
  <tr>
    <td align=center>Responsible for the repository. Provide recommendations on technologies to be utilized. Develope asp.net webApi connection to Azure SQL database and javaScript frontend.</td>
    <td align=center>Member in the triangle role will create a mockup of a machine learning model. This can even be a diagram that explains how it will work concurrently with the rest of the project steps.</td>
    <td align=center>The member in the circle role will create a mockup of a database with a set of sample data, or even fabricated data. This will ensure the database will work seamlessly with the rest of the project.</td>
  </tr>
</table>

<table>
  <tr>
    <td align=center><p><strong>Application Design</strong></p></td>
  </tr>
  <tr>
    <td align=center>
      <img src="https://github.com/jcaraway-na/final_project_VEJ_S/blob/main/resources/images/app_layout.png?size=50">
    </td>
  </tr>
</table>

---

## Triangle (Elizabeth)

#### Note: Updated ETL Processing and Machine Learning Models are in the Elizabeth-Triangle Branch

### ETL Processing

The original "Vision Zero" dataset was quite large and had many duplicative and incomplete fields. In reviewing null values, I first dropped all the geographical data besides longitude, latitude, and point, as all the others had a huge number of null values. I also dropped case ID, which also had many nulls; "contributing factors" which had a lot of nulls and no key for the numerial data; the units involved and associated metadata, and confirmed fatality for being repetitive; and information on what kind of road the accident happened on. I then split the date column into date and time, and transformed it into datetime format. I encoded the columns with "Y / N" or "Y" and blanks to "1 / 0". I then dropped the few remaining rows with null values as over 100,000 complete rows remained.

### Machine Learning Model

I used a Random Forest Model on a reduced version of the dataset, with just date information, population, growth rate, and the total number of serious accidents per month. Accidents were designated as serious if they either had a fatality or serious injury sustained. I trained the Random Forest Model on data from 2012 through 2019; the model scored highly on both testing and training data. However, when feeding in the data from during the initial COVID lockdown (April through September of 2020), the model turned out to be highly inaccurate, predicting a larger number of serious accidents per month than what happened in reality.

---

## Square (Jennings aka Router)

> Team members present a provisional database that stands in for the final database and accomplishes the following:
>
> - Sample data that mimics the expected final database structure or schema
> - Draft machine learning module is connected to the provisional database

### 1.) ASP.net WebApi Development

<div align=center><strong>Web API Configuration</strong></div>
<table align=center>
  <tr>
    <td>Complete</td>
    <td width="350">Task</td>
    <td>Example</td>
  </tr>
  <tr>
    <td> :white_check_mark: </td>
    <td style="height:10px;"> 1.) Entity Framework DB connection string is stored inside the appsettings.json file. Connection string is then added as a svervice to the db context using "DefaultConnectionString" from the json file.</td>
    <td style="height:10px;">
      <img src="https://github.com/jcaraway-na/final_project_VEJ_S/blob/Jennings_Square/resources/images/jennings_readme_resources/images/db_connection/ef_connection_string.png" width=100% height=100%>
      <img src="https://github.com/jcaraway-na/final_project_VEJ_S/blob/Jennings_Square/resources/images/jennings_readme_resources/images/db_connection/add_connection_to_DbContext.png" width=100% height=100%>
    </td>
  </tr>
  <tr>
    <td> :white_check_mark: </td>
    <td style="height:10px;"> 2.) Build out Crash model and then push model to DB with EntityFramework Table Migration service.</td>
    <td style="height:10px;">
      <img src="https://github.com/jcaraway-na/final_project_VEJ_S/blob/Jennings_Square/resources/images/jennings_readme_resources/images/db_connection/entity_framework_db_model_migration.png" width=100% height=100%>
      <img src="https://github.com/jcaraway-na/final_project_VEJ_S/blob/Jennings_Square/resources/images/jennings_readme_resources/images/db_connection/db_table_structure.png" width=100% height=100%>
    </td>
  </tr>
  <tr>
    <td> :white_check_mark: </td>
    <td style="height:10px;"> 3.) Build out Crash model RESTful API http controller and deploy asp.net webapi.</td>
    <td style="height:10px;">
      <img src="https://github.com/jcaraway-na/final_project_VEJ_S/blob/Jennings_Square/resources/images/jennings_readme_resources/images/db_connection/api_controllers.png" width=100% height=100%>
      <img src="https://github.com/jcaraway-na/final_project_VEJ_S/blob/Jennings_Square/resources/images/jennings_readme_resources/images/db_connection/api_deployed.png" width=100% height=100%>
    </td>
  </tr>
    <tr>
    <td> :white_check_mark: </td>
    <td style="height:10px;"> 4.) Test api calls in swagger environment.</td>
    <td style="height:10px;">
      <img src="https://github.com/jcaraway-na/final_project_VEJ_S/blob/Jennings_Square/resources/images/jennings_readme_resources/images/db_connection/swagger.png" width=100% height=100%>
    </td>
  </tr>
</table
