// const cron = require('node-cron');



// var task = cron.schedule('* * * * *', () =>  {
//     const date = new Date();
//     console.log('will execute every minute until stopped', date.getMinutes());
//   });

// task.start();



const start = 17;
const end = 22;
const reminder = 2;

const schedule = [];

for (let i=start; i<=end; i+=reminder){
    console.log(i)
    schedule.push(i)


}

console.log(schedule)


date = new Date()

const testDate = new Date(date.setHours(23))

console.log(testDate.getHours())