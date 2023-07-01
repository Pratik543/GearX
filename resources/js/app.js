import axios from "axios";
import Noty from "noty";
import { initAdmin } from "./admin";
import moment from "moment";

let addToCart = document.querySelectorAll(".add-to-cart");
let cartCounter = document.querySelector("#cartCounter");

function updateCart(gear) {
  // Make the HTTP POST request to update the cart
  axios
    .post("/update-cart", gear)
    .then((res) => {
      // console.log(res);
      cartCounter.innerText = res.data.totalQty;
      new Noty({
        type: "success",
        timeout: 2000,
        text: "Items added to cart",
        //   progressBar:false
        layout: "topCenter",
      }).show();
    })
    .catch((err) => {
      new Noty({
        type: "error",
        timeout: 3000,
        text: "Something went wrong",
        //   progressBar:false
        layout: "topCenter",
      }).show();
    });
}

addToCart.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    let gear = JSON.parse(btn.dataset.gears);
    updateCart(gear);
  });
});

// Rcmove alert message after X seconds
const alertMsg = document.querySelector("#success-alert");
if (alertMsg) {
  setTimeout(() => {
    alertMsg.remove();
  }, 4000);
}

initAdmin();

// change order status
let statuses = document.querySelectorAll(".status_line");
let hiddenInput = document.querySelector("#hiddenInput");
let order = hiddenInput ? hiddenInput.value : null;
order = JSON.parse(order);
let time = document.createElement("small");

function updateStatus(order) {
  statuses.forEach((status) => {
    status.classList.remove("step-completed");
    status.classList.remove("current");
  });
  let stepCompleted = true;
  statuses.forEach((status) => {
    let dataProp = status.dataset.status;
    if (stepCompleted) {
      status.classList.add("step-completed");
    }
    if (dataProp === order.status) {
      stepCompleted = false;
      time.innerText = moment(order.updatedAt).format("hh:mm A");
      status.appendChild(time);
      if (status.nextElementSibling) {
        status.nextElementSibling.classList.add("current");
      }
    }
  });
}

updateStatus(order);
