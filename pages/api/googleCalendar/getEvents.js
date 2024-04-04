import { google } from "googleapis"

export default async function handler(req, res) {
    const { date } = req.body
    const startDate = new Date(date)
    startDate.setHours(5, 0, 0, 0)
    const endDate = new Date(startDate)
    endDate.setHours(21, 0, 0, 0)
    const auth = "AIzaSyDywj5WCCI0omAbhV5h4JqfmdzuxVK6Txk"
    const calendar = google.calendar({ version: "v3", auth })
    const times = [["09:00", "10:00"],["10:00", "11:00"],["11:00", "12:00"],["12:00", "13:00"],["13:00", "14:00"],["14:00", "15:00"],["15:00", "16:00"],["16:00", "17:00"],]
    try {
        const response = await calendar.events.list({
            calendarId: "4663a55c1cbed0c6c34548d5031e14d69577bdf43b5936b9cbf9614ff3f25792@group.calendar.google.com",
            timeMin: startDate,
            timeZone: "Europe/Madrid",
            timeMax: endDate,
            singleEvents: true,
            orderBy: "startTime",
        })
        const events = response.data.items
        events.forEach(event => {
            const eventStartTime = new Date(event.start.dateTime)
            const eventEndTime = new Date(event.end.dateTime)
            const eventStartHour = eventStartTime.getHours()
            const eventEndHour = eventEndTime.getHours()
            times.forEach((time, index) => {
                const startTime = parseInt(time[0].split(":")[0])
                const endTime = parseInt(time[1].split(":")[0])
                if ((eventStartHour >= startTime && eventStartHour < endTime) ||
                    (eventEndHour > startTime && eventEndHour <= endTime)) {
                    times.splice(index, 1)
                }
            })
        })
        res.status(200).json({ times: times, formatedTimes: convertToAMPM(times) })
    } catch (err) {
        console.error("Error fetching calendar events:", err.message)
        res.status(500).json({ error: "Failed to fetch calendar events" })
    }
}

function convertToAMPM(times) {
    const convertedTimes = []
    times.forEach(pair => {
        const startHour = parseInt(pair[0].substring(0, 2))
        const endHour = parseInt(pair[1].substring(0, 2))
        const startAMPM = startHour >= 12 ? " pm" : " am"
        const endAMPM = endHour >= 12 ? " pm" : " am"
        const startFormatted = `${startHour % 12 === 0 ? 12 : startHour % 12}${startAMPM}`
        const endFormatted = `${endHour % 12 === 0 ? 12 : endHour % 12}${endAMPM}`
        convertedTimes.push([startFormatted, endFormatted])
    })
    return convertedTimes
}