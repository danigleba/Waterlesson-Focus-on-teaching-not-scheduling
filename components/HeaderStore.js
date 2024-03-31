
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import Image from "next/image"
import Cookies from "js-cookie"

export default function HeaderStore(props) {
    const router = useRouter()
    const userCookie = Cookies.get("userCookie")
    const [userData, setUserData] = useState()
    const [phoneNumber, setPhoneNumber] = useState()
    //The prices can be an array
    const [email, setEmail] = useState()
    const [price1, setPrice1] = useState()
    const [price10, setPrice10] = useState()
    const [price20, setPrice20] = useState()
    const [errorMessage, setErrorMessage] = useState("")
    const [authModalIsOpen, setAuthModalIsOpen] = useState(false)
    const [tutorFormIsOpen, setTutorFormIsOpen] = useState(false)
    
    const handleAuth = async () => {
        const params = new URLSearchParams(window.location.hash.substring(1))
        const accessToken = params.get("access_token") 
        const userData = await fetchUserData(accessToken ? accessToken : Cookies.get("accesCookie"))
        setUserData(userData)
        if (!userCookie) {
            if (accessToken) {
                Cookies.set("accesCookie", accessToken, { expires: 30 })
                Cookies.set("userCookie", userData.id, { expires: 30 })
                checkUserInFirestore(userData)
            } else setAuthModalIsOpen(true)
        } else checkUserInFirestore(userData)
    }
    
    const fetchUserData = async (accessToken) => {
        try {
            const response = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            const userData = await response.json()
            setUserData(userData)
            return userData
        } catch (error) {
            console.error("Error fetching user data:", error)
        }
    }

    const checkUserInFirestore = async (user) => {
        const url = "/api/firebase/searchUserInFirebase?uid=" + user?.id
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        })
        const data = await response.json()
        if (data.userExists == false) {
            uploadUserToFirebase()
        } else getUserFromFirebase(user)
    }

    const uploadUserToFirebase = async () => {
            const response = await fetch("/api/auth/uploadUser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ user: userData })
            })
            const data = await response.json() 
            if (data.newTutorAdded == true) router.reload()
    }
    
    const getUserFromFirebase = async (user) => {
        const response = await fetch("/api/firebase/getTutor", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ user: user })
        })
        const data = await response.json() 
        setUserData(data.user)
    }

    useEffect(() => {
        handleAuth()
    }, [Cookies])
    return (
        <main className="mx-8 md:mx-20 py-6 w-full">
            <div className="flex justify-between items-center bg-white w-screen">
                <div>
                    <button onClick={() => router.push("/")}>
                        <Image alt="Cornelio's logo" height={100} width={100} src="https://firebasestorage.googleapis.com/v0/b/cornelio-9f37a.appspot.com/o/logo.png?alt=media&token=36fa1da0-40a9-4e2e-a6f7-9f3fc5d77510&_gl=1*1x34fcy*_ga*Njg1NzExNjYxLjE2OTA2MzY3Mjk.*_ga_CW55HF8NVT*MTY5ODYwMjYxMS4xOTUuMS4xNjk4NjA0OTMyLjQ3LjAuMA.." />
                    </button>
                </div>
            </div>
        </main>
    )
}