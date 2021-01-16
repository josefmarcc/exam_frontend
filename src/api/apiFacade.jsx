import SERVER_URL from "../util/Settings";

function getHotels() {
  return fetch(SERVER_URL)
    .then(handleHttpErrors)
    .catch((err) => {
      if (err.status) {
        err.fullError.then((e) => console.log(e.message));
      } else {
        console.log("Network error");
      }
    });
}

function getHotelByID(id) {
  return fetch(SERVER_URL + id)
    .then(handleHttpErrors)
    .catch((err) => {
      if (err.status) {
        err.fullError.then((e) => console.log(e.message));
      } else {
        console.log("Network error");
      }
    });
}

function makeBooking(user, hotel, days, price) {
  const options = makeOptions("POST", true, {
    userName: user,
    hotel: hotel,
    days: days,
    price: price,
  });
  return fetch(SERVER_URL, options).then(handleHttpErrors);
}

const apiFacade = {
  getHotels,
  getHotelByID,
  makeBooking,
};

function makeOptions(method, body) {
  var opts = {
    method: method,
    headers: {
      "Content-type": "application/json",
      Accept: "application/json",
    },
  };
  if (body) {
    opts.body = JSON.stringify(body);
  }
  return opts;
}

function handleHttpErrors(res) {
  if (!res.ok) {
    return Promise.reject({ status: res.status, fullError: res.json() });
  }
  return res.json();
}

export default apiFacade;
