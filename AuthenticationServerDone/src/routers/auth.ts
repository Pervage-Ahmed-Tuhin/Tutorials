import { create, generateForgetPasswordLink, grantValid, sendReVerificationToken, updatePassword, verifyEmail } from "#/controllers/user";
import { isValidPassResetToken } from "#/middleware/auth";
import { validate } from "#/middleware/validator";
import { CreateUserSchema, TokenAndIdValidation, UpdatePasswordSchema } from "#/utils/validationSchema";
import { Router } from "express";

const router = Router();

router.post('/create', validate(CreateUserSchema), create);


router.post("/verify-email", validate(TokenAndIdValidation), verifyEmail);
router.post("/re-verify-email", sendReVerificationToken);
router.post("/forget-password", generateForgetPasswordLink);
router.post("/verify-pass-reset-token", validate(TokenAndIdValidation), isValidPassResetToken, grantValid);
router.post("/update-password", validate(UpdatePasswordSchema), isValidPassResetToken, updatePassword);

export default router;
