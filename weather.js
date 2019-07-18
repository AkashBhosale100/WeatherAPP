class Weather{
    constructor(region,country,state,city){
        this.apiKey='nTdWWecV9GzIaG32tRvdR8tqDWLjwIZV'
        this.baseurl='http://dataservice.accuweather.com'
        this.baseurl_geoDb='http://geodb-free-service.wirefreethought.com'
        this.region=region;
        this.country=country;
        this.state=state;
        this.city=city;
        
    }

    setRegion(region){
        this.region=region
    }

    setCountry(country){
        this.country=country
    }

    setState(state){
        this.state=state
    }

    setCity(city){
        this.city=city
    }

    getSelectedRegion(){
        return this.region;
    }

    getSelectedCountry(){
        return this.country
    }

    getSelectedState(){
        return this.state
    }

    getSelectedCity(){
        return this.city
    }

    async getRegions(){
        const regions=await fetch(`${this.baseurl}/locations/v1/regions?apikey=${this.apiKey}`)
        const regionsData=await regions.json()
        return{
            regionsData
        }
    }

    async getCountries(region){
        const countries=await fetch(`${this.baseurl}/locations/v1/countries/${region}?apikey=${this.apiKey}`)
        const countriesData=await countries.json()
        return {
            countriesData
        }
    }

    async getStates(country){
        const states=await fetch(`${this.baseurl}/locations/v1/adminareas/${country}?apikey=${this.apiKey}`)
        const statesData=await states.json()
        return {
            statesData
        }
    }

    async getCities(state){
        let allCities=[]
        let cities=await fetch(`${this.baseurl_geoDb}/v1/geo/countries/${this.country}/regions/${state}/cities?limit=5&offset=0`)
        let citiesData=await cities.json()

        while(citiesData.data.length!=0){
            
            citiesData.data.forEach(function(city){
                allCities.push(city);
            })

          let nextLink;
          let nextLinkFound=false
          for(let i=0;i<citiesData.links.length;i++)
          {
              if(citiesData.links[i].rel==='next')
              {
                  nextLink=citiesData.links[i].href;
                  nextLinkFound=true
              }
          }
          if(!nextLinkFound)
            break;
          cities=await fetch(`${this.baseurl_geoDb}/${nextLink}`)
          citiesData=await cities.json();
        }

        return {
            allCities
        }
    }

    async getLocationKey(){
        const search=await fetch(`${this.baseurl}/locations/v1/cities/${this.country}/${this.state}/search?apikey=${this.apiKey}&q=${this.city}`)
        
        const searchData= await search.json()

        const key=searchData[0].Key

        return {
            key
        }
    }

    async fetchCurrentWeather(key){
      const weather=await fetch(`${this.baseurl}/currentconditions/v1/${key}?apikey=${this.apiKey}&details=true`)
      const weatherData=await weather.json()
      return weatherData
    }
    
}