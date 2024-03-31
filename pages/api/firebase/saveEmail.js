import { db } from "@/utils/firebase"
import { collection, addDoc } from "firebase/firestore"

export default async function handler(req, res) {
    const { email } = req.body
    try {
        const collectionRef = collection(db, "earlyAdopters")
        await addDoc(collectionRef, { email: email })
        res.status(201).json({ emailSaved: true})
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" })
    }
} 