// var price = require("./Buy.js");

// price = price.price;

// // Create a Checkout Session with the selected quantity
// var createCheckoutSession = function () {
//   return fetch("http://localhost:3006/app/payment/create-checkout-session", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       amount: price,
//     }),
//   }).then(function (result) {
//     return result.json();
//   });
// };

// /* Get the accounts list, publishable key and base price */
// fetch("http://localhost:3006/app/payment/config")
//   .then(function (result) {
//     return result.json();
//   })
//   .then(function (json) {
//     // If setupAccounts returns false, there are no accounts that can process a payment, so we
//     // won't show the Checkout button.
//     // if (setupAccounts(json)) {
//     window.config = json;
//     var stripe = Stripe(config.publicKey);
//     // Setup event handler to create a Checkout Session on submit.
//     document.querySelector("#submit").addEventListener("click", function (evt) {
//       createCheckoutSession().then(function (data) {
//         stripe
//           .redirectToCheckout({
//             sessionId: data.sessionId,
//           })
//           .then(handleResult);
//       });
//     });
//     // }
//   });

// /* ------- Account list ------- */

// // Fetch 10 most recent accounts from the server. We'll display one of three states in the UI, depending on the
// // accounts list; (1) if you haven't created any accounts, we'll re-direct you to the onboarding guide, (2) if none of
// // of your accounts have charges enabled, we'll display instructions on how to finish the onboarding process, (3)
// // otherwise, we'll display a payment form, as a customer might see it.

// // Returns true if there are accounts available to process payments; otherwise returns false.
// // var setupAccounts = function (data) {
// //   var accounts = data.accounts.data;

// //   // If there are no accounts, display a message pointing to an onboarding guide.
// //   if (!accounts.length) {
// //     document.querySelector("#no-accounts-section").classList.remove("hidden");
// //     return false;
// //   }

// //   var enabledAccounts = accounts.filter((acct) => acct.charges_enabled);

// //   // If no accounts are enabled, display instructions on how to enable an account. In an actual
// //   // application, you should only surface Express dashboard links to your connected account owners,
// //   // not to their customers.
// //   if (!enabledAccounts.length) {
// //     var expressAccounts = accounts.filter((acct) => acct.type == "express");
// //     var hasCustom = !!accounts.filter((acct) => acct.type == "custom");
// //     var hasStandard = !!accounts.filter((acct) => acct.type == "standard");

// //     var wrapper = document.querySelector("#disabled-accounts-section");
// //     var input = document.querySelector("#disabled-accounts-select");
// //     expressAccounts.forEach((acct) => {
// //       var element = document.createElement("option");
// //       element.setAttribute("value", acct.id);
// //       element.innerHTML = acct.email || acct.id;
// //       input.appendChild(element);
// //     });
// //     // Remove the hidden CSS class on one of the sections with instruction on how to finish onboarding
// //     // for a given account type.
// //     if (!!expressAccounts) {
// //       document
// //         .querySelector("#disabled-accounts-form")
// //         .classList.remove("hidden");
// //       wrapper.querySelector(".express").classList.remove("hidden");
// //     } else if (hasCustom) {
// //       wrapper.querySelector(".custom").classList.remove("hidden");
// //     } else if (hasStandard) {
// //       wrapper.querySelector(".standard").classList.remove("hidden");
// //     }
// //     wrapper.classList.remove("hidden");
// //     return false;
// //   }

// //   // If at least one account is enabled, show the account selector and payment form.
// //   var wrapper = document.querySelector("#enabled-accounts-section");
// //   var input = document.querySelector("#enabled-accounts-select");
// //   enabledAccounts.forEach((acct) => {
// //     var element = document.createElement("option");
// //     element.setAttribute("value", acct.id);
// //     element.innerHTML = acct.email || acct.id;
// //     input.appendChild(element);
// //   });
// //   wrapper.classList.remove("hidden");
// //   return true;
// // };

// /* ------- Express dashboard ------- */

// // When no accounts are enabled, this sample provides a way to log in as
// // an Express account to finish the onboarding process. Here, we set up
// // the event handler to construct the Express dashboard link.
// expressDashboardForm = document.querySelector("#disabled-accounts-form");
// expressDashboardForm.addEventListener(
//   "submit",
//   (event) => {
//     event.preventDefault();
//     button = expressDashboardForm.querySelector("button");
//     button.setAttribute("disabled", "disabled");
//     button.textContent = "Opening...";

//     var url = new URL("/express-dashboard-link", document.baseURI);
//     params = {
//       account_id: document.querySelector("#disabled-accounts-select").value,
//     };
//     url.search = new URLSearchParams(params).toString();

//     fetch(url, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         if (data.url) {
//           window.location = data.url;
//         } else {
//           elmButton.removeAttribute("disabled");
//           elmButton.textContent = "<Something went wrong>";
//           console.log("data", data);
//         }
//       });
//   },
//   false
// );

// The max and min number of items a customer can purchase
var MIN_ITEMS = 1;
var MAX_ITEMS = 10;

document
  .getElementById("quantity-input")
  .addEventListener("change", function (evt) {
    // Ensure customers only buy between 1 and 10 items
    if (evt.target.value < MIN_ITEMS) {
      evt.target.value = MIN_ITEMS;
    }
    if (evt.target.value > MAX_ITEMS) {
      evt.target.value = MAX_ITEMS;
    }
  });

/* Method for changing the product quantity when a customer clicks the increment / decrement buttons */
var updateQuantity = function (evt) {
  if (evt && evt.type === "keypress" && evt.keyCode !== 13) {
    return;
  }

  var isAdding = evt && evt.target.id === "add";
  var inputEl = document.getElementById("quantity-input");
  var currentQuantity = parseInt(inputEl.value);

  document.getElementById("add").disabled = false;
  document.getElementById("subtract").disabled = false;

  // Calculate new quantity
  var quantity = evt
    ? isAdding
      ? currentQuantity + 1
      : currentQuantity - 1
    : currentQuantity;
  // Update number input with new value.
  inputEl.value = quantity;
  var amount = config.basePrice / 100;
  var total = (quantity * amount).toFixed(2);

  document.getElementById("submit").textContent = `Complete payment $${total}`;

  // Disable the button if the customers hits the max or min
  if (quantity === MIN_ITEMS) {
    document.getElementById("subtract").disabled = true;
  }
  if (quantity === MAX_ITEMS) {
    document.getElementById("add").disabled = true;
  }
};

/* Attach method */
Array.from(document.getElementsByClassName("increment-btn")).forEach(
  (element) => {
    element.addEventListener("click", updateQuantity);
  }
);

/* Handle any errors returns from Checkout  */
var handleResult = function (result) {
  if (result.error) {
    var displayError = document.getElementById("error-message");
    displayError.textContent = result.error.message;
  }
};

// Create a Checkout Session with the selected quantity
var createCheckoutSession = function () {
  var inputEl = document.getElementById("quantity-input");
  var quantity = parseInt(inputEl.value);

  return fetch("/create-checkout-session", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      quantity: quantity,
      // The account selected in the UI and the one that we'll pass as the
      // transfer_data destination on the server side.
      account: document.querySelector("#enabled-accounts-select").value,
    }),
  }).then(function (result) {
    return result.json();
  });
};

/* Get the accounts list, publishable key and base price */
fetch("/config")
  .then(function (result) {
    return result.json();
  })
  .then(function (json) {
    // If setupAccounts returns false, there are no accounts that can process a payment, so we
    // won't show the Checkout button.
    if (setupAccounts(json)) {
      window.config = json;
      var stripe = Stripe(config.publicKey);
      updateQuantity();
      // Setup event handler to create a Checkout Session on submit.
      document
        .querySelector("#submit")
        .addEventListener("click", function (evt) {
          createCheckoutSession().then(function (data) {
            stripe
              .redirectToCheckout({
                sessionId: data.sessionId,
              })
              .then(handleResult);
          });
        });
    }
  });

/* ------- Account list ------- */

// Fetch 10 most recent accounts from the server. We'll display one of three states in the UI, depending on the
// accounts list; (1) if you haven't created any accounts, we'll re-direct you to the onboarding guide, (2) if none of
// of your accounts have charges enabled, we'll display instructions on how to finish the onboarding process, (3)
// otherwise, we'll display a payment form, as a customer might see it.

// Returns true if there are accounts available to process payments; otherwise returns false.
var setupAccounts = function (data) {
  document.querySelector(".spinner").classList.add("hidden");

  var accounts = data.accounts.data;

  // If there are no accounts, display a message pointing to an onboarding guide.
  if (!accounts.length) {
    document.querySelector("#no-accounts-section").classList.remove("hidden");
    return false;
  }

  var enabledAccounts = accounts.filter((acct) => acct.charges_enabled);

  // If no accounts are enabled, display instructions on how to enable an account. In an actual
  // application, you should only surface Express dashboard links to your connected account owners,
  // not to their customers.
  if (!enabledAccounts.length) {
    var expressAccounts = accounts.filter((acct) => acct.type == "express");
    var hasCustom = !!accounts.filter((acct) => acct.type == "custom");
    var hasStandard = !!accounts.filter((acct) => acct.type == "standard");

    var wrapper = document.querySelector("#disabled-accounts-section");
    var input = document.querySelector("#disabled-accounts-select");
    expressAccounts.forEach((acct) => {
      var element = document.createElement("option");
      element.setAttribute("value", acct.id);
      element.innerHTML = acct.email || acct.id;
      input.appendChild(element);
    });
    // Remove the hidden CSS class on one of the sections with instruction on how to finish onboarding
    // for a given account type.
    if (!!expressAccounts) {
      document
        .querySelector("#disabled-accounts-form")
        .classList.remove("hidden");
      wrapper.querySelector(".express").classList.remove("hidden");
    } else if (hasCustom) {
      wrapper.querySelector(".custom").classList.remove("hidden");
    } else if (hasStandard) {
      wrapper.querySelector(".standard").classList.remove("hidden");
    }
    wrapper.classList.remove("hidden");
    return false;
  }

  // If at least one account is enabled, show the account selector and payment form.
  var wrapper = document.querySelector("#enabled-accounts-section");
  var input = document.querySelector("#enabled-accounts-select");
  enabledAccounts.forEach((acct) => {
    var element = document.createElement("option");
    element.setAttribute("value", acct.id);
    element.innerHTML = acct.email || acct.id;
    input.appendChild(element);
  });
  wrapper.classList.remove("hidden");
  return true;
};

/* ------- Express dashboard ------- */

// When no accounts are enabled, this sample provides a way to log in as
// an Express account to finish the onboarding process. Here, we set up
// the event handler to construct the Express dashboard link.
expressDashboardForm = document.querySelector("#disabled-accounts-form");
expressDashboardForm.addEventListener(
  "submit",
  (event) => {
    event.preventDefault();
    button = expressDashboardForm.querySelector("button");
    button.setAttribute("disabled", "disabled");
    button.textContent = "Opening...";

    var url = new URL("/express-dashboard-link", document.baseURI);
    params = {
      account_id: document.querySelector("#disabled-accounts-select").value,
    };
    url.search = new URLSearchParams(params).toString();

    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.url) {
          window.location = data.url;
        } else {
          elmButton.removeAttribute("disabled");
          elmButton.textContent = "<Something went wrong>";
          console.log("data", data);
        }
      });
  },
  false
);
