import { create, generateForgetPasswordLink, grantValid, sendReVerificationToken, signIn, updatePassword, verifyEmail } from "#/controllers/user";
import { isValidPassResetToken, mustAuth } from "#/middleware/auth";
import { validate } from "#/middleware/validator";
import { CreateUserSchema, SignInValidationSchema, TokenAndIdValidation, UpdatePasswordSchema } from "#/utils/validationSchema";
import { JWT_SECRET } from "#/utils/variables";
import { Router } from "express";
import { JwtPayload, verify } from "jsonwebtoken";

import User from "#/models/user";

const router = Router();

router.post('/create', validate(CreateUserSchema), create);


router.post("/verify-email", validate(TokenAndIdValidation), verifyEmail);
router.post("/re-verify-email", sendReVerificationToken);
router.post("/forget-password", generateForgetPasswordLink);
router.post("/verify-pass-reset-token", validate(TokenAndIdValidation), isValidPassResetToken, grantValid);
router.post("/update-password", validate(UpdatePasswordSchema), isValidPassResetToken, updatePassword);
router.post("/sign-in", validate(SignInValidationSchema), signIn);



router.get("/is-auth", mustAuth, (req, res) => {

    res.json({ user: req.user });
});

router.get("/public", (req, res) => {

    res.json({ message: "You are in a publci route" });
});


router.get("/private", mustAuth, (req, res) => {

    res.json({ message: "You are in a private route" });
});

export default router;
