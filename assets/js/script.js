var APIkey='7f0173e58ddd02b80a3869a1bfb909b2';
var searchBtn=document.querySelector('.btn');
var cityInput=document.getElementById('inputCity');
var resultsContainer=document.querySelector('.results-container');
var searchHistory=document.querySelector('.search-history');
var currentContainer=document.querySelector('.current-forecast')
var displayCity=document.getElementById('city')

var currentDate=document.getElementById('current-date');
var weatherToday=document.querySelector('.weather')
var searchEl=document.querySelectorAll('.saved-cities');

function displaySearchHistory(){
    
    var historyList=document.createElement('ul');
    
    searchHistory.appendChild(historyList)
    
    var search=JSON.parse(localStorage.getItem('cities'))
    if (search!==null){
    for (var i=0; i< search.length; i++){
        
       var searchEl=document.createElement('li');
       searchEl.textContent=search[i];
       searchEl.setAttribute('id', 'search'+i)
       searchEl.setAttribute( 'class', 'saved-cities');
       historyList.appendChild(searchEl);
       
    } 

 }
}

var searchSubmitHandler = function(event){
    event.preventDefault();
    var city=cityInput.value.trim();
    if (city){
        
        console.log(city);
        var citySaved=city;
        
        //pull data from storage
       var search= JSON.parse(localStorage.getItem('cities'));
       if (search==null){
        search=[]
        search.push(citySaved);
        localStorage.setItem('cities', JSON.stringify(search));

       }else{
        search.push(citySaved);
        localStorage.setItem('cities', JSON.stringify(search));
        
        console.log('saved to memory ' + search);
       }
      
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
                var latitude=data[0].lat;
                var longitude=data[0].lon;
                
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
    var cityUrl='https://api.openweathermap.org/data/2.5/forecast?lat=' + latitude+ '&lon='+longitude+ '&appid='+ APIkey +'&units=imperial';
    console.log(cityUrl);
    fetch(cityUrl)
    .then(function(response) {
        if (response.ok) {
               response.json().then (function(data){
                console.log(data);
                currentForecast(data);
                futureForecast(data);
            })
        } else{
            alert('error')
        }
    })
}

var currentForecast=function(data){
    var currentData=data.list[0];
    console.log(currentData  + 'current data')
    var cityDate=document.createElement('h3')
    cityDate.textContent=data.city.name + ' ' + dayjs().format('dddd MMM DD, YYYY');
    var temperatureEl=document.createElement("p");
            temperatureEl.textContent='Temp. '+ currentData.main.temp +'℉';
            var cloudsEl=document.createElement("p");
            var imgIcon=document.createElement('img');
            var icon=currentData.weather[0].icon;
            var weatherIcon= 'https://api.openweathermap.org/img/w/'+icon+'.png';
            var humidityEl=document.createElement("p");
            humidityEl.textContent='Humidity: '+currentData.main.humidity + '%';
            console.log(currentData.main.temp +'  current temp');
            var windEl=document.createElement('p');
            windEl.textContent='Wind: '+currentData.wind.speed + 'MPH';
            var weatherCard=document.createElement('div');

            imgIcon.setAttribute('src', weatherIcon)
            weatherCard.setAttribute('id', 'weather-current');
            weatherCard.setAttribute('class', 'weather-card');
            cloudsEl.appendChild(imgIcon);
            weatherCard.appendChild(cityDate)
            weatherCard.appendChild(cloudsEl);
            weatherCard.appendChild(temperatureEl)
            weatherCard.appendChild(humidityEl)
            weatherCard.appendChild(windEl)
            currentContainer.appendChild(weatherCard);
}



var futureForecast=function(data){
    var listData=data.list
    console.log(listData);
    console.log(listData.length)
    for (var i = 1,  id=1; i < listData.length,  id<6; i+=6, id++) {
        
            var dayOfWeek=document.createElement("p");
            var weekday=dayjs().add(i*4, 'h' ).format('dddd');
            console.log(dayjs().add(i*4, 'h' ));
            dayOfWeek.textContent=weekday;
            dayOfWeek.setAttribute('style','text-weight: bolder')
            var temperatureEl=document.createElement("p");
            temperatureEl.textContent='Temp. '+ listData[i].main.temp +'℉';
            var cloudsEl=document.createElement("p");
            var imgIcon=document.createElement('img');
            var icon=listData[i].weather[0].icon;
            var weatherIcon= 'https://api.openweathermap.org/img/w/'+icon+'.png';
            var humidityEl=document.createElement("p");
            humidityEl.textContent='Humidity: '+listData[i].main.humidity + '%';
            console.log(listData[i].main.temp);
            var windEl=document.createElement('p');
            windEl.textContent='Wind: '+listData[i].wind.speed + 'MPH';
            var weatherCard=document.createElement('div');

            imgIcon.setAttribute('src', weatherIcon)
            weatherCard.setAttribute('id', 'weather-'+id);
            weatherCard.setAttribute('class', 'weather-card  col-2 ');
            
            cloudsEl.appendChild(imgIcon);
            weatherCard.appendChild(dayOfWeek)
            weatherCard.appendChild(cloudsEl);
            weatherCard.appendChild(temperatureEl)
            weatherCard.appendChild(humidityEl)
            weatherCard.appendChild(windEl)
            weatherToday.appendChild(weatherCard)
           

           
      }};

    
displaySearchHistory();


searchHistory.addEventListener('click', function(){
   // eventPreventDefault();
 var city=(event.target.textContent);
 //location.reload();
 getCityCoordinates(city)
 
}, {once:true})
    



searchBtn.addEventListener('click', searchSubmitHandler, {once:true});

