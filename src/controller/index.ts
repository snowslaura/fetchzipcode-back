import { Request, Response } from "express";
import * as service from "../service/index.js";

export async function fetchCEP(req: Request, res: Response) {    
    const {CEP} = req.params
    const  response  = await service.fetchCEP(CEP)
    res.status(200).send(response);
}



