import orderModel from "../models/orderModel.js";

export const placeOrderController = async (req, res) => {
  try {
    const { name, products, payment, buyer, address, email } = req.body;

    // Validate required fields
    if (!name || !products || !payment || !buyer || !address || !email) {
      return res.status(400).send({ message: "Missing required fields" });
    }

    // Create a new order
    const order = new orderModel({
      name,
      products,
      payment,
      buyer,
      address,
      email,
    });

    // Save the order to the database
    const savedOrder = await order.save();
    res
      .status(201)
      .send({ message: "Order placed successfully", order: savedOrder });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

export const getUserOrderController = async (req, res) => {
  try {
    const userId = req.params.id; // Extract user ID from route parameter
    const orders = await orderModel
      .find({ buyer: userId })
      .populate("products", "-photo");

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found for this user" });
    }

    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllOrderController = async (req, res) => {
  try {
    const orders = await orderModel
      .find()
      .populate("products", "-photo")
      .sort("-createdAt");

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found" });
    }

    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching all orders:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//order status

export const orderStatusController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const orders = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while updating order",
      error,
    });
  }
};
