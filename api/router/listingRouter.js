import  express  from "express";
import  {verifyToken} from "../utils/verifyUser.js";
import { listing } from "../controller/listingController.js";

const router = express.Router();

router.post('/create', verifyToken,listing);

export default router;