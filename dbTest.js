const mongoose = require('mongoose');
const { userInfo } = require('os');
const db = require('./models')
const User = db.User;

User.create({
    settings: {
        age: 35,
        weight: 150,
        height: 150,
        startTime: 900,
        endTime: 2200,
        reminderNumber: 13
    },
    hydroData: {
            date: 12-20-2020,
            progress: 100,
            weekday: "Monday"
    }
})

// User.update({ _id: "5fe0c9bf951bd290a89c7324"}, {$set: { hydroDate: {
//         "12-20-2020": {
//         progress: 50,
//         weekday: "Sunday"
//     }
// }}})

