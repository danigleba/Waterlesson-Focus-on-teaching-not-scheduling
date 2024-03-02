import { db } from "@/utils/firebase"
import { doc, setDoc } from "firebase/firestore"

export default async function handler(req, res) {
    const { user } = req.body
    try {
        const tutorRef = doc(db, "students", `${user.id}`)
        const newStudents = await setDoc(tutorRef, {    
            id: user.id,
            picture: user.picture,
            name: user.name, 
            given_name: user.given_name, 
            family_name: user.family_name, 
            locale: user.locale,
            tutors: [],
        })
        res.status(201).json({ newStudentAdded: true})
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" })
    }
} 