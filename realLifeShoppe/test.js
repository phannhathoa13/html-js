






let input = document.getElementById('timer')
let remainingTime = 300;
function updateTimer() {
    let minutes = Math.floor(remainingTime / 60);
    let second = remainingTime % 60;
    input.textContent = `Thời gian còn lại: ${minutes} phút ${second} giây`
}
let timeInterval = setInterval(() => {
    updateTimer();
    remainingTime--;
    if (remainingTime < 0) {
        clearInterval(timeInterval);
        input.textContent = "Done";
    }
}, 10)
