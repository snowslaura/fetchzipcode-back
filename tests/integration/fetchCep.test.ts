import supertest from "supertest";
import app from "../../app.js";
import { deleteAllData } from "./factories/deleteAllData.js";
import { prisma } from "../../database.js";

const agent = supertest(app)

beforeEach(async() => {
    await deleteAllData();
});


describe("GET  /:CEP", ()=>{

    it('should return 200 when searching an existing zipcode', async ()=>{     
        const cep = '25015020'        
        const { body } = await agent.get(`/${cep}`)
        
        expect(body.status).toBe(200)

        const verifyCep = await prisma.cep.findFirst({
            where:{
                code: cep
            }
        })        
        expect(verifyCep.code).toBeDefined()
    })

    it('should return 404 when searching an non existing zipcode', async ()=>{     
        
        const cep = '25015021'        
        const { body } = await agent.get(`/${cep}`)
        expect(body.status).toBe(404)

        const verifyCep = await prisma.cep.findFirst({
            where:{
                code: cep
            }
        })        
        expect(verifyCep).toBeFalsy;               
    })  

    it('should return 422 when searching a misdialed zipcode', async ()=>{     
        
        const cep = '250150'        
        const response  = await agent.get(`/${cep}`)
        expect(response.status).toBe(422)

        const verifyCep = await prisma.cep.findFirst({
            where:{
                code: cep
            }
        })        
        expect(verifyCep).toBeFalsy;             
    })
})

afterAll(async () => {
    await prisma.$disconnect();
});