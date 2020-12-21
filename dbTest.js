const mongoose = require('mongoose');
const { userInfo } = require('os');
const db = require('./models')
const User = db.User;
const Data = db.Data;


User.create({
    google_id: "97852464123",
    access_token: "asd4465sdfasd65",
    refresh_token: "as54d5sasa63a4g6d6h",
    id_token: "f4gd6ssd65as456fd",
    expiry_date: 0475,
    settings: {
        age: 35,
        weight: 150,
        height: 150,
        startTime: 900,
        endTime: 2200,
        reminderNumber: 13
    }
   
})

User.create({
    google_id: "1785434123",
    access_token: "asd44ert5sdfasd65",
    refresh_token: "bfr54d5sasa64g6reh",
    id_token: "7thd6ssd645rf56fd",
    expiry_date: 1075,
    settings: {
        age: 24,
        weight: 100,
        height: 110,
        startTime: 800,
        endTime: 2100,
        reminderNumber: 8
    }
   
})

User.create({
    google_id: "",
    access_token: "ghd46iysdfojd65",
    refresh_token: "ys53rtlksa63a4g6d6h",
    id_token: "1pgd6lk565awo56fd",
    expiry_date: 0155,
    settings: {
        age: 45,
        weight: 130,
        height: 170,
        startTime: 700,
        endTime: 2200,
        reminderNumber: 9
    }
   
})

User.create({
    google_id: "97875464123",
    access_token: "asd445eq39asd65",
    refresh_token: "rt852d5sasa63a4g6d6h",
    id_token: "pl059tsd65as456fd",
    expiry_date: 1275,
    settings: {
        age: 31,
        weight: 100,
        height: 120,
        startTime: 700,
        endTime: 2300,
        reminderNumber: 10
    }
   
})

User.create({
    google_id: "16174353340",
    access_token: "yup1337sdfasd65",
    refresh_token: "80085sasa63a4g6d6h",
    id_token: "dfgjo0d65as456fd",
    expiry_date: 0120,
    settings: {
        age: 40,
        weight: 120,
        height: 130,
        startTime: 800,
        endTime: 2300,
        reminderNumber: 7
    }
   
})

Data.create({
    google_id: "97852464123",
    date: 2020-12-14,
    progress: 100,
    weekday: "Monday"
})

Data.create({
    google_id: "97852464123",
    date: 2020-12-15,
    progress: 90,
    weekday: "Tuesday"
})

Data.create({
    google_id: "97852464123",
    date: 2020-12-16,
    progress: 90,
    weekday: "Wednesday"
})

Data.create({
    google_id: "97852464123",
    date: 2020-12-17,
    progress: 100,
    weekday: "Thursday"
})

Data.create({
    google_id: "97852464123",
    date: 2020-12-18,
    progress: 80,
    weekday: "Friday"
})

Data.create({
    google_id: "97852464123",
    date: 2020-12-19,
    progress: 70,
    weekday: "Saturday"
})

Data.create({
    google_id: "97852464123",
    date: 2020-12-20,
    progress: 100,
    weekday: "Sunday"
})
Data.create({
    google_id: "97852464123",
    date: 2020-12-21,
    progress: 90,
    weekday: "Monday"
})

Data.create({
    google_id: "1785434123",
    date: 2020-12-17,
    progress: 60,
    weekday: "Thursday"
})
Data.create({
    google_id: "1785434123",
    date: 2020-12-18,
    progress: 50,
    weekday: "Frisday"
})
Data.create({
    google_id: "1785434123",
    date: 2020-12-19,
    progress: 80,
    weekday: "Saturday"
})
Data.create({
    google_id: "1785434123",
    date: 2020-12-20,
    progress: 60,
    weekday: "Sunday"
})
Data.create({
    google_id: "1785434123",
    date: 2020-12-21,
    progress: 90,
    weekday: "Monday"
})
Data.create({
    google_id: "18577539995",
    date: 2020-12-19,
    progress: 20,
    weekday: "Saturday"
})
Data.create({
    google_id: "18577539995",
    date: 2020-12-20,
    progress: 30,
    weekday: "Sunday"
})
Data.create({
    google_id: "18577539995",
    date: 2020-12-21,
    progress: 40,
    weekday: "Monday"
})

Data.create({
    google_id: "16174353340",
    date: 2020-12-14,
    progress: 100,
    weekday: "Monday"
})

Data.create({
    google_id: "16174353340",
    date: 2020-12-15,
    progress: 90,
    weekday: "Tuesday"
})

Data.create({
    google_id: "16174353340",
    date: 2020-12-16,
    progress: 90,
    weekday: "Wednesday"
})

Data.create({
    google_id: "16174353340",
    date: 2020-12-17,
    progress: 100,
    weekday: "Thursday"
})

Data.create({
    google_id: "16174353340",
    date: 2020-12-18,
    progress: 80,
    weekday: "Friday"
})

Data.create({
    google_id: "16174353340",
    date: 2020-12-19,
    progress: 70,
    weekday: "Saturday"
})

Data.create({
    google_id: "16174353340",
    date: 2020-12-20,
    progress: 100,
    weekday: "Sunday"
})
Data.create({
    google_id: "16174353340",
    date: 2020-12-21,
    progress: 90,
    weekday: "Monday"
})


