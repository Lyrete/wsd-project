import { Router } from "../deps.js";
import { showForm, processForm } from "./controllers/registerController.js";
import { showLogin, processLogin } from "./controllers/authController.js";
import { showForms, processReport } from "./controllers/reportController.js";

const router = new Router();

router.get('/auth/registration', showForm);
router.post('/auth/registration', processForm);
router.get('/auth/login', showLogin);
router.post('/auth/login', processLogin);
router.get('/behavior/reporting', showForms);
router.post('/behavior/reporting', processReport);

export { router };