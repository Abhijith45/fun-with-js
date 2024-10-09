const url="https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";
const appid="64519807c2a6c6b77065b10e857f9169";

const inp=document.querySelector('#inp-city')
const submit=document.querySelector('#inp-submit');

// console.log(d);

// 

setInterval(function (){
    const d=new Date();
    document.querySelector('.dateSet').innerHTML=d.toDateString();
    document.querySelector('.timeSet').innerHTML=d.toLocaleTimeString();
    document.querySelector('u-city').innerHTML=GeolocationCoordinates();
},1000);

async function callWeather(city){
    const response=await fetch(url+city+`&appid=${appid}`);
    var data=await response.json();
    console.log(data);
    inp.value='';
    document.querySelector('#temp-value').innerHTML=data.main.temp;
    document.querySelector('.city-name').innerHTML=data.name;
    document.querySelector('#country').innerHTML=data.sys.country;
    document.querySelector('#feels-like').innerHTML=data.main.feels_like;
    document.querySelector('#min-temp').innerHTML=data.main.temp_min;
    document.querySelector('#max-temp').innerHTML=data.main.temp_max;
    document.querySelector('#pressure').innerHTML=data.main.pressure;
    document.querySelector('#humidity').innerHTML=data.main.humidity;
    document.querySelector('#wind-speed').innerHTML=data.wind.speed;
    document.querySelector('#wind-direction').innerHTML=data.wind.deg;
    document.querySelector('#sunrise').innerHTML=(new Date(data.sys.sunrise * 1000)).toLocaleTimeString();
    document.querySelector('#sunset').innerHTML=(new Date(data.sys.sunset * 1000)).toLocaleTimeString();
}

callWeather('delhi');

submit.addEventListener('click',(e)=>{
    e.preventDefault();
    callWeather(inp.value);
})
callWeather();