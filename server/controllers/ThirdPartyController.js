const axios = require('axios');

class ThirdPartyController {
  static getdata(req, res, next) {
    let country = req.params.country;

    axios
      .get('https://api.covid19api.com/summary')
      .then(function (response) {
        let data = {};
        for (let i = 0; i < response.data.Countries.length; i++) {
          if (response.data.Countries[i].Country === country) {
            data = response.data.Countries[i];
          }
        }
        res.status(200).json(data);
      })
      .catch(function (error) {
        next(error);
      });
  }

  static getweather(req, res, next) {
    const api_key = '8a5e195dbb18424f950170902201106';
    const city = req.headers.city;

    axios
      .get(`http://api.weatherapi.com/v1/current.json?key=${api_key}&q=${city}`)
      .then(function (response) {
        res.status(200).json(response.data);
      })
      .catch(function (error) {
        next(error);
      });
  }

  static getPlaceInfo(req, res, next) {
    const city = req.params.city;
    console.log(city);
    axios({
      method: 'GET',
      url: 'https://tripadvisor1.p.rapidapi.com/locations/search',
      headers: {
        'content-type': 'application/octet-stream',
        'x-rapidapi-host': 'tripadvisor1.p.rapidapi.com',
        'x-rapidapi-key': '6b076d3b2bmsh7c1d20c30386137p159568jsna1368603bcf7',
        useQueryString: true,
      },
      params: {
        location_id: '1',
        limit: '30',
        sort: 'relevance',
        offset: '0',
        lang: 'en_US',
        currency: 'USD',
        units: 'km',
        query: city,
      },
    })
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((error) => {
        next(error);
      });
  }
}

module.exports = ThirdPartyController;
