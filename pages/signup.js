import { Inter } from "next/font/google"
import { FaStar } from "react-icons/fa";
import { Rubik } from "next/font/google"

const rubik = Rubik({ subsets: ["latin"] })
const inter = Inter({ subsets: ["latin"] })

export default function Home() {
  return (
    <main className={`${inter.className} pt-6 pb-12 bg-[#f9f9f9] text-[#1a100d] min-h-screen`}>
      {/*Headers*/}
      <div className="px-8 md:px-24 flex justify-start gap-2 md:gap-3 items-center h-12 w-full ">
        <p className="text-2xl md:text-3xl">🍉</p>
        <p className={`${rubik.className} font-extrabold texl-xl md:text-2xl`}>Waterlesson</p>
      </div>
      <div className="flex flex-col justify-center items-center w-full py-12 font-medium"> 
        <div>
            <div className="mb-3 bg-cover bg-bottom bg-[url('https://firebasestorage.googleapis.com/v0/b/cornelio-9f37a.appspot.com/o/daniglebapuig%40gmail.com%2Fprofile-2023-2.jpg?alt=media&token=db51f04a-ef22-443d-94c2-78ca77385319')] w-16 md:w-20 aspect-square rounded-full"></div>
            <p>Hey, Dani here</p>
            <p>Happy to see Waterlesson can help you out!</p>
        </div>
        </div>
    </main>
  )
}
