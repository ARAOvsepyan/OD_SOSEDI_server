require('dotenv').config()

const { getAdress } = require('../functions/abbreviation');

const { Addresses } = require('../models/models')

const fetch = (...args) =>
import('node-fetch').then(({ default: fetch }) => fetch(...args));

class AddressesController {
    async create_address(req, res) {
        
    }

    async create_city(req, res) {

    }

    async create_city_area(req, res) {

    }

    async create_city_district(req, res) {
        
    }

    async getDesired(req, res) {
        let {adress} = req.query
        adress = decodeURI(adress)

        var url = "https://cleaner.dadata.ru/api/v1/clean/address"; 

        var options = {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Token " + "844ced12ad72812592a1ae37bd5a2439912cd9eb",
                "X-Secret": "b1058d30261652205a4aff031155229463632889"
            },
            body: JSON.stringify([adress])
        }

        let response = await fetch  (url, options)
        let json = await response.json();
        
        let adressArray = getAdress(json[0])

        return res.json()
    }
}

module.exports = new AddressesController()