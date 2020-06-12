# API DOCUMENTATION

# METHOD 4 (POST, GET, POST, DELETE)

LIST ENDPOINTS:
- `POST /todos`
- `GET /todos`
- `GET /todos/:id`
- `PUT /todos/:id`
- `DELETE /todos/:id`

### POST /register : http://localhost:3000/register/

Request: 
body: 

```json
{
    "email" : "lianda@student.com",
    "password" : "student"
}
```

Response: 

```json
    {
        "id": 1,
        "email" : "lianda@student.com"
    }
```

### POST /login : http://localhost:3000/login/
Request:
body: 

```json
{
    "email" : "lianda@student.com",
    "password" : "student"
}
```

Response: 

```json
    {
        "access_token" : "$2b$10$uFMGVy49VwHACIJofMHi5u7UPzKSQLo03Fz7gZlSG93LDsjBtCmV."
    }
```


### GET /third-apis/getdata/:country : http://localhost:3000/third-apis/getdata/:country/

Request:
params:

```json
{
    "params" : "Indonesia"
}
```

Response: 

```json
{
    "Country": "Indonesia",
    "CountryCode": "ID",
    "Slug": "indonesia",
    "NewConfirmed": 106,
    "TotalConfirmed": 2092,
    "NewDeaths": 10,
    "TotalDeaths": 191,
    "NewRecovered": 16,
    "TotalRecovered": 150,
    "Date": "2020-04-05T06:37:00Z"
}
```

### GET /third-apis/getdata/:country : http://localhost:3000/third-apis/getdata/:country/

Request:
params:

```json
{
    "params" : "Indonesia"
}
```

Response: 

```json
{
    "Country": "Indonesia",
    "CountryCode": "ID",
    "Slug": "indonesia",
    "NewConfirmed": 106,
    "TotalConfirmed": 2092,
    "NewDeaths": 10,
    "TotalDeaths": 191,
    "NewRecovered": 16,
    "TotalRecovered": 150,
    "Date": "2020-04-05T06:37:00Z"
}
```

### GET /third-apis/getweather/:city : http://localhost:3000/third-apis/getdata/:city/

Request:
params:

```json
{
    "params" : "Jakarta"
}
```

Response: 

```json
{
    "location": {
        "name": "Jakarta",
        "region": "Jakarta Raya",
        "country": "Indonesia",
        "lat": -6.21,
        "lon": 106.85,
        "tz_id": "Asia/Jakarta",
        "localtime_epoch": 1591942725,
        "localtime": "2020-06-12 13:18"
    },
    "current": {
        "last_updated_epoch": 1591942507,
        "last_updated": "2020-06-12 13:15",
        "temp_c": 33.0,
        "temp_f": 91.4,
        "is_day": 1,
        "condition": {
            "text": "Partly cloudy",
            "icon": "//cdn.weatherapi.com/weather/64x64/day/116.png",
            "code": 1003
        },
        "wind_mph": 9.4,
        "wind_kph": 15.1,
        "wind_degree": 20,
        "wind_dir": "NNE",
        "pressure_mb": 1006.0,
        "pressure_in": 30.2,
        "precip_mm": 0.0,
        "precip_in": 0.0,
        "humidity": 53,
        "cloud": 50,
        "feelslike_c": 37.6,
        "feelslike_f": 99.7,
        "vis_km": 6.0,
        "vis_miles": 3.0,
        "uv": 10.0,
        "gust_mph": 10.5,
        "gust_kph": 16.9
    }
}
```

### GET /third-apis/getPlaceInfo/:city : http://localhost:3000/third-apis/getPlaceInfo/:city/

Request:
headers: 

```json
{
    "host" : "tripadvisor1.p.rapidapi.com",
    "api_key" : "api key",
}
```

params:

```json
{
    "params" : "Pattaya"
}
```

Response: 

```json
[
  {
    "result_type": "geos",
    "result_object": {
      "location_id": "293919",
      "name": "Pattaya",
      "latitude": "12.93439",
      "longitude": "100.8979",
      "num_reviews": "298715",
      "timezone": "Asia/Bangkok",
      "location_string": "Pattaya, Chonburi Province",
      "photo": {
        "images": {
          "small": {
            "width": "150",
            "url": "https://media-cdn.tripadvisor.com/media/photo-l/15/33/fb/5c/pattaya.jpg",
            "height": "150"
          },
          "thumbnail": {
            "width": "50",
            "url": "https://media-cdn.tripadvisor.com/media/photo-t/15/33/fb/5c/pattaya.jpg",
            "height": "50"
          },
          "original": {
            "width": "3030",
            "url": "https://media-cdn.tripadvisor.com/media/photo-o/15/33/fb/5c/pattaya.jpg",
            "height": "592"
          },
          "large": {
            "width": "550",
            "url": "https://media-cdn.tripadvisor.com/media/photo-s/15/33/fb/5c/pattaya.jpg",
            "height": "107"
          },
          "medium": {
            "width": "250",
            "url": "https://media-cdn.tripadvisor.com/media/photo-f/15/33/fb/5c/pattaya.jpg",
            "height": "49"
          }
        },
        "is_blessed": false,
        "uploaded_date": "2018-10-30T14:15:46-0400",
        "caption": "",
        "id": "355728220",
        "helpful_votes": "6",
        "published_date": "2018-10-30T14:15:46-0400",
        "user": null
      },
      "awards": [],
      "doubleclick_zone": "as.thailand.pattaya",
      "preferred_map_engine": "default",
      "geo_type": "narrow",
      "category_counts": {
        "attractions": {
          "activities": "296",
          "attractions": "105",
          "nightlife": "83",
          "shopping": "66",
          "total": "550"
        },
        "restaurants": {
          "total": "1442"
        },
        "accommodations": {
          "hotels": "657",
          "bbs_inns": "981",
          "others": "849",
          "total": "2487"
        },
        "neighborhoods": "0",
        "airports": "0"
      },
      "nearby_attractions": [],
      "description": "",
      "web_url": "",
      "ancestors": [
        {
          "subcategory": [
            {
              "key": "province",
              "name": "Province"
            }
          ],
          "name": "Chonburi Province",
          "abbrv": null,
          "location_id": "2098164"
        },
        {
          "subcategory": [
            {
              "key": "country",
              "name": "Country"
            }
          ],
          "name": "Thailand",
          "abbrv": null,
          "location_id": "293915"
        }
      ],
      "category": {
        "key": "geographic",
        "name": "Geographic"
      },
      "subcategory": [
        {
          "key": "municipality",
          "name": "Municipality"
        }
      ],
      "is_jfy_enabled": false,
      "nearest_metro_station": [],
      "geo_description": "A visit to Pattaya is a wonderful way to explore the beaches along the Gulf of Thailand. Relaxed and family-friendly Jomtien Beach is a hot spot for watersports and seaside massages. The giant Buddha of Wat Khao Phra Bat keeps watch over the city, and the wooden Wang Boran Sanctuary of Truth pays homage to Buddhist and Hindu art and architecture.  At night, tons of bars and strip clubs attract an adults-only crowd.",
      "has_restaurant_coverpage": false,
      "has_attraction_coverpage": false,
      "has_curated_shopping_list": false
    },
    "scope": "local",
    "is_top_result": true
  }
]
```