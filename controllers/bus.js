import express from 'express';
import BusSchema from '../models/Bus.js';
import DriverSchema from '../models/Driver.js';

const router = express.Router();

export const createBus = async (req, res) => {
  try {
    const {state, city, alpha, numPlate, driverNo} = req.body;

    // Check if the driver already exists based on driverNo
    let existingDriver = await DriverSchema.findOne({driverNo});

    // If the driver doesn't exist, create a new driver
    if (!existingDriver) {
      const newDriver = new DriverSchema({
        driverNo,
      });

      // Save the new driver to the database
      existingDriver = await newDriver.save();
    }

    // Check if the bus already exists based on driver and numPlate
    const existingBus = await BusSchema.findOne({
      driver: existingDriver._id,
      numPlate,
    });

    // If the bus doesn't exist, create a new bus and associate it with the driver
    if (!existingBus) {
      const bus = new BusSchema({
        state,
        city,
        alpha,
        numPlate,
        driver: existingDriver._id, // Associate the bus with the driver
        driverNo: existingDriver.driverNo, // Copy the driver number to the bus
      });

      // Save the new bus to the database
      await bus.save();

      // Update the driver's bus field with the bus ID
      existingDriver.bus = bus._id;
      await existingDriver.save();

      return res.status(201).json({
        success: true,
        data: bus,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: 'Bus with the same driver and numPlate already exists.',
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getBuses = async (req, res) => {
  try {
    const buses = await BusSchema.find();
    return res.status(200).json({
      success: true,
      data: buses,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const getBus = async (req, res) => {
  try {
    const bus = await BusSchema.findById(req.params.id);
    return res.status(200).json({
      success: true,
      data: bus,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export default router;
