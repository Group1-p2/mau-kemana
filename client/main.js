const URL = "http://localhost:3000/"

function get(country){
    $.ajax({
        method: 'get',
        url : URL + `/third-APIs/getdata/${country}`,
        headers : {access_token: localStorage.access_token}
    })
    .done(data => {
        console.log(data)
        
    })
    .fail(err => {
        console.log(err.responseJSON.errors)
    })
}

function getweather(city){
    $.ajax({
        method: 'get',
        url: URL + `third-APIs/getweather/${city}`
    })
}