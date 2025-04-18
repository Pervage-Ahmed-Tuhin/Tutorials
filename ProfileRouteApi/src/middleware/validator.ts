// import { RequestHandler } from "express";

// import * as yup from 'yup';
// export const validate = (schema: any): RequestHandler => {

//     return async (req, res, next) => {

//         if (!req.body) return res.status(422).json({ error: "No data found" });


//         const schemaToValidate = yup.object({
//             body: schema
//         });

//         try {
//             await schemaToValidate.validate({
//                 body: req.body
//             }, { abortEarly: true })
//             next();

//         } catch (error) {

//             if (error instanceof yup.ValidationError) {
//                 return res.status(422).json({ error: error.message })
//             }

//         }


//     }
// }

import * as yup from "yup";

import { RequestHandler } from "express";

export const validate = (schema: any): RequestHandler => {
    return async (req, res, next) => {
        if(!req.body) {
            res.status(404).json({ error: "Empty body is not accepted" });
            return;
        }

        const schemaToValidate = yup.object({
            body: schema

        });

        try {
            await schemaToValidate.validate({ body: req.body }, {
                abortEarly: true
            });
            
            next();
            
        }
        catch (error) {
            if(error instanceof yup.ValidationError) {
                res.status(422).json({ error: error.errors });
                return;
            }
        }
        

    }
}