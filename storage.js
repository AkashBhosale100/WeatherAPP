class Storage{

    addToLocalStorage(region,country,state,city){
        let locationSettings=[{region},{country},{state},{city}]
        localStorage.setItem('locations',JSON.stringify(locationSettings))
    }
}