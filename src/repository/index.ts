import { prisma } from '../database.js';
import { Cep } from '@prisma/client';

export type CreateCepData = Omit<Cep, "id">;

export async function verifyDataBase(CEP: string){
    return await prisma.cep.findFirst({
        where:{
            code: CEP
        }
    });
}

export async function createDataBase(CEP: CreateCepData){
    await prisma.cep.create({
        data: CEP,        
    })
}