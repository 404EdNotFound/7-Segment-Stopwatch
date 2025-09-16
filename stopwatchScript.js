const startButton = document.getElementById("startButton")
const resetButton = document.getElementById("resetButton")

let running = false
let elapsedTime = 0
let starting_time = 0
let hours = 0
let minutes = 0
let seconds = 0
let millieseconds = 0

const digits = {
    0: ["a", "b", "c", "d", "e", "f"],
    1: ["b", "c"],
    2: ["a", "b", "g", "e", "d"],
    3: ["a", "b", "c", "d", "g"],
    4: ["f", "g", "b", "c"],
    5: ["a", "f", "g", "c", "d"],
    6: ["a", "f", "e", "d", "c", "g"],
    7: ["a", "b", "c"],
    8: ["a", "b", "c", "d", "e", "f", "g"],
    9: ["a", "b", "c", "d", "f", "g"]
  }

function resetTime() {
    hours = minutes = seconds = millieseconds = elapsedTime = starting_time = 0
    running = false
    displayTime()
    startButton.textContent = "Start"
}

function startTime() {
    running = !running //Needed help with this
    startButton.textContent = running ? "Pause" : "Start"
    starting_time = performance.now() - elapsedTime
    updateTime()
}

//Needed help with this
function updateTime() {
    if (running) {
        elapsedTime = performance.now() - starting_time

        millieseconds = Math.floor(elapsedTime % 1000)
        seconds = Math.floor(elapsedTime / 1000) % 60
        minutes = (Math.floor(seconds / 60)) % 60
        hours = Math.floor(seconds / 3600)

        document.querySelectorAll(".separator").forEach(part => {
            part.classList.add("blink")
        })

        displayTime()
    }

    else {
        document.querySelectorAll(".separator").forEach(part => {
            part.classList.remove("blink")
        })
    }
}

//Needed help with this
function displayTime() {
    numberString = hours.toString().padStart(2, "0") + minutes.toString().padStart(2, "0") + seconds.toString().padStart(2, "0") + millieseconds.toString().slice(-2).padStart(2, "0")

    for (let i = 0; i < numberString.length; i++) {
        let digit = parseInt(numberString[i])
        let supply = document.querySelector(`#digit-${i}`)
        if (!supply) continue
        let segments = supply.querySelectorAll(".segment")

        segments.forEach(segment => {
            segment.classList.remove("on")
        })

        const lights = digits[digit]

        lights.forEach(part => {
            const targetDigit = supply.querySelector(`.segment.${part}`)
            if (targetDigit) {
                targetDigit.classList.add("on")
            }
        })
    }
}

setInterval(updateTime, 10)
document.addEventListener("DOMContentLoaded", () => {updateTime(); displayTime()})