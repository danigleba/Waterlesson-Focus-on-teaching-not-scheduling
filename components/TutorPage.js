import { useEffect, useState } from "react"
import Image from "next/image"
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import CheckoutForm from "@/components/CheckoutForm"
import { Calendar } from "@/components/ui/calendar"
import { HiTrash } from "react-icons/hi2"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY_TEST)

export default function TutorPage({ tutor, user, userData }) {
    const [clientSecret, setClientSecret] = useState()
    const [date, setDate] = useState(new Date())
    const [selectedDates, setSelectedDates] = useState([])
    const [times, setTimes] = useState([["09:00", "10:00"],["10:00", "11:00"],["11:00", "12:00"],["12:00", "13:00"],["13:00", "14:00"],["14:00", "15:00"],["15:00", "16:00"],["16:00", "17:00"]])
    const [selectedPrice ,setSelectedPrice] = useState()
    const appearance = {
        theme: "stripe",
        variables: {
          colorPrimary: "#dddddd",
        }
      }
      const loader = "auto" 
      const stripeOptions = {
        clientSecret,
        appearance,
        loader
    }

    const createPaymentIntent = async () => {
        const stripe = await stripePromise
        const response = await fetch(`/api/stripe/createPaymentIntent`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          }
        })
        const data = await response.json()
        setClientSecret(`${data.clientSecret}`)
    }

    const addDateToCheckout = async (time) => {
        setSelectedDates([...selectedDates, `${date.toString().substring(0, 11)} ${time} h`])
    }

    const removeDateFromCheckout = (date) => {
        const newDates = selectedDates.filter(item => item !== date)
        setSelectedDates(newDates)
    }

    const getCalendarAvaiability = async () => {
        const url = "/api/googleCalendar/getEvents"
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ date: date })
        })
        const data = await response.json()
        setTimes(data.data)
    }

    const createGoogleCalendarClass = async () => {
        const url = "/api/googleCalendar/createEvent"
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ date: date })
        })
        const data = await response.json()
        console.log(data.data)
    }

    useEffect(() => {
        createPaymentIntent()
    }, [])

    useEffect(() => {
        getCalendarAvaiability()
    }, [date])
    return (
        <main className="mb-24 text-[#0d1220] mb-24">
            <div className="top-0 w-full h-24 md:h-36 bg-black">
                <div className="h-full w-full bg-cover bg-top bg-[url('/banner.jpeg')]"></div>
            </div>
            <div className="md:flex px-6 md:px-24 -mt-12 gap-24 space-y-48 md:space-y-0">
                <div className="flex flex-col items-start justify-start w-full lg:w-2/3 gap-6">
                    <div>
                        <div className="w-32 border-white border-4 aspect-square rounded-xl bg-cover bg-bottom bg-[#dddddd] overflow-hidden flex items-end"><Image alt="Profile picture" width={500} height={500} src={tutor?.profile_url}/></div>
                        <p className="flex gap-2 font-bold text-xl mt-3">{tutor?.name}{tutor?.languages?.map((item) => (<p>{item}</p>))}</p>
                    </div>
                    <div className="lg:flex items-start h-full w-full md:gap-6 space-y-6 lg:space-y-0">
                        <div className="w-max flex md:block items-center justify-center">
                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                className="bg-[#f4f4f4] rounded-lg border border-[#dddddd] w-max shadow-[0px_0px_15px_rgb(0,0,0,0.02)]"/>
                        </div>
                        <div className="w-full h-72 space-y-3 rounded-lg font-light">
                            {times?.map((item, index) => (
                                <div className="flex items-center justify-between w-full gap-3">
                                    <div key={index} className={`flex shadow-[0px_0px_15px_rgb(0,0,0,0.02)] w-full justify-center items-center h-11 px-6 text-center rounded-md border border-[#dddddd] bg-[#f4f4f4] duration-200 ease-in-out`}>
                                        <p className="font-medium text-sm truncate">{item[0]} a {item[1]}</p>
                                    </div>
                                    <button onClick={() => addDateToCheckout(`${item[0]}`)} className="flex items-center justify-center w-2/3 py-1 h-11 font-medium rounded-md text-white font-light bg-[#0d1220] truncate px-3">+ Añadir</button>
                                </div>
                            ))}
                        </div>                        
                    </div>
                </div>
                {selectedDates?.length > 0 && (
                    <div className="lg:w-1/3 h-full border border-[#dddddd] shadow-[0px_0px_15px_rgb(0,0,0,0.02)] rounded-md bg-white text-center p-6 space-y-6">
                        <div className="space-y-3 border-b border-[#dddddd] pb-6">
                            {selectedDates?.map((item, index) => (
                                <div key={index} className="flex items-center justify-between w-full px-6 py-3 border border-[#dddddd] rounded-md text-sm font-medium bg-[#f4f4f4] space-x-6">
                                    <button onClick={() => removeDateFromCheckout(item)}><HiTrash size={18}/></button>
                                    <p className="truncate">{item}</p>
                                    <p className="w-max">25€</p>
                                </div>   
                            ))}
                            <p className="text-right font-bold text-4xl pt-3"><a className="font-light text-sm">total</a> {selectedDates?.length * 25} €</p>
                        </div>
                        {clientSecret && (
                            <div className="flex justify-center">
                                <Elements options={stripeOptions} stripe={stripePromise}>
                                    <CheckoutForm clientSecret={clientSecret} user={user} userData={userData} tutor={tutor} selectedPrice={selectedPrice}/>
                                </Elements>
                            </div>
                        )}
                        <button onClick={() => createGoogleCalendarClass()} className="bg-[#eb4c60] hover:bg-[#d63c4f] w-full font-medium text-white py-2 rounded-md">Comprar clases</button>
                    </div>
                )}
                
            </div>
        </main>
    )
}