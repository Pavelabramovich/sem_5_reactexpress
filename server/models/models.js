const sequelize = require('../db');
const {DataTypes} = require('sequelize');

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},  //is: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/}
    login: {type: DataTypes.STRING, unique: true, validate: { //len: [1, 20]
        validateLogin: function(value) {
            if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) {
               throw new Error('Incorrect email format');
            }
         }
    }},
    password: {type: DataTypes.STRING}
});

const Role = sequelize.define('role', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true},    
});

const Product = sequelize.define('product', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true},    
    description: {type: DataTypes.STRING, allowNull: false},    
    price: {type: DataTypes.INTEGER, allowNull: false},
    img: {type: DataTypes.STRING, allowNull: false},
});

const Category = sequelize.define('category', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true},    
});

Category.hasMany(Product);
Product.belongsTo(Category);

Role.hasMany(User);
User.belongsTo(Role);


module.exports = {
    User,
    Role,
    Product,
    Category
}
