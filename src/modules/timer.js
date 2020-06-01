  // Timer
  const countTimer = (deadline) => {
   const timerDays = document.querySelector("#timer-days"),
     timerHours = document.querySelector("#timer-hours"),
     timerMinutes = document.querySelector("#timer-minutes"),
     timerSeconds = document.querySelector("#timer-seconds");
   let idTimeout = 0;
   function getTimeRemaining() {
     const dateStop = new Date(deadline).getTime(),
       dateNow = new Date().getTime(),
       timeRemaining = (dateStop - dateNow) / 1000,
       seconds = Math.floor(timeRemaining % 60),
       minutes = Math.floor((timeRemaining / 60) % 60),
       hours = Math.floor((timeRemaining / 60 / 60) % 24),
       days = Math.floor(timeRemaining / 60 / 60 / 24);
     return {
       timeRemaining,
       days,
       hours,
       minutes,
       seconds,
     };
   }
   function updateClock() {
     const timer = getTimeRemaining();
     timerSeconds.textContent = String(timer.seconds).padStart(2, "0");
     timerMinutes.textContent = String(timer.minutes).padStart(2, "0");
     timerHours.textContent = String(timer.hours).padStart(2, "0");
     timerDays.textContent = String(timer.days).padStart(2, "0");
     if (timer.timeRemaining < 0) {
       clearTimeout(idTimeout);
       timerSeconds.textContent = "00";
       timerMinutes.textContent = "00";
       timerHours.textContent = "00";
       timerDays.textContent = "00";
     }
   }
   updateClock();
   idTimeout = setInterval(updateClock, 1000);
 };

 export default countTimer;