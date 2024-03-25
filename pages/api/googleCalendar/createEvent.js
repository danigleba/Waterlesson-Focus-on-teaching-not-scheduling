import { google } from "googleapis"

export default async function handler(req, res) {
    const auth = "AIzaSyCR_ngnfLq-HNwlziHNIM12Y4CuKx0JNCs"
    const calendar = google.calendar({ version: "v3", auth })
    try {
        const event = {
            summary: "Clase de Español con Dani", 
            description: "Example description", 
            start: {
                dateTime: "2024-03-25T10:00:00", 
                timeZone: "Europe/Madrid",
            },
            end: {
                dateTime: "2024-03-25T12:00:00", 
                timeZone: "Europe/Madrid",
            },
        }

        const response = await calendar.events.insert({
            calendarId: "12c47649a5f85653369d6d09a2c99404c2c175792a43e128cdf0f889f835034e", 
            resource: event,
        })

        console.log("Event created:", response.data)
        res.status(200).json({ message: "Event created successfully" })
    } catch (err) {
        console.error("Error creating event:", err.message)
        res.status(500).json({ error: "Failed to create event" })
    }
}
