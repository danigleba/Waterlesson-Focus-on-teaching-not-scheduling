import { db } from "@/utils/firebase"
import { doc, getDoc } from "firebase/firestore"

export default async function (req, res) {
    const tutorId = req.query.tutorId
    console.log(tutorId)
    try {
        const tutorRef = doc(db, "tutors", `${tutorId}`)
        const tutorSnap = await getDoc(tutorRef)
        const tutorData = tutorSnap.data()
        res.status(200).json({ tutor: tutorData})
    } catch (error) {
        res.status(500).json(error)
    }
}