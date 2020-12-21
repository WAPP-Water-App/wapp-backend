const cron = require('node-cron');



var task = cron.schedule('* * * * *', () =>  {
    const date = new Date();
    console.log('will execute every minute until stopped', date.getMinutes());
  });

task.start();