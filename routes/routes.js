import { Router } from "../deps.js";
import { showForm, processForm } from "./controllers/registerController.js";
import { showLogin, processLogin, logout } from "./controllers/authController.js";
import { showForms, processReport } from "./controllers/reportController.js";
import { showSummaryPage } from "./controllers/summaryController.js";
import { getSummary, getSummaryOfDay } from "./apis/api.js";
import { showIndex } from "./controllers/indexController.js";

const router = new Router();

router.get('/auth/registration', showForm);
router.post('/auth/registration', processForm);
router.get('/auth/login', showLogin);
router.post('/auth/login', processLogin);
router.get('/behavior/reporting', showForms);
router.post('/behavior/reporting', processReport);
router.get('/behavior/summary', showSummaryPage);
router.get('/api/summary', getSummary);
router.get('/api/summary/:year/:month/:day', getSummaryOfDay);
router.get('/',showIndex);
router.get('/auth/logout', logout);

export { router };