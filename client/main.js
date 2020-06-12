const advices = $(document).ready(() => {
  $.ajax({
    async: true,
    crossDomain: true,
    url:
      'https://tripadvisor1.p.rapidapi.com/locations/search?location_id=1&limit=30&sort=relevance&offset=0&lang=en_US&currency=USD&units=km&query=pattaya',
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
        for (let advice of advices[`${category}`]) {
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
          } else {
          }
        }
      }
      console.log(advices);
    })
    .fail((error) => {
      console.log('Error get data from trip advisor', error);
    });
});
