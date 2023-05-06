var APIkey='7f0173e58ddd02b80a3869a1bfb909b2';
var searchBtn=document.querySelector('.btn');
var cityInput=document.getElementById('inputCity');
var resultsContainer=document.querySelector('.results-container');
var searchHistory=document.querySelector('.search-history');
var displayCity=document.getElementById('city')
var currentDate=document.getElementById('current-date');
var weatherToday=document.querySelector('.weather-today')

var searchSubmitHandler = function(event){
    event.preventDefault();
    var city=cityInput.value.trim();
    if (city){
        console.log(city);
        displayCity.textContent=city;
     getCityCoordinates(city);
    } else{
        alert('Please enter a valid city name!')
    }
};
var getCityCoordinates=function(city){
    var apiUrl='http://api.openweathermap.org/geo/1.0/direct?q='+city+'&limit=&appid=' + APIkey;
    console.log(apiUrl);
    fetch(apiUrl)
    .then(function(response){
        if (response.ok) {
            response.json().then(function(data){
                console.log(data);
                getWeatherForecast(data);
            });
        } else{
            alert('error');
        }
    })
    .catch(function(error){
        alert('unable to connect')
    });
};

var getWeatherForecast=function(data){
    var latitude=data[0].lat;
    var longitude=data[0].lon;
    console.log(latitude, longitude);
    var cityUrl='http://api.openweathermap.org/data/2.5/forecast?lat=' + latitude+ '&lon='+longitude+ '&appid='+ APIkey +'&units=imperial';
    console.log(cityUrl);
    fetch(cityUrl)
    .then(function(response) {
        if (response.ok) {
           //console.log( response);
            response.json().then (function(data){
                console.log(data);
                displayForecast(data);
            })
        } else{
            alert('error')
        }
    })
}

var displayForecast=function(data){
    var listData=data.list
    console.log(listData);
    console.log(listData.length)
    for (var i = 0; i < listData.length; i+=7) {
        
    
            var temperatureEl=document.createElement("p");
            temperatureEl.textContent='Temp. '+ listData[i].main.temp;
            var cloudsEl=document.createElement("p");
            cloudsEl.textContent=listData[i].weather[0].main;
            var humidityEl=document.createElement("p");
            humidityEl.textContent='Humidity: '+listData[i].main.humidity + '%';
            console.log(listData[i].main.temp);
            var weatherCard=document.createElement('div');
            weatherCard.setAttribute('id', 'weather-'+i);
            weatherCard.setAttribute('class', 'weather-card  col-2 ');
            weatherCard.appendChild(cloudsEl);
            weatherCard.appendChild(temperatureEl)
            weatherCard.appendChild(humidityEl)
            resultsContainer.appendChild(weatherCard)

            //var repoEl = document.createElement('a');
        /*repoEl.classList = 'list-item flex-row justify-space-between align-center';
        repoEl.setAttribute('href', './single-repo.html?repo=' + repoName);
    
        var titleEl = document.createElement('span');
        titleEl.textContent = repoName;
    
        repoEl.appendChild(titleEl);
    
        var statusEl = document.createElement('span');
        statusEl.classList = 'flex-row align-center';
    
        if (repos[i].open_issues_count > 0) {
          statusEl.innerHTML =
            "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + ' issue(s)';
        } else {
          statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
        }
    
        repoEl.appendChild(statusEl);
    
        repoContainerEl.appendChild(repoEl);*/
      }};


//current date
currentDate.textContent=dayjs().format('MMM DD, YYYY');
//console.log(currentDate);

searchBtn.addEventListener('click', searchSubmitHandler);