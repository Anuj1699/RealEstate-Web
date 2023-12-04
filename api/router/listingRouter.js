import  express  from "express";
import  {verifyToken} from "../utils/verifyUser.js";
import { listing,deleteListing} from "../controller/listingController.js";

const router = express.Router();

router.post('/create', verifyToken,listing);
router.delete('/delete/:id', verifyToken,deleteListing);

export default router;