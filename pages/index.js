import Head from "next/head"
import { Inter } from "next/font/google"
import { useRouter } from "next/router"
import { FaStar } from "react-icons/fa"
import { Rubik } from "next/font/google"

const rubik = Rubik({ subsets: ["latin"] })
const inter = Inter({ subsets: ["latin"] })

export default function Home() {
  const router = useRouter()
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
      <main className={`${inter.className} pt-6 pb-12 bg-[#f9f9f9] text-[#1a100d]`}>
        {/*Headers*/}
        <div className="px-8 md:px-24 flex justify-start gap-2 md:gap-3 items-center h-12 w-full ">
          <p className="text-2xl md:text-3xl">🍉</p>
          <p className={`${rubik.className} font-extrabold texl-xl md:text-2xl`}>Waterlesson</p>
        </div>
        {/*Hero*/}
        <div className="flex flex-col items-center justify-center w-full h-full pt-12 md:mt-16 mb-12">
          <h2 className={`${rubik.className}  px-8 md:px-24 text-4xl md:text-5xl font-extrabold text-center`}>Plan classes & get paid on autopilot</h2>
          <div className="px-8 md:px-24 w-full md:w-2/3 text-center text-xl space-y-3 md:space-y-2 font-medium py-6 pb-12">
            <p className="">Let students book and pay for your classes automatically.</p><p>No more messy texting and asking for payments.</p><p>No more fees.</p><p><a className="bg-[#eb4c60] px-2 font-semibold text-white">Teach and get paid.</a> That's it.</p>
          </div>
          <button onClick={() => router.push("/signup")} className="px-12 md:px-16 bg-[#eb4c60] hover:bg-[#d63c4f] text-white text-lg shadow-md py-3 rounded-lg font-semibold">Get Waterlesson</button>
        </div>
        <div className="w-full px-0 md:px-24 md:py-12 py-6">
          <video autoplay width="320" height="240" controls className="w-full md:rounded-2xl" type="video/mp4" src=""></video>
        </div>
        {/*Sales letter*/}
        <div className="w-full flex item-center justify-center text-left px-8 md:px-24 py-24">
          <div className="md:w-2/3 font-medium text-lg space-y-6">
            <div className="mb-3 bg-cover bg-bottom bg-[url('https://firebasestorage.googleapis.com/v0/b/cornelio-9f37a.appspot.com/o/daniglebapuig%40gmail.com%2Fprofile-2023-2.jpg?alt=media&token=db51f04a-ef22-443d-94c2-78ca77385319')] w-16 md:w-20 aspect-square rounded-full"></div>
            <p>👋 Hi, I'm Dani</p>
            <p>My mom kept complaining about students not paying, not showing up, canceling 1 hour before, and giving her a constant headache.</p>
            <p>All the existing tools were bad, old, and expensive.</p>
            <p>So I built a solution.</p>
            <p>Now it helps other teachers like my mom do what they love.<br/>Teach and get paid.</p>
          </div>
        </div>
        {/*Testimonial*/}
        <div className="flex flex-col items-center justify-center gap-6 mx-8 text-center h-full rounded-lg py-6 md:py-12">
          <p className={`${rubik.className} md:w-2/3 font-bold text-xl md:text-3xl md:mx-24`}>I hate asking students to pay, the eternal WhatsApp ping pong, and trying to keep track of everything. With Waterlesson <a className="bg-[#eb4c60] px-1 text-white">I just teach and get paid.</a></p>
          <div className="flex text-yellow-400">
            <FaStar size={30}/>
            <FaStar size={30}/>
            <FaStar size={30}/>
            <FaStar size={30}/>
            <FaStar size={30}/>
          </div>
          <div className="flex justify-center items-center gap-6">
            <div className="bg-cover bg-bottom bg-[url('https://firebasestorage.googleapis.com/v0/b/cornelio-9f37a.appspot.com/o/bpuigvelasco66%40gmail.com%2Fberta.webp?alt=media&token=471ba214-e234-4f4c-a4e4-c259efbd3514')] w-16 aspect-square rounded-full"></div>
            <div className="text-left">
              <p className="font-bold text-xl">Berta</p>
              <p className="text-lg">Also known as my mom :)</p>
            </div>
          </div>
        </div>
        {/*CTA*/}
        <div className="w-full px-8 md:px-24 pt-24">
          <div className="flex flex-col justify-center items-center bg-[#1a100d] gap-16 px-12 py-16 text-white rounded-2xl">
            <p className={`${rubik.className}  font-extrabold text-3xl text-center`}>No more headaches. Just teach and get paid. </p>
            <button onClick={() => router.push("/signup")}  className="px-12 md:px-16 bg-[#eb4c60] hover:bg-[#d63c4f] text-white text-lg shadow-md py-3 rounded-lg font-semibold">Get Waterlesson</button>
          </div>
        </div>
      </main>
    </>
  )
}
