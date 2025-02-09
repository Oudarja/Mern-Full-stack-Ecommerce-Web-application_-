import userModel from "../models/userModel.js";
import { hashPassword } from "./helpers/authHelper.js";
import { comparePassword } from "./helpers/authHelper.js";
import JWT from "jsonwebtoken";

// asynchronous means that your program can
// initiate a task, move on to other work, and
// later return to that task when it’s finished.
// This is essential for building responsive, efficient
//  applications, particularly when dealing with operations
//  that involve waiting for something to complete
//  (like file operations or network requests).

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address, answer } = req.body;

    //validations

    if (!name) {
      return res.send({ message: "Name is Required" });
    }
    if (!email) {
      return res.send({ message: "Email is required" });
    }

    if (!password) {
      return res.send({ message: "password is required" });
    }

    if (!phone) {
      return res.send({ message: "Phone no is required" });
    }

    if (!address) {
      return res.send({ message: "Address is required" });
    }

    if (!answer) {
      return res.send({ message: "Answer is required" });
    }

    //existing user if any then why registration !!!!

    const existingUser = await userModel.findOne({ email });
    //existing user

    if (existingUser) {
      return res.staus(200).send({
        success: false,
        message: "Already Register please login",
      });
    }

    //register user

    const hashedPassword = await hashPassword(password);
    //save
    // same spelling of user model property
    const user = await new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
      answer,
    }).save();

    res.status(201).send({
      success: true,
      message: "User Register Successfully",
      // user is passed
      user,
    });
  } catch (message) {
    console.log(message);
    res.status(500).send({
      success: false,
      message: "Error in Registration",
      message,
    });
  }
};

// POST LOGIN

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    //validation

    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    } else {
      //"filter" to findOne() must be an object and in js object is expressed with {}
      const user = await userModel.findOne({ email });

      //check user
      if (!user) {
        return res.status(404).send({
          success: false,
          message: "Email is not registered",
        });
      }

      const match = await comparePassword(password, user.password);

      if (!match) {
        return res.status(200).send({
          success: false,
          message: "Invalid password",
        });
      }

      //token
      //token is created using sign
      //secret key is passed
      const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      res.status(200).send({
        success: true,
        message: "login successfully",
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          address: user.address,
          role: user.role,
        },
        //token is also returned
        token,
      });
    }
  } catch (message) {
    console.log(message);
    res.status(500).send({
      success: false,
      message: "Error in log in",
      // message object is passed
      message,
    });
  }
};

//forgotpasswordController

export const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;

    if (!email) {
      res.status(400).send({
        message: "Email is required",
      });
    }

    if (!answer) {
      res.status(400).send({ message: "answer is required" });
    }

    if (!newPassword) {
      res.status(400).send({
        message: "New password is required",
      });
    }
    //check
    const user = await userModel.findOne({ email, answer });
    //validation

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "wrong Email Or Answer",
      });
    }

    const hashed = await hashPassword(newPassword);

    await userModel.findByIdAndUpdate(user._id, { password: hashed });

    res.status(200).send({
      success: true,
      message: "password Reset Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "something went wrong",
      error,
    });
  }
};

//test controller

export const testController = (req, res) => {
  res.send("Protected route");
};

//update profile

// Retrieves the updated profile information sent from the client
//in the request body.
export const updateProfileController = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;
    // This line fetches the user document from the database using
    // the _id obtained from req.user.

    /*
      req.user._id is set by middleware, typically an authentication 
      middleware, as part of request processing. The middleware validates
      the user's token, retrieves their ID, and attaches the user information
      to req.user.
    */
    const user = await userModel.findById(req.user._id);

    //password

    //updated password can not be less than 6 character
    /*
    If the password is provided, it hashes the new password using 
    a utility function hashPassword. Otherwise, it leaves the password
    unchanged.
    */

    if (password && password.length < 6) {
      return res.json({ error: "Password is required and 6 character long" });
    }

    const hashedPassword = password ? await hashPassword(password) : undefined;

    // The new: true option ensures the function returns the updated user document.
    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: hashedPassword || user.password,
        phone: phone || user.phone,
        address: address || user.address,
      },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "Profile Updated Successfully",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error while updating profile",
      error,
    });
  }
};
