//instantiate weather
const weather = new Weather;

class UI {

    constructor(region,country,state,city){
        this.region=region
        this.country=country
        this.state=state
        this.city=city
    }
    
    disableCountryDropDown() {
        const countryDropDown = document.querySelector('#dropdownMenuButtonCountry')
        countryDropDown.disabled = true
    }
    enableCountryDropDown() {
        const countryDropDown = document.querySelector('#dropdownMenuButtonCountry')
        countryDropDown.disabled = false
    }

    disableStateDropDown() {
        const stateDropDown = document.querySelector('#dropdownMenuButtonState')
        stateDropDown.disabled = true
    }

    enableStateDropDown() {
        const stateDropDown = document.querySelector('#dropdownMenuButtonState')
        stateDropDown.disabled = false
    }

    disableCityDropDown(){
        const cityDropDown=document.querySelector('#dropdownMenuButtonCity')
        cityDropDown.disabled=true
    }

    enableCityDropDown(){
        const cityDropDown=document.querySelector('#dropdownMenuButtonCity')
        cityDropDown.disabled=false
    }

    disableCityLoading(){
        const cityLoading=document.querySelector('#cityLoading')
        cityLoading.style.display='none'
    }

    enableCityLoading(){
        const cityLoading=document.querySelector('#cityLoading')
        cityLoading.style.display='block'
    }

   
    setSelectedRegion(selectedRegion,selectedRegionID) {
        const regionsDropDown = document.querySelector('#dropdownMenuButtonRegion')
        regionsDropDown.textContent = selectedRegion
        this.region=selectedRegion
        weather.setRegion(selectedRegionID)
    }

    setSelectedCountry(selectedCountry,selectedCountryID) {
        const countriesDropDown = document.querySelector('#dropdownMenuButtonCountry')
        countriesDropDown.textContent = selectedCountry
        this.country=selectedCountry
        weather.setCountry(selectedCountryID)
    }
    
    setSelectedState(selectedState,selectedStateID){
        const statesDropDown=document.querySelector('#dropdownMenuButtonState')
        statesDropDown.textContent=selectedState
        this.state=selectedState
        weather.setState(selectedStateID)
    }

    setSelectedCity(selectedCity){
        const citiesDropDown=document.querySelector('#dropdownMenuButtonCity')
        citiesDropDown.textContent=selectedCity
        this.city=selectedCity
        weather.setCity(selectedCity)
    }

    disableSaveBtn(){
        const save=document.querySelector('#w-change-btn')
        save.disabled=true
    }   

    enableSaveBtn(){
        const save=document.querySelector('#w-change-btn')
        save.disabled=false
    }

    getSelectedRegion(){
        return weather.getSelectedRegion()
    }

    getSelectedCountry(){
        return weather.getSelectedCountry()
    }

    getSelectedState(){
        return weather.getSelectedState()
    }

    getSelectedCity(){
        return weather.getSelectedCity()
    }

    getCurrentWeather(){
        let key;
        weather.getLocationKey().then(res=>{
            key=res.key
            weather.fetchCurrentWeather(key).
            then(weather=>{
                console.log(weather)
                this.paint(weather)
            })
        })
    }


    paint(weather){

    //region    
    const region=document.querySelector('#w-region')
    //country
    const country=document.querySelector('#w-country')
    //state
    const state=document.querySelector('#w-state')
    //city
    const city=document.querySelector('#w-city')
    
    //populate region
    region.textContent=`${this.region}`
    //populate country
    country.textContent=`${this.country}`
    //populate state
    state.textContent=`${this.state}`
    //populate city
    city.textContent=`${this.city}`
    
    //populate description
    const description=document.querySelector('#w-desc')
    description.textContent=weather[0].WeatherText    
    
    //temperature
    const temp=document.querySelector('#w-string')
    temp.textContent=weather[0].Temperature.Imperial.Value +"°"+weather[0].Temperature.Imperial.Unit

    //humidity
    const humidity=document.querySelector('#w-humidity')
    humidity.textContent=`Relative Humidity: ${weather[0].RelativeHumidity}`+"%"

    //dew point
    const dewPoint=document.querySelector('#w-dewpoint')
    dewPoint.textContent=`Dew Point: ${weather[0].DewPoint.Imperial.Value}`+"°"+`${weather[0].DewPoint.Imperial.Unit}`

    //Feels like
    const feelsLike=document.querySelector('#w-feels-like')
    feelsLike.textContent=`Feels Like: ${weather[0].RealFeelTemperature.Imperial.Value}`+"°"+`${weather[0].RealFeelTemperature.Imperial.Unit}`

    //Wind 
    const wind=document.querySelector('#w-wind')
    wind.textContent=`Wind: ${weather[0].WindGust.Speed.Imperial.Value} ${weather[0].WindGust.Speed.Imperial.Unit}`

    //Weather Icon
    let zeroNumber = (weather[0].WeatherIcon < 10 ? '0' : '') + weather[0].WeatherIcon;
    const iconUrl='https://developer.accuweather.com/sites/default/files/'
    const icon=document.querySelector('#w-icon')
    icon.setAttribute('src',`${iconUrl}${zeroNumber}-s.png`)
        


    }

    populateRegions() {
        weather.getRegions().
            then(regions => {
                let output = ''
                regions.regionsData.forEach(function (region) {
                    output += `<a id=${region.ID} class="dropdown-item block" href="#">${region.EnglishName}</a>`
                })
                const regionsList = document.querySelector('#regionsList');
                regionsList.innerHTML = output;
            })
            .catch(error => console.log(error));
    }
    populateCountries(region) {
        weather.getCountries(region)
            .then(countries => {
                let output = ''
                countries.countriesData.forEach(function (country) {
                    output += `<a id=${country.ID} class="dropdown-item block" href="#">${country.EnglishName}</a>`
                })
                const countriesList = document.querySelector('#countriesList')
                countriesList.innerHTML = output
            })
    }

    populateStates(country){
        weather.getStates(country)
        .then(states=>{
            let output=``
            states.statesData.forEach(function(state){
                output += `<a id=${state.ID} class="dropdown-item block" href="#">${state.EnglishName}</a>`
            })
            const statesList=document.querySelector('#statesList')
            statesList.innerHTML=output
        })
    }

    populateCities(state){
        this.enableCityLoading()
        weather.getCities(state)
        .then(cities=>{
            let output=``
            cities.allCities.forEach(function(city){
                output+=`<a id=${city.id} class="dropdown-item block" href="#">${city.name}</a>`
            })
            const citiesList=document.querySelector('#citiesList')
            citiesList.innerHTML=output
            this.disableCityLoading()
        })
    }
}



