import axios from "axios";

export async function fetchCEP(CEP: string) {
    try{
        const { data } = await axios.get(`${process.env.API}${CEP}`) 
        const geolocationData = await fetchLatLong(CEP) 
        if(geolocationData){
            const response = { ...data,lat: geolocationData.lat, long: geolocationData.long }
            return response
        }        
        return data
    }catch(e){
        console.log(e);        
    }  
}

export async function fetchLatLong(CEP: string){
    try{
        const { data } = await axios.get(`${process.env.GOOGLE_API}${CEP}`)
        if(data.status ==='ZERO_RESULTS'){
            return             
        }
                
        const lat = data.results[0].geometry.location.lat
        const long = data.results[0].geometry.location.lng
        const response = {
            lat,
            long
        }
        return response
    }catch(e){
        console.log(e);        
    }
}

