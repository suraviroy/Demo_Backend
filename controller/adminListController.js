import AdminSchema from "../model/adminSchema.js";
import moment from "moment-timezone";

export const adminregistration = async (req, res) => {
  try {
    const {
      name,
      phNumber,
      educationQualification,
      gender,
      idNumber,
    } = req.body;

    const desiredTimezone = "Asia/Kolkata"; 

    const currentDate = moment().tz(desiredTimezone).format('MMMM D, YYYY');
    const currentTime = moment().tz(desiredTimezone).format("hh:mm A");

    const newUser = await AdminSchema.create({
      name,
      phNumber,
      educationQualification,
      gender,
      idNumber,
      date: currentDate,
      time: currentTime,
    });

    res
      .status(200)
      .json({ message: "User created successfully", data: newUser });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "An error occurred while creating user" });
  }
};


export const adminList = async (req, res) => {
  try {

    const adminsArray = await AdminSchema.find();

    res.status(200).json({ adminsArray });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};


export const adminNames = async (req, res) => {
  try {
    const admins = await AdminSchema.find({}, "name");
    const adminNames = admins.map((admin) => admin.name);
    res.status(200).json(adminNames);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
