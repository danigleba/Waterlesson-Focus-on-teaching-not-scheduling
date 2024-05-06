import Head from "next/head"
import { Rubik } from "next/font/google"
import { Inter } from "next/font/google"
import { useRouter } from "next/router"
import { useState } from "react"
import Footer from "@/components/Footer"
import FAQ from "@/components/FAQ"
import { FaStar } from "react-icons/fa"
import { FaCheck, FaQ } from "react-icons/fa6"
import { GoGift } from "react-icons/go"
import FeaturedOn from "@/components/FeaturedOn"
import { IoClose } from "react-icons/io5"
import { FaGoogle } from "react-icons/fa"
import { FiMinus } from "react-icons/fi"
import { FaPlus } from "react-icons/fa6"
import Features from "@/components/Features"

const rubik = Rubik({ subsets: ["latin"] })
const inter = Inter({ subsets: ["latin"] })

export default function Home() {
  const router = useRouter()
  const [featuresAccordion, setFeaturesAccordion] = useState({
    calendar: true,
    link: false, 
    share: false,
  })
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
      <main className={`${inter.className} bg-[#ffffff] text-[#1a100d] overflow-hidden`}>
        {/*Headers*/}
        <div className="px-8 md:px-24 flex justify-start gap-2 md:gap-3 items-center h-12 w-full bg-[#f9f9f9] pt-12">
          <p className="text-2xl md:text-3xl">🍉</p>
          <p className={`${rubik.className} font-extrabold texl-xl md:text-2xl`}>Waterlesson</p>
        </div>
        {/*Hero*/}
        <div className="flex flex-col md:flex-row items-center justify-between bg-[#f9f9f9]">
          <div className="w-full h-full">
            <div className="flex flex-col md:items-start items-center justify-center w-full h-full pt-12 md:mt-6 mb-12">
              <h2 className={`${rubik.className} px-8 md:pl-24 text-4xl md:text-6xl font-extrabold text-center md:text-left`}>Focus on teaching,<br/> not scheduling</h2>
              <div className="flex flex-col justify-center items-center md:items-start px-8 md:pl-24 w-full md:w-full text-center md:text-left text-xl space-y-3 md:space-y-2 font-medium pt-6 md:pt-3 pb-20 md:pb-12">
                <p className="pt-6 pb-12 md:pb-6 text-xl">Let students book and pay for your classes with your own scheduling website</p>
                <div className="flex flex-col justify-center items-start gap-2 text-lg">
                  <div className="flex items-center justify-center gap-6">
                    <FaCheck size={15} className="text-green-600"/>
                    <div className="flex items-center gap-3">
                      <p>No fees</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-6">
                    <FaCheck size={15} className="text-green-600"/>
                    <div className="flex items-center gap-3">
                      <p>Get paid from anywhere</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-6">
                    <FaCheck size={15} className="text-green-600"/>
                    <div className="flex items-center gap-3">
                      <p>Recieve payments inmediatly</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-6">
                    <FaCheck size={15} className="text-green-600"/>
                    <div className="flex items-center gap-3">
                      <p>Stand out from the competition</p>
                    </div>
                  </div>
                </div>
              </div>
              <button onClick={() => router.push("/signup")} className="md:mx-24 px-12 md:px-16 bg-[#eb4c60] hover:bg-[#d63c4f] text-white text-md py-3 rounded-lg font-semibold">Get Waterlesson</button>
              <div className="flex items-center md:items-start pt-6 font-medium gap-2 md:mx-24 px-0">
                <GoGift strokeWidth={0.4} className="text-green-600 animate-pulse" size={22}/>
                <p className="font-medium text-green-600">50% off</p> 
                <p>for first 50 users</p>
              </div>    
            </div>
          </div>
          <div className="w-full h-full md:px-0 md:-mr-32 rounded-xl md:bg-gray-200 px-6 md:px-0">
            <div className="w-full aspect-video bg-cover bg-[url('/screenshot.png')] rounded-xl shadow"></div>
          </div>
        </div>
        <div className="pt-12 pb-24 bg-[#f9f9f9]">
          <FeaturedOn />
        </div>
         {/*Without Vs. With*/}
         <div className="w-full text-center py-12 md:py-24">
          <h3 className={`${rubik.className} mb-12`}>Tired of paying crazy fees?</h3>
          <div className="grid gris-cols-1 md:grid-cols-2 gap-12 w-full px-6">
          <div className="flex items-center justify-center md:justify-end w-full h-full text-left">
            <div className="w-full md:w-max h-max bg-[#f9f9f9] text-[#1a100d] px-12 font-semibold text-lg rounded-lg space-y-3 py-10 px-12">
              <p className="font-extrabold text-md">Teaching in a marketplace</p>
              <div className="space-y-2">
                <div className="flex items-center gap-3 text-base font-medium">
                  <IoClose size={14} />
                  <p>Pay 15% to 30% in fees</p>
                </div>
                <div className="flex items-center gap-3 text-base font-medium">
                  <IoClose size={14} />
                  <p>Can't charge over $20 per hour</p>
                </div>
                <div className="flex items-center gap-3 text-base font-medium">
                  <IoClose size={14} />
                  <p>Get lost in all the competition of a marketplace</p>
                </div>
                <div className="flex items-center gap-3 text-base font-medium">
                  <IoClose size={14} />
                  <p>Get payments locked until the end of the month</p>
                </div>
                <div className="flex items-center gap-3 text-base font-medium">
                  <IoClose size={13} />
                  <p>Can't charge students from some contries</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center md:justify-start w-full h-full text-left">
            <div className="w-full md:w-max h-max bg-opacity-10 bg-[#d63c4f] text-[#d63c4f] px-12 font-semibold text-lg rounded-lg space-y-3 py-10 px-12">
              <p className="font-extrabold text-md">Teaching with Waterlesson</p>
              <div className="space-y-2">
                <div className="flex items-center gap-3 text-base font-medium">
                  <FaCheck size={13} />
                  <p>Pay 0% fees</p>
                </div>
                <div className="flex items-center gap-3 text-base font-medium">
                  <FaCheck size={13} />
                  <p>Charge $25+ per hour</p>
                </div>
                <div className="flex items-center gap-3 text-base font-medium">
                  <FaCheck size={13} />
                  <p>Stand out from the competition with a unique site</p>
                </div>
                <div className="flex items-center gap-3 text-base font-medium">
                  <FaCheck size={13} />
                  <p>Get the money in your account immediately</p>
                </div>
                <div className="flex items-center gap-3 text-base font-medium">
                  <FaCheck size={13} />
                  <p>Charge students from students in any contry</p>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
        {/*Testimonial*/}
        <div className="flex flex-col items-center justify-center gap-6 mx-8 pb-12 text-center h-full rounded-lg">
          <div className="flex text-yellow-500">
            <FaStar size={18}/>
            <FaStar size={18}/>
            <FaStar size={18}/>
            <FaStar size={18}/>
            <FaStar size={18}/>
          </div>
          <p className={`${rubik.className} md:w-1/3 font-medium text-lg md:text-normal`}>I used to  to give out 15-30% to all the teaching platforms, with Waterlesson <a className="bg-[#eb4c60] px-1 text-white">I charge my students more and get 100% of it!</a></p>
          <div className="flex justify-center items-center gap-6">
            <div className="bg-cover bg-bottom bg-[url('/face.jpeg')] w-12 aspect-square rounded-full"></div>
            <div className="text-left">
              <p className="font-bold text-md">Lucy</p>
              <p className="text-sm">English teacher</p>
            </div>
          </div>
        </div>
        {/*Featues*/}
        <div className="w-full text-center h-full px-6 py-12 md:pt-24">
          <h3 className={`${rubik.className} text-left md:mx-60`}>Self-service booking for your students</h3>
          <div className="flex flex-col md:flex-row gap-0 items-center h-full  md:mx-48">
            <div className="flex flex-col justify-between h-full w-full text-left md:px-12 ">
              <Features />               
            </div>
            <div className="flex items-center justify-center w-full aspect-square rounded-xl md:mr-12">
                <div className="w-full aspect-square pmd:w-4/5 md:h-4/5 bg-gray-700 rounded-xl"></div>
            </div>
          </div>
        </div>
        {/*Testimonial*/}
        <div className="flex flex-col items-center justify-center gap-6 mx-8 pb-12 text-center h-full rounded-lg">
          <div className="flex text-yellow-500">
            <FaStar size={18}/>
            <FaStar size={18}/>
            <FaStar size={18}/>
            <FaStar size={18}/>
            <FaStar size={18}/>
          </div>
          <p className={`${rubik.className} md:w-1/3 font-medium text-lg md:text-normal`}>I used to  to give out 15-30% to all the teaching platforms, with Waterlesson <a className="bg-[#eb4c60] px-1 text-white">I charge my students more and get 100% of it!</a></p>
          <div className="flex justify-center items-center gap-6">
            <div className="bg-cover bg-bottom bg-[url('/face.jpeg')] w-12 aspect-square rounded-full"></div>
            <div className="text-left">
              <p className="font-bold text-md">Lucy</p>
              <p className="text-sm">English teacher</p>
            </div>
          </div>
        </div>
        {/*Pricing*/}
        <div className="flex flex-col items-center justify-center w-full pb-24 mt-24 bg-[#f9f9f9] space-y-24">
          <div className="flex flex-col space-y-3 items-center justify-center md:w-1/2 text-center mt-24 px-6 md:px-8">
            <div className="w-max px-6 h-full py-1 text-xs font-medium animate-pulse rounded-full text-white bg-[#1a100d]">
              <p>✨ Launch Discount - 50% OFF ✨</p>
            </div>
            <h3 className="text-5xl">Stop giving out<br/> your time and money</h3>
            <p className="font-medium text-gray-500 md:mx-24">Ditch the Stripe Invoicing fee, reduce customer support, and focus on your startup. 1-minute no-code setup.</p>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center gap-12 w-full md:w-2/3 h-full px-6 md:px-8">
            <div className="w-full">
              <div className="flex items-center justify-left text-center w-full h-full border-[#1a100d]">
                <div className="flex flex-col items-start justify-center space-y-6 text-left gap-3 border border-[#dddddd] bg-white w-full rounded-xl p-8">
                  <div className="opacity-0 flex items-center justify-center w-full h-full px-6 py-0 -mt-10">
                    <div className="w-max text-xs text-center font-semibold text-white px-3 rounded-full bg-[#eb4c60]"><p>BUSY TEACHER'S CHOICE</p></div>
                  </div>
                  <div className="flex items-end justify-center gap-3">
                    <p className="line-through text-lg">94 €</p>
                    <p className={`${rubik.className} font-extrabold text-5xl`}>47 €</p>
                  </div>
                  <div className="space-y-3 font-medium">
                    <p className="flex items-center gap-2"><FaCheck size={13} />Waterlesson Page</p>
                    <p className="flex items-center gap-2"><FaCheck size={13} />Unlimited self-serve classes booked</p>
                    <p className="flex items-center gap-2"><FaCheck size={13} />1 calendar account</p>
                  </div>
                  <div className="w-full">
                    <button className="w-full py-3 shadow rounded-lg h-full bg-[#eb4c60] hover:bg-[#d63c4f] text-white font-semibold text-sm text-center">Get Waterlesson</button>
                    <p className="text-sm font-medium pt-2 text-center w-full">One-time payment, then <a className="underline">it's yours forever</a></p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full">
              <div className="flex items-center justify-left text-center w-full h-full border-[#1a100d]">
                <div className="flex flex-col items-start justify-center space-y-6 text-left gap-3 border border-[#eb4c60] bg-white w-full rounded-xl p-8">
                  <div className="flex items-center justify-center w-full h-full px-6 py-0 -mt-10">
                    <div className="w-max text-xs text-center font-semibold text-white px-3 rounded-full bg-[#eb4c60]"><p>BUSY TEACHER'S CHOICE</p></div>
                  </div>
                  <div className="flex items-end justify-center gap-3">
                    <p className="line-through text-lg">134 €</p>
                    <p className={`${rubik.className} font-extrabold text-5xl`}>67 €</p>
                  </div>
                  <div className="space-y-3 font-medium">
                    <p className="flex items-center gap-2"><FaCheck size={13} />Waterlesson Page</p>
                    <p className="flex items-center gap-2"><FaCheck size={13} />Unlimited self-serve classes booked</p>
                    <p className="flex items-center gap-2"><FaCheck size={13} />1 calendar account</p>
                  </div>
                  <div className="w-full">
                    <button className="w-full py-3 shadow rounded-lg h-full bg-[#eb4c60] hover:bg-[#d63c4f] text-white font-semibold text-sm text-center">Get Waterlesson</button>
                    <p className="text-sm font-medium pt-2 text-center w-full">One-time payment, then <a className="underline">it's yours forever</a></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
         {/*Testimonial*/}
         <div className="flex flex-col items-center justify-center gap-6 pb-32 px-6 md:px-8 text-center h-full rounded-lg bg-[#f9f9f9]">
          <div className="flex text-yellow-500">
            <FaStar size={18}/>
            <FaStar size={18}/>
            <FaStar size={18}/>
            <FaStar size={18}/>
            <FaStar size={18}/>
          </div>
          <p className={`${rubik.className} md:w-1/3 font-medium text-lg md:text-normal`}>I used to  to give out 15-30% to all the teaching platforms, with Waterlesson <a className="bg-[#eb4c60] px-1 text-white">I charge my students more and get 100% of it!</a></p>
          <div className="flex justify-center items-center gap-6">
            <div className="bg-cover bg-bottom bg-[url('/face.jpeg')] w-12 aspect-square rounded-full"></div>
            <div className="text-left">
              <p className="font-bold text-md">Lucy</p>
              <p className="text-sm">English teacher</p>
            </div>
          </div>
        </div>
        {/*FAQ*/}
        <div className="grid grid-cols-1 md:grid-cols-2 justify-center items-start w-full h-full px-6 md:px-24 space-y-12 md:space-y-0 bg-white my-24">
          <div className="w-full">
            <p className="font-bold text-[#eb4c60] pb-3">FAQ</p>
            <p className={`${rubik.className} font-bold text-3xl`}>Frequently Asked Questions</p>
          </div>
          <FAQ />
        </div>
        {/*Testimonial*/}
        <div className="flex flex-col items-center justify-center gap-6 pb-32 px-6 md:px-8 text-center h-full rounded-lg">
          <div className="flex text-yellow-500">
            <FaStar size={18}/>
            <FaStar size={18}/>
            <FaStar size={18}/>
            <FaStar size={18}/>
            <FaStar size={18}/>
          </div>
          <p className={`${rubik.className} md:w-1/3 font-medium text-lg md:text-normal`}>I used to  to give out 15-30% to all the teaching platforms, with Waterlesson <a className="bg-[#eb4c60] px-1 text-white">I charge my students more and get 100% of it!</a></p>
          <div className="flex justify-center items-center gap-6">
            <div className="bg-cover bg-bottom bg-[url('/face.jpeg')] w-12 aspect-square rounded-full"></div>
            <div className="text-left">
              <p className="font-bold text-md">Lucy</p>
              <p className="text-sm">English teacher</p>
            </div>
          </div>
        </div>
        {/*CTA*/}
        <div className="flex flex-col items-center justify-center space-y-12 w-full px-8 md:px-24 pt-24">
          <p className={`${rubik.className}  font-extrabold text-5xl md:text-6xl text-center`}>Focus on teaching,<br/> not scheduling</p>
          <p className="font-medium text-gray-500 md:mx-24 text-center w-full md:w-1/3">Ditch the Stripe Invoicing fee, reduce customer support, and focus on your startup. 1-minute no-code setup.</p>
          <button onClick={() => router.push("/signup")}  className="px-12 md:px-16 bg-[#eb4c60] text-white text-md py-3 rounded-lg font-semibold">Get Waterlesson</button>
        </div>
        <Footer />
      </main>
    </>
  )
}
