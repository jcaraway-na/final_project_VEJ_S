# final_project_VEJ_S

## BACKGROUND

> If the covid pandemic did not happen, how would traffic incidents compare to current traffic incidents since the pandemic began?

### Contributors
<table>
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
    <td width=150>
      <a href="https://github.com/jcaraway-na">
        <img src="https://github.com/jcaraway-na.png?size=150">
      </a>
    </td>
    <td width=150>
      <a href="https://github.com/ehalprin">
        <img src="https://github.com/ehalprin.png?size=50">
      </a>
    </td>
    <td width=150>
      <a href="https://github.com/vtg401009">
        <img src="https://github.com/vtg401009.png?size=50">
      </a>
    </td>
  </tr>
</table>

---

### ETL Processing

Elizabeth

The original "Vision Zero" dataset was quite large and had many duplicative and incomplete fields. In reviewing null values, I first dropped all the geographical data besides longitude, latitude, and point, as all the others had a huge number of null values. I also dropped case ID, which also had many nulls; "contributing factors" which had a lot of nulls and no key for the numerial data; the units involved and associated metadata, and confirmed fatality for being repetitive; and information on what kind of road the accident happened on. I then split the date column into date and time, and transformed it into datetime format. I encoded the columns with "Y / N" or "Y" and blanks to "1 / 0". I then dropped the few remaining rows with null values as over 100,000 complete rows remained.

# image placeholder


### Machine Learning Model

Elizabeth

I used a Random Forest Model on a reduced version of the dataset, with just date information, population, growth rate, and the total number of serious accidents per month. Accidents were designated as serious if they either had a fatality or serious injury sustained. I trained the Random Forest Model on data from 2012 through 2019; the model scored highly on both testing and training data. 

# Image placeholder

However, when feeding in the data from during the initial COVID lockdown (April through September of 2020), the model turned out to be highly inaccurate, predicting a larger number of serious accidents per month than what happened in reality. 

# Image placeholders

### Application Design

<div>
  <img src="https://github.com/jcaraway-na/final_project_VEJ_S/blob/main/resources/images/app_layout.png?size=50">
</div>
