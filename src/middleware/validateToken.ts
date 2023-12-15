import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";


const validateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1]; //vi tar ut token genom authHeader genom att ta bort den främre delen av auth (Bearer)

  if (!token) {
    return res.status(401).json({ message: "No authenticated" });
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw Error("Missing JWT_SECRET");
  }

  jwt.verify(token, secret, async (err, decodedToken: any) => {
    if (err) {
      return res.status(403).json({ message: "Not authorized" });
    }

    if (!await User.exists({_id: decodedToken.userId})) {
      return res.status(403).json({message: "Not authorized"})
    }

    req.userId = decodedToken.userId;
    next();
  });
};

export default validateToken
