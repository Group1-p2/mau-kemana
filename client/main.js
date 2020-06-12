const baseUrl = 'http://localhost:3000/';

let city = 'Pattaya';
let country = '';

$(document).ready(function () {
  auth();
});

function auth() {
  if (localStorage.access_token) {
    getDataCovid();
    $('.login-page').hide();
    $('.home-page').show();
    $('.form-register').hide();
    $('.main-page').show();
  } else {
    $('.login-page').show();
    $('.home-page').hide();
    $('.form-register').hide();
    $('.main-page').hide();
  }
}

function formRegister() {
  $('.form-register').show();
  $('.home-page').hide();
  $('.login-page').hide();
}

function afterRegister() {
  $('.login-page').show();
  $('.home-page').hide();
  $('.form-register').hide();
}

function login(event) {
  event.preventDefault();
  let email = $('#email-login').val();
  let password = $('#password-login').val();
  $.ajax({
    method: 'post',
    url: baseUrl + 'login',
    data: {
      email,
      password,
    },
  })
    .done((data) => {
      localStorage.setItem('access_token', data.access_token);
      auth();
    })
    .fail((err) => {
      console.log(err.responseJSON.errors);
    })
    .always((_) => {
      $('#email-login').val();
      $('#password-login').val();
    });
}

function logout() {
  localStorage.clear();
  auth();
}

function onSignIn(googleUser) {
  let google_token = googleUser.getAuthResponse().id_token;
  $.ajax({
    method: 'post',
    url: baseUrl + 'googleSign',
    headers: {
      google_token,
    },
  })
    .done((data) => {
      localStorage.setItem('access_token', data.google_token);
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
  let email = $('#email-register').val();
  let password = $('#password-register').val();
  console.log(email, password, 'masuk function register');
  $.ajax({
    method: 'post',
    url: baseUrl + 'register',
    data: {
      email,
      password,
    },
  })
    .done((data) => {
      console.log(data);
      localStorage.setItem('access_token', data.access_token);
      afterRegister();
    })
    .fail((err) => {
      console.log(err.responseJSON.errors, ' ini error');
    });
}

function getDataCovid() {
  let country = 'Indonesia';
  $.ajax({
    method: 'get',
    url: baseUrl + `/third-APIs/getdata/${country}`,
    headers: {
      access_token: localStorage.access_token,
    },
  })
    .done((data) => {
      $('#TotalConfirmed').val(data.TotalConfirmed);
      $('#TotalDeaths').val(data.TotalDeaths);
      $('#TotalRecovered').val(data.TotalRecovered);
      console.log(data);
    })
    .fail((err) => {
      console.log(err.responseJSON.errors);
    });
}

function getweather(city) {
  $.ajax({
    method: 'get',
    url: `${baseUrl} third-APIs/getweather/${city}`,
  })
    .done((data) => {
      console.log(data);
    })
    .fail((err) => {
      console.log(err.responseJSON.errors);
    });
}

$.ajax({
  async: true,
  crossDomain: true,
  url: `https://tripadvisor1.p.rapidapi.com/locations/search?location_id=1&limit=30&sort=relevance&offset=0&lang=en_US&currency=USD&units=km&query=${city}`,
  method: 'GET',
  headers: {
    'x-rapidapi-host': 'tripadvisor1.p.rapidapi.com',
    'x-rapidapi-key': '6b076d3b2bmsh7c1d20c30386137p159568jsna1368603bcf7',
  },
})
  .done(({ data }) => {
    const advices = {
      geos: [],
      things_to_do: [],
      lodging: [],
      restaurants: [],
    };
    for (let advice of data) {
      if (advice.result_type == 'geos') {
        advices.geos.push(advice);
      } else if (advice.result_type == 'things_to_do') {
        advices.things_to_do.push(advice);
      } else if (advice.result_type == 'lodging') {
        advices.lodging.push(advice);
      } else if (advice.result_type == 'restaurants') {
        advices.restaurants.push(advice);
      }
    }

    for (const category in advices) {
      for (let [i, advice] of advices[`${category}`].entries()) {
        if (category == 'geos') {
          $(`#trip-advisor-${category}`).append(`
            <div class="jumbotron">
              <div class="jumbotron-text-container"> 
                <h1 class="display-4">Welcome to ${advice.result_object.name}!</h1>
                <p class="lead">
                  ${advice.result_object.geo_description}
                </p>
                <hr class="my-4" />
                <div class="sub-jumbotron">
                  <div>
                    <a class="btn btn-primary btn-lg" href="http://www.google.com/search?q=${advice.result_object.name}" role="button">Explore ${advice.result_object.name}!</a>
                  </div>
                  <div class="advice-category">
                    <p class="btn btn-outline-primary">#${advice.result_object.category.name}
                    </p>
                    <p class="btn btn-outline-primary">#${advice.result_object.subcategory[0].name}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          `);
          $('.jumbotron').css({
            'background-image': `url(${advice.result_object.photo.images.original.url})`,
          });
          city = advice.result_object.name;
          for (let ancestor of advice.result_object.ancestors) {
            if (ancestor.subcategory[0].key == 'country')
              country = ancestor.name;
          }
        } else if (
          category == 'restaurants' ||
          category == 'lodging' ||
          category == 'things_to_do'
        ) {
          $(`#trip-advisor-${category}`).append(`
            <div id="${category}-${i}" class="card">
                <img src="${advice.result_object.photo.images.small.url}" class="card-img-top" alt="">
                <div class="card-body">
                  <h5 class="card-title">${advice.result_object.name}</h5>
                  <p class="card-text">${advice.review_snippet.snippet}</p>
                </div>
                <div class="card-footer">
                  <small class="text-muted">${advice.result_object.address}</small>
                </div>
              </div>
            </div>
          `);
        }
        if (i > 4) break;
      }
    }
    $('#trip-advisor-things_to_do-title').text('Awesome attraction to watch');
    $('#trip-advisor-lodging-title').text('Classy hotels to rest');
    $('#trip-advisor-restaurants-title').text('Delicious foods for your meal');
  })
  .fail((error) => {
    console.log('Error get data from trip advisor', error);
  });
