import { db } from "@/utils/firebase"
import { collection, query, where, getDocs } from "firebase/firestore"

export default async function (req, res) {
    const tutorId = req.query.tutorId
    try {
        const queryTutor = query(collection(db, "tutors"), where("url", "==", tutorId))
        const tutorSnapshot = await getDocs(queryTutor)
        const tutorDoc = tutorSnapshot.docs[0]
        const tutorData = tutorDoc.data()
        res.status(200).json({ tutor: tutorData })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
