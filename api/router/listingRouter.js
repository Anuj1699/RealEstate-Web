import  express  from "express";
import  {verifyToken} from "../utils/verifyUser.js";
import { listing,deleteListing, editListing, getListing} from "../controller/listingController.js";

const router = express.Router();

router.post('/create', verifyToken,listing);
router.delete('/delete/:id', verifyToken,deleteListing);
router.put('/update/:id', verifyToken, editListing);
router.get('/get/:id',getListing);

export default router;