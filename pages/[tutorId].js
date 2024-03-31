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
    const response = await fetch(`/api/firebase/getTutor?tutorId=${tutorId}`, {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
      },
    })
    const data = await response.json()
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
          {/* Basic Meta Tags */}
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta name="description" content="Plan classes & get paid on autopilot"/>
          {/* Open Graph Meta Tags */}
          <meta property="og:title" content="Waterlesson" />
          <meta property="og:description" content="Plan classes & get paid on autopilot" />
          <meta property="og:image" content="/icon.png" />
          <meta property="og:url" content="feedby.danigleba.com" />
          <meta property="og:type" content="website" />
          {/* Twitter Meta Tags */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Waterlesson" />
          <meta name="twitter:description" content="Plan classes & get paid on autopilot" />
          <meta name="twitter:image" content="/icon.png" />
          {/* Favicon */}
          <link rel="icon" href="/icon.png" />
          {/* Page Title */}
          <title>Waterlesson</title>
        </Head>
      <main className="mb-12 md:mb-24">
        <TutorPage tutor={tutor} availableClasses={availableClasses} user={user} userData={userData} />
      </main>
    </>
  )
}