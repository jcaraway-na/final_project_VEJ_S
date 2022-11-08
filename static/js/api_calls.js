

  export async function get_yesterdays_data(startDate,endDate){ 
    return await $.ajax({
        url: `https://data.austintexas.gov/resource/dx9v-zd7x.json?$where=published_date between '${startDate}' and '${endDate}'`,
        type: "GET",
        data: {
            "$limit" : 5000,
            "$$app_token" : "0yD0kMHDMCcp4ML4nxUsdRK50"
        }
    });
  
  }

  export async function get_incidents_by_issue(startDate,endDate,issue){ 
    return await $.ajax({
        url: `https://data.austintexas.gov/resource/dx9v-zd7x.json?$where=published_date between '${startDate}' and '${endDate}' and issue_reported='${issue}'`,
        type: "GET",
        data: {
            "$limit" : 5000,
            "$$app_token" : "0yD0kMHDMCcp4ML4nxUsdRK50"
        }
    });
  
  }

export async function spGetHistoricalTrafficData(startDate,endDate){
    var uri = `https://vizion-zero-api.azurewebsites.net/StoredProcedures/get-historical-traffic-data/${startDate}/${endDate}`
    const response = await fetch(uri,{
        method:'GET'
    })
    const data = await response.json();

    return data
}

export async function spGetTrafficIssues(startDate,endDate){
    var uri = `https://vizion-zero-api.azurewebsites.net/StoredProcedures/get-traffic-issues/${startDate}/${endDate}`
    const response = await fetch(uri,{
        method:'GET'
    })
    const data = await response.json();

    return data
}

export async function spGetDayOfWeek(startDate,endDate){
    var uri = `https://vizion-zero-api.azurewebsites.net/StoredProcedures/get-day-of-week/${startDate}/${endDate}`
    const response = await fetch(uri,{
        method:'GET'
    })
    const data = await response.json();

    return data
}

export async function spIncidentSeverity(startDate,endDate){
    var uri = `https://vizion-zero-api.azurewebsites.net/StoredProcedures/get-crash-severity/${startDate}/${endDate}`
    const response = await fetch(uri,{
        method:'GET'
    })
    const data = await response.json();

    return data
}

export async function spRollingSumByIssue(startDate,endDate){
    var uri = `https://vizion-zero-api.azurewebsites.net/StoredProcedures/get-rolling-sum-by-issue/${startDate}/${endDate}`
    const response = await fetch(uri,{
        method:'GET'
    })
    const data = await response.json();

    return data
}