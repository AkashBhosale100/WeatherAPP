//instantiate weather
//const weather=new Weather;

//instantiate ui
const ui = new UI

//instantiate storage
const storage = new Storage

//changeLocation element
const locChange = document.querySelector('#locChange');

//regionsList element
const regionsList = document.querySelector('#regionsList')

//countriesList element
const countriesList = document.querySelector('#countriesList')

//statesList element
const statesList = document.querySelector('#statesList')

//citiesList element
const citiesList = document.querySelector('#citiesList')

//save button
const save = document.querySelector('#w-change-btn')

//DOM loaded event handler
document.addEventListener('DOMContentLoaded', function () {
    const location = storage.getFromLocalStorage()

    if (location != null) {
        ui.setSelectedRegion(location[0].region.region, location[0].region.selectedRegion)
        ui.setSelectedCountry(location[1].country.country, location[1].country.selectedCountry)
        ui.setSelectedState(location[2].state.state, location[2].state.selectedState)
        ui.setSelectedCity(location[3].city.city, location[3].city.selectedCity)

        //get weather
        ui.getCurrentWeather();
    }
})

//add event listener to location change
locChange.addEventListener('click', function () {
    let location = storage.getFromLocalStorage()

    if (location != null) {
        ui.populateRegions()
        ui.populateCountries(location[0].region.selectedRegion)
        ui.populateStates(location[1].country.selectedCountry)
        ui.populateCities(location[2].state.selectedState)

        ui.setSelectedRegion(location[0].region.region, location[0].region.selectedRegion)
        ui.setSelectedCountry(location[1].country.country, location[1].country.selectedCountry)
        ui.setSelectedState(location[2].state.state, location[2].state.selectedState)
        ui.setSelectedCity(location[3].city.city, location[3].city.selectedCity)
    }
    else {
        ui.disableCityLoading()
        ui.disableCountryDropDown()
        ui.disableStateDropDown()
        ui.disableCityDropDown()
        ui.populateRegions()
        ui.disableSaveBtn();
    }
})

//add event listener to regions list
regionsList.addEventListener('click', function (e) {
    ui.setSelectedRegion(e.target.textContent, e.target.id)
    ui.populateCountries(e.target.id)
    ui.enableCountryDropDown()
})

//add event listener to countries list
countriesList.addEventListener('click', function (e) {
    ui.setSelectedCountry(e.target.textContent, e.target.id)
    ui.populateStates(e.target.id)
    ui.enableStateDropDown()
})

//add event listener to states list
statesList.addEventListener('click', function (e) {
    ui.setSelectedState(e.target.textContent, e.target.id)
    ui.populateCities(e.target.id)
    ui.enableCityDropDown()
})

//add event listener to cities list
citiesList.addEventListener('click', function (e) {
    ui.setSelectedCity(e.target.textContent, e)
    ui.enableSaveBtn()
})

//add event listener to saveChanges
save.addEventListener('click', function () {

    //get selected region
    const region = ui.getSelectedRegion()

    //get selected country
    const country = ui.getSelectedCountry()

    //get selected state
    const state = ui.getSelectedState()

    //get selected city
    const city = ui.getSelectedCity()

    //add to local storage
    storage.addToLocalStorage(region, country, state, city)

    //get weather
    ui.getCurrentWeather();

})











