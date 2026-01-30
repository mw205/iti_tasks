class Clock {
  #intervalId;
  constructor(initialTime) {
    // validate this case
    // let clock = new Clock("1");
    this.hours = parseInt(initialTime.substring(0, initialTime.indexOf(":")));
    this.minutes = parseInt(
      initialTime.substring(
        initialTime.indexOf(":") + 1,
        initialTime.indexOf(":") + 3
      )
    );
    this.seconds = parseInt(
      initialTime.substring(
        initialTime.lastIndexOf(":") + 1,
        initialTime.lastIndexOf(":") + 3
      )
    );
  }
  static formatTime(hours, minutes, seconds) {
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }

  #tick() {
    this.seconds += 1;
    if (this.seconds == 60) {
      this.seconds = 0;
      this.minutes += 1;
    }
    if (this.minutes == 60) {
      this.minutes = 0;
      this.hours += 1;
    }
    if (this.hours == 24) {
      this.hours = 0;
    }
  }

  start() {
    this.#intervalId = setInterval(() => {
      this.#tick();
      console.log(this.getTime());
    }, 1000);
  }
  stop() {
    clearInterval(this.#intervalId);
  }

  getTime() {
    return Clock.formatTime(this.hours, this.minutes, this.seconds);
  }
}

class AlarmClock extends Clock {
  #alarmTime;
  #intervalId;
  constructor(currentTime, alarmTime) {
    super(currentTime);
    this.currentTime = currentTime;
    this.#alarmTime = `${alarmTime
      .substring(0, alarmTime.indexOf(":"))
      .padStart(2, "0")}:${alarmTime.substring(
      alarmTime.indexOf(":") + 1,
      alarmTime.indexOf(":") + 3
    )}:${alarmTime.substring(
      alarmTime.lastIndexOf(":") + 1,
      alarmTime.lastIndexOf(":") + 3
    )}`;
  }

  #checkAlarm() {
    console.log(this.getTime(), this.#alarmTime);
    if (this.getTime() == this.#alarmTime) {
      this.stop();
    }
  }

//   #tick() {
//     this.seconds += 1;
//     if (this.seconds == 60) {
//       this.seconds = 0;
//       this.minutes += 1;
//     }
//     if (this.minutes == 60) {
//       this.minutes = 0;
//       this.hours += 1;
//     }
//     if (this.hours == 24) {
//       this.hours = 0;
//     }
//   }
  start() {
    // this.#intervalId = setInterval(() => {
    // //   this.#checkAlarm();
    // //   this.#tick();
    // }, 1000);
    super.start()
  }
  stop() {
    clearInterval(this.#intervalId);
    console.log("Alarm! Wake up!");
  }

  setAlarm(alarmTime) {
    this.#alarmTime = `${alarmTime
      .substring(0, alarmTime.indexOf(":"))
      .padStart(2, "0")}:${alarmTime.substring(
      alarmTime.indexOf(":") + 1,
      alarmTime.indexOf(":") + 3
    )}:${alarmTime.substring(
      alarmTime.lastIndexOf(":") + 1,
      alarmTime.lastIndexOf(":") + 3
    )}`;
  }
}
let timeNow = new Date();
let alarmTime = new Date();
alarmTime.setSeconds(timeNow.getSeconds() + 5);

let clock = new Clock(timeNow.toLocaleTimeString());

let alarm = new AlarmClock(
  timeNow.toLocaleTimeString(),
  alarmTime.toLocaleTimeString()
);

alarm.start();

setTimeout(() => {
  alarmTime.setSeconds(alarmTime.getSeconds() + 5);
  alarm.setAlarm(alarmTime.toLocaleTimeString());
  alarm.start();
}, 10000);
