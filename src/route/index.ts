import { Router } from "express";
import { fetchCEP } from "../controller/index.js";
import { validateSchemaMiddleware } from "../middleware/schemaMiddleware.js";
import { CEPSchema } from "../schema/CEPschema.js";

const router = Router();

router.get(`/:CEP`, validateSchemaMiddleware(CEPSchema), fetchCEP);

export default router;