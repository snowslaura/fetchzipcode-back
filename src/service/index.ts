import axios from "axios";
import * as repository from "../repository/index.js"
import { CreateCepData } from "../repository/index.js";

export async function fetchCEP(CEP: string) {
    const DatafromColdDataBase = await verifyColdDataBase(CEP);
    if(!DatafromColdDataBase){
        const CepData = await fetchDataApi(CEP);
        if(CepData.code){
            const unmaskedCep = unMaskCep(CepData.code)
            await createColdDataBase({...CepData, code: unmaskedCep });
            return CepData
        };
        return CepData
    }
    return DatafromColdDataBase
}

export async function fetchDataApi(CEP: string){
    try{
        const { data } = await axios.get(`${process.env.API}${CEP}`);
        const geolocationData = await fetchLatLong(CEP);
        if(geolocationData){
            const response = { ...data,lat: geolocationData.lat, long: geolocationData.long };
            return response
        }        
        return data
    }catch(e){
        console.log(e);        
    } 
}

export async function fetchLatLong(CEP: string){
    try{
        const { data } = await axios.get(`${process.env.GOOGLE_API}${CEP}`);
        if(data.status ==='ZERO_RESULTS'){
            return             
        }        
        let lat = data.results[0].geometry.location.lat;
        let long = data.results[0].geometry.location.lng;
        const response = {
            lat,
            long
        };
        return response
    }catch(e){
        console.log(e);        
    }
}

async function verifyColdDataBase(CEP: string){
   return await repository.verifyDataBase(CEP);
}

async function createColdDataBase(CepData: CreateCepData){
    return await repository.createDataBase(CepData);
}

function unMaskCep(code: string){
    return (code
        .replace(/\D/g, '')
        .replace(/(\d{5})(\d)/, '$1$2')            
    );
}


