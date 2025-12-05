import express, { Request, Response } from 'express';
import logger from '../../middlewere/middlewere';
import { userControllers } from './user.controller';
import auth from '../../middlewere/auth';

const router = express.Router();
// app.use("/users", userRoutes)
// routes -> controller -> service
router.post("/", logger, userControllers.createUser);
router.get("/", logger, auth(), userControllers.fetchUser)
router.get("/:id", auth(), userControllers.fetchSingelUser)
router.put("/:id", logger, auth(), userControllers.putUser);
router.delete("/:id", logger, auth(), userControllers.deletedUser);

export const userRoutes = router; 