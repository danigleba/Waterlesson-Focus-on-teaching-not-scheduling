import { google } from "googleapis"

export default async function handler(req, res) {
    const { date } = req.body
    const auth = "AIzaSyCR_ngnfLq-HNwlziHNIM12Y4CuKx0JNCs"
    const calendar = google.calendar({ version: "v3", auth })
    const times = [["09:00", "10:00"],["10:00", "11:00"],["11:00", "12:00"],["12:00", "13:00"],["13:00", "14:00"],["14:00", "15:00"],["15:00", "16:00"],["16:00", "17:00"],]
    try {
        const nextDay = new Date(date);
        nextDay.setDate(nextDay.getDate() + 1);
        const response = await calendar.events.list({
            calendarId: "12c47649a5f85653369d6d09a2c99404c2c175792a43e128cdf0f889f835034e@group.calendar.google.com",
            timeMin: date,
            timeMax: nextDay.toISOString(),
            singleEvents: true,
            orderBy: "startTime",
        })
        const events = response.data.items
        console.log(events)
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
        console.log(times)
        res.status(200).json({ data: times })
    } catch (err) {
        console.error("Error fetching calendar events:", err.message)
        res.status(500).json({ error: "Failed to fetch calendar events" })
    }
}
