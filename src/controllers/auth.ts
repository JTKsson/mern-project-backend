import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { assertDefined } from "../utils/assertDefined";

export const register = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    if (await User.findOne({ userName: username })) {
      return res.status(400).json({ message: "Username taken" });
    }

    const user = new User({ userName: username, password });
    await user.save();

    res.status(201).json({ username, id: user._id }); // json is a .send but with correctly formated data
  } catch (error) {
    res.status(500).json({message: "Internal Server Error"});
    console.log(error)
  }
};

export const logIn = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ userName: username }, "+password"); //nu vill vi ha lösenordet inläst, annars kan man inte logga in

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: "Wrong username or password" });
    }

    const secret = process.env.JWT_SECRET;
    assertDefined(secret)

    if (!secret) {
      throw Error("Missing JWT_SECRET");
    }

    const token = jwt.sign({ userId: user._id }, secret/*, {expiresIn: "1h"}*/);

    res.status(200).json({ token, username: user.userName, userID: user._id });
  } catch (error) {
    res.status(500).json({
      message: "Nåt gick fel bror",
    });
  }
};

//Refresh token function

    /*
    const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
    if (!secret) {
      throw Error("Missing REFRESH_TOKEN_SECRET");
    }
    const refreshToken = jwt.sign({ userId: user._id }, refreshTokenSecret , {expiresIn: "1d"});*/


export const profile = async (req: Request, res: Response) => {
  const {userId} = req

  const user = await User.findById(userId)

  if (!user) {
    console.log("User not found with id: ", userId)
    return res.status(404).json({message: "User not found"})
  }

  res.status(200).json({
    userName: user.userName
  })
}