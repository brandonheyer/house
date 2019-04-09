var express = require("express");
var schedule = require("node-schedule");
var router = express.Router();

let count = 0;

const schedules = {
  feederAM: schedule.scheduleJob("30 7 * * *", () => {
    count++;
    console.log(count);
  }),
  feederPM: schedule.scheduleJob("30 19 * * *", () => {
    count++;
    console.log(count);
  })
};

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET home page. */
router.get('/schedules/:job', function(req, res, next) {
  const job = req.params.job
  if (schedules[job]) {
    const next = schedules[job].nextInvocation();
    const minutes = (next.getTime() - Date.now()) / 60000;

    res.json({
      job,
      next,
      minutes
    });
  }
  else {
    res.json({
      message: "no job found"
    });
  }
});

module.exports = router;
