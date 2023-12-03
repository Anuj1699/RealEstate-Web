import express from "express"
import { verifyToken } from "../utils/verifyUser.js";
import { updateUser,deleteUser,showUserListing} from './../controller/userController.js';

const router = express.Router();

router.put('/update/:id',verifyToken, updateUser);
router.delete('/delete/:id',verifyToken, deleteUser);
router.get('/listings/:id',verifyToken,showUserListing);

export default router;