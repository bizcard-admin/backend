const { razorpay } = require("../core/utils");
const depManager = require("../core/depManager");
const responser = require("../core/responser");

async function createOrder(req, res){

  const options = {
    amount: 100,
    currency: "INR",
    receipt: "receipt#1",
    partial_payment: false,
    payment_capture: 1
  };

  try {
    const order = await razorpay().orders.create(options);
    return responser.success(res, order, "SIGNATURE_S001");
  } catch (error) {
    console.log(error);
    return responser.success(res, null, "GLOBAL_E001");
  }
}

async function subscribe(req, res) {
  try {
    const userId = req.userId;
    const user = await depManager.USER.getUserModel().findById(userId);

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, plan } = req.body;

    const currentDate = new Date();
    const startAt = user.subscription ? user.subscription + 1 : currentDate.getTime();

    const endAt = getEndAtDate(currentDate, plan);

    const data = {
      userId,
      startAt,
      endAt,
      planId: plan.id,
      razorpay: {
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
        signature: razorpay_signature
      }
    };

    user.subscription = endAt;

    const [_, updated] = await Promise.all([
      depManager.SUBSCRIPTION.getSubscriptionModel().create(data),
      user.save()
    ]);

    return responser.success(res, updated, "SIGNATURE_S001");
  } catch (error) {
    console.error(error);
    return responser.success(res, null, "GLOBAL_E001");
  }
}

function getEndAtDate(currentDate, plan) {
  const daysToAdd = plan.type === "M" ? 30 : 365;
  const endAt = new Date(currentDate);
  endAt.setDate(currentDate.getDate() + daysToAdd);
  return endAt.getTime();
}


module.exports = {
  createOrder,
  subscribe
}