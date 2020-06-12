const baseUrl = "http://localhost:3000/";

$(document).ready(function () {
  auth();
});

function auth() {
  if (localStorage.access_token) {
    let country = "Indonesia";
    $("#country").val(country);
    getDataCovid(country);
    $(".login-page").hide();
    $(".home-page").show();
    $(".form-register").hide();
    $(".main-page").show();
  } else {
    $(".login-page").show();
    $(".home-page").hide();
    $(".form-register").hide();
    $(".main-page").hide();
  }
}

function formRegister() {
  $(".form-register").show();
  $(".home-page").hide();
  $(".login-page").hide();
}

function afterRegister() {
  $(".login-page").show();
  $(".home-page").hide();
  $(".form-register").hide();
}

function login(event) {
  event.preventDefault();
  let email = $("#email-login").val();
  let password = $("#password-login").val();
  $.ajax({
    method: "post",
    url: baseUrl + "login",
    data: {
      email,
      password,
    },
  })
    .done((data) => {
      localStorage.setItem("access_token", data.access_token);
      auth();
    })
    .fail((err) => {
      console.log(err.responseJSON.errors);
    })
    .always((_) => {
      $("#email-login").val();
      $("#password-login").val();
    });
}

function logout() {
  localStorage.clear();
  auth();
}

function onSignIn(googleUser) {
  let google_token = googleUser.getAuthResponse().id_token;
  $.ajax({
    method: "post",
    url: baseUrl + "googleSign",
    headers: {
      google_token,
    },
  })
    .done((data) => {
      localStorage.setItem("access_token", data.google_token);
      auth();
      var auth2 = gapi.auth2.getAuthInstance();
      auth2.disconnect();
    })
    .fail((err) => {
      // console.log(err)
      console.log(err.responseJSON.errors.msg);
      alert(err.responseJSON);
    });
}

function register(event) {
  event.preventDefault();
  let email = $("#email-register").val();
  let password = $("#password-register").val();
  console.log(email, password, "masuk function register");
  $.ajax({
    method: "post",
    url: baseUrl + "register",
    data: {
      email,
      password,
    },
  })
    .done((data) => {
      console.log(data);
      localStorage.setItem("access_token", data.access_token);
      afterRegister();
    })
    .fail((err) => {
      console.log(err.responseJSON.errors, " ini error");
    });
}

function getDataCovid(country) {
  $.ajax({
    method: "get",
    url: `${baseUrl}third-APIs/getdata/${country}`,
    headers: {
      access_token: localStorage.access_token,
    },
  })
    .done((data) => {
      console.log(data, data.TotalConfirmed);
      $("#TotalConfirmed").text(data.TotalConfirmed);
      $("#TotalDeaths").text(data.TotalDeaths);
      $("#TotalRecovered").text(data.TotalRecovered);
    })
    .fail((err) => {
      console.log(err);
      // console.log(err.responseJSON.errors)
    });
}

function getweather(city) {
  $.ajax({
    method: "get",
    url: `${baseUrl}third-APIs/getweather/${city}`,
  })
    .done((data) => {
      console.log(data);
    })
    .fail((err) => {
      console.log(err.responseJSON.errors);
    });
}

function searchDataCovid() {
  let country = $("#country").val();
  getDataCovid(country);
}
