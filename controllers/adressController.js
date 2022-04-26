require('dotenv').config()

const { response } = require('express');
const { getAdress } = require('../functions/abbreviation');
const {Adress} = require('../models/models')
const fetch = (...args) =>
import('node-fetch').then(({ default: fetch }) => fetch(...args));

class AdressController {
    // Создаие района и ссылки
    async create(req, res) {
        const {name, link} = req.body

        const adress = await Adress.create({name, link})

        return res.json(adress)
    }

    // Получение нужной ссылки по имени
    async getDesired(req, res) {
        let {adress} = req.query
        adress = decodeURI(adress)

        let res_adress = []

        var url = "https://cleaner.dadata.ru/api/v1/clean/address"; 

        var options = {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Token " + process.env.TOKEN_API,
                "X-Secret": process.env.SECRET_TOKEN_API
            },
            body: JSON.stringify([adress])
        }

        let response = await fetch  (url, options)
        let json = await response.json();
        
        let adressArrey = getAdress(json[0])

        const adresses_1 = await Adress.findOrCreate({
            attributes: ['name', 'link'],
            where: 
            {name: adressArrey[0]}
        })

        const adresses_2 = await Adress.findOrCreate({
            attributes: ['name', 'link'],
            where: 
            {name: adressArrey[1]}
        })

        const adresses_3 = await Adress.findOrCreate({
            attributes: ['name', 'link'],
            where: 
            {name: 
                adressArrey[2]}
        }) 

        res_adress = res_adress.concat(adresses_1, adresses_2, adresses_3)
        
        return res.json(res_adress)
    }
}

module.exports = new AdressController()