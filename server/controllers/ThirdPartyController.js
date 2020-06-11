const axios = require('axios')

class ThirdPartyController {

    static getdata(req, res, next){
    let country = req.params.country

        axios.get('https://api.covid19api.com/summary')
          .then(function (response) {
              let data ={}
              for(let i=0;i<response.data.Countries.length;i++){
                  if(response.data.Countries[i].Country === country){
                      data = response.data.Countries[i]
                    }
                }   
            res.status(200).json(data)
          })
          .catch(function (error) {
            next(error)
          }) 
    }

}   

module.exports = ThirdPartyController