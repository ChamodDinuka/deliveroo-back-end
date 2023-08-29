const db = require('../configurations/db');

exports.CreateUser = (newUser) => {
    return new Promise((resolve, reject) => {
        const query =
        'INSERT INTO user (first_name,last_name,role,email,password,createdAt,updatedAt) VALUES (?,?,?,?,?,?)';
        db.query(
            query,
            [
                newUser.first_name,
                newUser.last_name,
                newUser.email,
                newUser.role,
                newUser.password,
                newUser.createdAt,
                newUser.updatedAt,
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
exports.GetUser = (email) => {
    return new Promise((resolve, reject) => {
        const query = 'Select * from user WHERE  email=' + email;
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