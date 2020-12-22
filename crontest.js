// const cron = require('node-cron');



// var task = cron.schedule('* * * * *', () =>  {
//     const date = new Date();
//     console.log('will execute every minute until stopped', date.getMinutes());
//   });

// task.start();

const date = new Date()
//"01-12-2020"

//'2002-12-09'

console.log(date)
console.log(`${date.getFullYear()}-${date.getDate()}-${date.getDate()}`)