const db = require('../configurations/db');

exports.CreateRestaurant = (newRestaurant) => {
    return new Promise((resolve, reject) => {
        const query =
        'INSERT INTO restaurant (name,address,createdAt,updatedAt) VALUES (?,?,?,?)';
        db.query(
            query,
            [
                newRestaurant.name,
                newRestaurant.address,
                newRestaurant.createdAt,
                newRestaurant.updatedAt,
            ],
            (err, results) => {
                if (err) {
                    return reject(err);
                }
                return resolve(results);
            }
        );
    })
}
exports.UpdateRestaurant = (newRestaurant, id) => {
    return new Promise((resolve, reject) => {
        const query =
            'Update restaurant set name=?,address=?,createdAt=?, updatedAt=?  WHERE  id=' + id;
        db.query(
            query,
            [
                newRestaurant.name,
                newRestaurant.address,
                newRestaurant.createdAt,
                newRestaurant.updatedAt,
            ],
            (err, results) => {
                if (err) {
                    return reject(err);
                }
                return resolve(results);
            }
        );
    })
}
exports.GetRestaurants = () => {
    return new Promise((resolve, reject) => {
        const query = 'Select * from restaurant';
        db.query(
            query,
            (err, results) => {
                if (err) {
                    return reject(err);
                }
                return resolve(results);
            }
        );
    })
}
exports.DeleteRestaurants = (id) => {
    return new Promise((resolve, reject) => {
        const query = 'Delete from restaurant WHERE  id=' + id;
        db.query(
            query,
            (err, results) => {
                if (err) {
                    return reject(err);
                }
                return resolve(results);
            }
        );
    })
}