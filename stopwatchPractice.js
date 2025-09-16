let start = new Date()
let elapsedTime = 0
let running = false

function startTime() {
    if(!running) {
        start = Date.now() // Gets the current time
        running = true //Triggers Running
    }
}

function endTime() {
    elapsedTime += (Date.now() - start) // Gets the Elapsed Time by adding currentTime to the start Time
    running = false
}

function resetTime() {
    start = 0 //Resets the startTime
    elapsedTime = 0
    running = false
}

function updateTime() {
    if (running) {
        return elapsedTime + (Date.now() - start)
    }

    else {
        return elapsedTime
    }
}

function displayTime() {
    const currentElapsed = updateTime()
    const time = Math.floor((currentElapsed / 1000)) // Gets the time in seconds
    const hours = Math.floor((time / 3600)) // Gets Hour
    const minutes = Math.floor((time % 3600) / 60) // Gets Minute
    const seconds = time % 60 // Gets Seconds
    const millieseconds = Math.floor((currentElapsed % 1000) / 10) // Writes millieseconds to 2 decimal places by getting the remainder by 1000 and then

    let formatType = hours > 0 ? "long" : "short"

    switch (formatType) {
        case "long":
            return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}.${millieseconds.toString().padStart(2, "0")}`
        
        default:
            return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}.${millieseconds.toString().padStart(2, "0")}`
    }
}

setInterval(console.log(displayTime), 100)