// const cron = require('node-cron');



// var task = cron.schedule('* * * * *', () =>  {
//     const date = new Date();
//     console.log('will execute every minute until stopped', date.getMinutes());
//   });

// task.start();

const date = new Date()
//"01-12-2020"



console.log('hi')
// console.log(date.valueOf()+3599)
console.log(new Date())
console.log(date.setSeconds(date.getSeconds()+3599))
console.log(new Date(date.setSeconds(date.getSeconds()+3599)))