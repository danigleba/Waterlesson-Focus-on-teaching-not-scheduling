import Head from "next/head"
import { useRouter } from "next/router"
import { useState, useEffect} from "react"
import Cookies from "js-cookie"
import TutorPage from "@/components/TutorPage"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ['latin'] })

export default function Student_id() {
    const router = useRouter()  
    const { tutorId } = router.query 
  const [tutor, setTutor] = useState({})
  const [tutorEmail, setTutorEmail] = useState()
  const [availableClasses, setAvailableClasses] = useState(0)
  const [user, setUser] = useState()
  const [userData, setUserData] = useState({})

  const getTutor = async () => {
    console.log(tutorId)
      const response = await fetch(`/api/firebase/getTutor?tutorId=${tutorId}`, {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
        },
      })
      const data = await response.json()
      console.log(data)
      setTutor(data.tutor)
  }

  const getUser = async () => {
    try {
        const response = await fetch(`/api/auth/signupStudent`, {
          method: "POST", 
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: Cookies.get("userCookie") }), 
        })
        const data = await response.json()
        setUserData(data.data)
      } 
      catch (error) {
        console.error("Error fetching comments:", error.message)
      } 
  }

  const findAvailableClasses = async () => {
    for (let i = 0; i < userData?.tutors?.length; i++) {
        if (userData?.tutors[i]?.uid == tutorId) {
          setAvailableClasses(userData?.tutors[i].classCredit)
          return
        }
    }
    return
  }
  

  useEffect(() => {
    if (user) getUser()
  }, [user])

  useEffect(() => {
    if (userData && tutorId) findAvailableClasses()
  }, [userData, tutorId])

  useEffect(() => {
    if (tutor) setTutorEmail(tutor?.email)
  }, [tutor])

  useEffect(() => {
    if (tutorId) getTutor()
  }, [tutorId])
  return (
    <>
      <Head>
          <title>Alba | Reserva con {tutor?.username}</title>
          <meta name="description" content="Your meta description goes here" />
          <meta name="author" content="Cornelio Tutors" />
          <link rel="icon" href="/icon.png" />
          <link rel="canonical" href="https://tutors.getcornelio.com/"/>
          <meta property="og:title" content="Cornelio Tutors" />
          <meta property="og:description" content="Your meta description goes here" />
          <meta property="og:image" content="https://example.com/og-image.jpg" />
      </Head>
      <main className="mb-12 md:mb-24">
        <TutorPage tutor={tutor} availableClasses={availableClasses} user={user} userData={userData} />
      </main>
    </>
  )
}