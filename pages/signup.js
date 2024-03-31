import Head from "next/head"
import Link from "next/link"
import { useState } from "react"
import { Inter } from "next/font/google"
import { Rubik } from "next/font/google"

const rubik = Rubik({ subsets: ["latin"] })
const inter = Inter({ subsets: ["latin"] })

export default function Home() {
    const [email, setEmail] = useState()
    const [errorMessage, setErrorMessage] = useState(false)
    const [emailSaved, setEmailSaved] = useState(false)

    const sendEmail = async () => {
        if (email == false || !checkIfItIsEmail(email)) setErrorMessage(true)
        else {
            setErrorMessage(false)
            saveEmailInFirebase()
        }
    }

    const saveEmailInFirebase = async () => {
        const response = await fetch(`/api/firebase/saveEmail`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: email })
        })
        const data = await response.json()
        if (data.emailSaved) setEmailSaved(true)
    }

    function checkIfItIsEmail(email) {
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
        return emailRegex.test(email)
    }
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
            <main className={`${inter.className} pt-6 pb-12 bg-[#f9f9f9] text-[#1a100d] min-h-screen`}>
            {/*Headers*/}
            <div className="px-8 md:px-24  w-full ">
                <Link href="/" className="flex justify-start items-center h-12 gap-2 md:gap-3">
                    <p className="text-2xl md:text-3xl">🍉</p>
                    <p className={`${rubik.className} font-extrabold texl-xl md:text-2xl`}>Waterlesson</p>
                </Link>
            </div>
            <div className="flex flex-col justify-center items-center w-full py-12 px-8 font-medium md:text-lg"> 
                <div className="w-full md:w-2/5">
                    
                    {!emailSaved && (
                        <>
                            <div className="flex items-center justify-start gap-6 mb-6">
                                <div className="bg-cover bg-bottom bg-[url('https://firebasestorage.googleapis.com/v0/b/cornelio-9f37a.appspot.com/o/daniglebapuig%40gmail.com%2Fprofile-2023-2.jpg?alt=media&token=db51f04a-ef22-443d-94c2-78ca77385319')] w-16 md:w-24 aspect-square rounded-full"></div>
                                <div className="space-y-1 w-2/3 md:w-full">
                                    <p>Hey, Dani here.</p>  
                                </div>
                            </div>
                            <div className="space-y-6 pb-6">
                                <p>Onboarding new teachers takes some manual work.</p>
                                <p><b>Leave yor email</b> and I'll get in touch to set up your page.</p>
                                <p>Don't worry. It's <b>100% free</b>.</p>
                            </div>
                            <span>Your email</span>
                            <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="youremail@example.com" className="w-full bg-white border border-[#1a100d] rounded-md px-3 py-2 placeholder:text-[#dddddd] text-light"></input>
                            {errorMessage == true && (<p className="text-center text-sm text-red-400 pt-1">Write down your email so I can get in touch.</p>)}
                            <button onClick={() => sendEmail()}  className="mt-3 mb-12 w-full bg-[#eb4c60] hover:bg-[#d63c4f] text-white text-lg py-2 rounded-lg font-semibold">Get Waterlesson</button>
                            <p>PS: Check out <a className="text-blue-400 underline" target="_blank" href="/berta">my mom's page</a> to see what you'll get ;)</p>
                        </>
                    )}  
                    {emailSaved && (
                        <div className="pb-12 space-y-6">
                            <div className="bg-cover bg-bottom bg-[url('https://firebasestorage.googleapis.com/v0/b/cornelio-9f37a.appspot.com/o/daniglebapuig%40gmail.com%2Fprofile-2023-2.jpg?alt=media&token=db51f04a-ef22-443d-94c2-78ca77385319')] w-16 md:w-20 aspect-square rounded-full"></div>
                            <p className="font-bold text-xl">Got it!</p>
                            <p>I'll email you the next steps ASAP.</p>
                            <p>Until then, check out <a className="text-blue-400 underline" target="_blank" href="/berta">my mom's page</a> to see what you'll get ;)</p>
                        </div>
                    )}
                </div>
                </div>
            </main>
        </>
    )
}
