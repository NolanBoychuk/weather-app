import './style.css';
const logic = (function(){
    let mainDiv = document.querySelector("div");
    let inputDiv = document.querySelector("#inputDiv");
    let input = document.querySelector("#input");
    let inputButton = document.querySelector("#inputButton")
    let contentDiv = document.querySelector("#contentDiv");
    let locationInfo = document.querySelector("#locationInfo");
    let conditions = document.querySelector("#conditions");
    let location = document.querySelector("#location");
    let tempInfo = document.querySelector("#tempInfo");
    let temp = document.querySelector("#temp");
    let conditionNumbers = document.querySelector("#conditionNumbers");
    let feelsLike = document.querySelector("#feelsLike");
    let wind = document.querySelector("#wind");
    let humidity = document.querySelector("#humidity");
    searchCity('Edmonton');
    inputButton.addEventListener('click', function(){
        let inputted = input.value;
        if(inputted.length === 0){
            input.setAttribute('placeholder', 'Input a valid city');
        }
        else {
            searchCity(inputted);
        }
    }); 
    async function searchCity(inputted){
        try {
            const info = await fetch(`https://api.weatherapi.com/v1/current.json?key=5b5d9e805d604dd8be150136240401&q=${inputted}`, {mode: 'cors'});
            if (info.status === 400) {
                input.value = '';
                input.setAttribute('placeholder', 'Input a valid city');
            }
            else if (info.ok){
                const data = await info.json();
                handleInfo(data);
                input.value = '';
                input.setAttribute('placeholder', 'Search for a City');
            }
            else{
                console.log('error');
            }
        }
        catch(error){
            console.log(error);
        }
    };
    function handleInfo(data){
        console.log(data);
        conditions.textContent = data.current.condition.text;
        location.textContent = `${data.location.name}` + ', ' + `${data.location.country}`;
        temp.textContent = data.current.temp_c + ' C';
        feelsLike.textContent = 'Feels like: ' + data.current.feelslike_c + ' C';
        wind.textContent = 'Wind: ' + data.current.gust_kph + 'Km/h';
        humidity.textContent = 'Humidity: ' + data.current.humidity + '%';
    }
})();
/*
conditions.textContent = '';
            location.textContent = '';
            temp.textContent = '';
            feelsLike.textContent = '';
            wind.textContent = '';
            humidity.textContent = '';
*/