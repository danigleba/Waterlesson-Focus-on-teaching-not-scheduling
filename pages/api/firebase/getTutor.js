import { db } from "@/utils/firebase"
import { getDoc, doc } from "firebase/firestore"

export default async function (req, res) {
    const tutorId = req.query.tutorId
    try {
        const tutorRef = doc(db, "tutors", `${tutorId}`)
        const tutorSnapshot = await getDoc(tutorRef)
        const tutorData = tutorSnapshot.data()
        res.status(200).json({ tutor: tutorData })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
