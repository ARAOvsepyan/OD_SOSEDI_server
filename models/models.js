const sequelize = require('../db')
const {DataTypes} = require('sequelize')
const { Sequelize } = require('../db')

const Addresses = sequelize.define('addresses', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    link: {type: DataTypes.STRING},
    request_count: {type: DataTypes.INTEGER, defaultValue: 0}
})

const Cities = sequelize.define('cities', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true},
})

const City_areas = sequelize.define('city_areas', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true},
})

const City_districts = sequelize.define('city_districts', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true},
})

const Failed_jobs = sequelize.define('failed_jobs', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
	uuid: {type: DataTypes.STRING, unique: true},
    connection: {type: DataTypes.TEXT},
    queue: {type: DataTypes.TEXT},
    payload: {type: DataTypes.TEXT('long')},
    exception: {type: DataTypes.TEXT('long')},
    failed_at: {type: DataTypes.DATE, allowNull: false, defaultValue: Sequelize.fn('now')}
})

const News = sequelize.define('news', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    text: {type: DataTypes.TEXT('long'), allowNull: false},
    img: {type: DataTypes.STRING, allowNull: false},
    url: {type: DataTypes.STRING, allowNull: false},
})

const Settings = sequelize.define('settings', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    phone: {type: DataTypes.STRING},
    email: {type: DataTypes.STRING},
    telegram: {type: DataTypes.STRING},
    youtube: {type: DataTypes.STRING},
    whatsapp: {type: DataTypes.STRING},
    vk: {type: DataTypes.STRING},
})

const Users = sequelize.define('users', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    login: {type: DataTypes.STRING, allowNull: false},
    password: {type: DataTypes.TEXT('long'), allowNull: false},
})

Cities.hasMany(Addresses)
Addresses.belongsTo(Cities)

City_areas.hasMany(Addresses)
Addresses.belongsTo(City_areas)

City_districts.hasMany(Addresses)
Addresses.belongsTo(City_districts)

module.exports = {
    Addresses,
    Cities,
    City_areas,
    City_districts,
    Failed_jobs,
    News,
    Settings,
    Users
}