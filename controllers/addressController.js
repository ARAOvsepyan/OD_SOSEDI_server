require('dotenv').config()

const { Op } = require("sequelize");
const ApiError = require('../error/ApiError');
const { getAddress } = require('../functions/abbreviation');
const { Addresses, City_districts, Cities, City_areas } = require('../models/models')

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

    async getDesired(req, res, next) {
        let {addresses} = req.body
        let address = decodeURI(addresses)

        var url = "https://cleaner.dadata.ru/api/v1/clean/address"; 

        var options = {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Token " + "844ced12ad72812592a1ae37bd5a2439912cd9eb",
                "X-Secret": "b1058d30261652205a4aff031155229463632889"
            },
            body: JSON.stringify([address])
        }

        let response = await fetch  (url, options)
        let json = await response.json();
        
        let addressArray = getAddress(json[0])

        const city_id = await Cities.findOne({attributes:['id'], where: {name: addressArray[0]}})
        const city_areas_id = await City_areas.findOne({attributes:['id'], where: {name: addressArray[1]}})
        const city_district_id = await City_districts.findOne({attributes:['id'], where: {name: addressArray[2]}})

        if (city_id === null)
            return res.status(200).json({})
        
        if (city_district_id === null)
            if (city_areas_id === null) 
            {
                const city = await Addresses.findOne({
                    attributes: ['link'],
                    where: { 
                    cityId: city_id.id                   
                    }, include: [
                        {
                            model: Cities,
                            attributes: ['name']
                        }
                    ]
                })

                return res.status(200).json(city)
            } else {
                const city = await Addresses.findOne({
                    attributes: ['link'],
                    where: { 
                    cityId: city_id.id                   
                    }, include: [
                        {
                            model: Cities,
                            attributes: ['name']
                        }
                    ]
                })

                const area = await Addresses.findOne({
                    attributes: ['link'],
                    where: { 
                        cityAreaId: city_areas_id.id                
                    }, include: [
                        {
                            model: City_areas,
                            attributes: ['abbreviation']
                        }
                    ]
                })
                
                const result = []
    
                return res.status(200).json(result.concat(city, area))
        } else {
            const city = await Addresses.findOne({
                attributes: ['link'],
                where: { 
                   cityId: city_id.id                   
                }, include: [
                    {
                        model: Cities,
                        attributes: ['name']
                    }
                ]
            })

            const area = await Addresses.findOne({
                attributes: ['link'],
                where: { 
                    cityAreaId: city_areas_id.id                
                 }, include: [
                     {
                        model: City_areas,
                        attributes: ['abbreviation']
                     }
                 ]
            })

            const district = await Addresses.findOne({
                attributes: ['link'],
                where: { 
                    cityDistrictId: city_district_id.id          
                 }, include: [
                     {
                        model: City_districts,
                        attributes: ['name']
                     }
                 ]
            })

            const result = []
    
            return res.status(200).json(result.concat(city, area, district))
        }
    }
}

module.exports = new AddressesController()