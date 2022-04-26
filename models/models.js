const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const Admin = sequelize.define('admin', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true,},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
})

const Message = sequelize.define('message', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    firs_name: {type: DataTypes.STRING},
    last_name: {type: DataTypes.STRING},
    email: {type: DataTypes.STRING},
    telephone: {type: DataTypes.STRING},
    message_info: {type: DataTypes.TEXT, allowNull: false},
    isRead: {type: DataTypes.BOOLEAN, defaultValue: false}
})

const Adress = sequelize.define('adress', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true},
    link: {type: DataTypes.STRING, unique: true},
    counter: {type: DataTypes.INTEGER, defaultValue: 0}
})

const Blog = sequelize.define('blog', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    main_text: {type: DataTypes.TEXT, allowNull: false},
    img: {type: DataTypes.STRING, allowNull: false}
})

module.exports = {
    Adress,
    Blog,
    Admin,
    Message
}