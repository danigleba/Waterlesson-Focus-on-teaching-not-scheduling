import {db} from "@/utils/firebase"
import { doc, getDoc } from "firebase/firestore"

export default async function (req, res) {
    const uid = req.query.uid
    const studentRef = doc(db, "students", uid)
    const studentSnap = await getDoc(studentRef)
    const studentExists = await studentSnap.exists()
    res.status(200).json({ userExists: studentExists})
}