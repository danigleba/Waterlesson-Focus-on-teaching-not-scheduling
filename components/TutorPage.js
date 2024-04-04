import { useEffect, useState } from "react"
import Image from "next/image"
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import CheckoutForm from "@/components/CheckoutForm"
import { Calendar } from "@/components/ui/calendar"
import { HiTrash } from "react-icons/hi2"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY_TEST)

export default function TutorPage({ tutor }) {
    const [clientSecret, setClientSecret] = useState()
    const [currentDay, setCurrentDay] = useState()
    const [date, setDate] = useState(new Date())
    const [dates, setDates] = useState([])
    const [endDates, setEndDates] = useState([])
    const [formatedDates, setFormatedDates] = useState([])
    const [times, setTimes] = useState()
    const [formatedTimes, setFormatedTimes] = useState()
    const [selectedPrice ,setSelectedPrice] = useState()
    const [email, setEmail] = useState()
    const appearance = {
        theme: "stripe",
        variables: {
          colorPrimary: "#f4f4f4",
        }
      }
      const loader = "auto" 
      const stripeOptions = {
        clientSecret,
        appearance,
        loader,
        locale: 'en'
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

    function convertToISOFormat(dateTimeString, timeString) {
        const dateTime = new Date(dateTimeString)
        const [hours, minutes] = timeString.split(":").map(Number)
        dateTime.setHours(hours)
        dateTime.setMinutes(minutes)
        const year = dateTime.getFullYear()
        const month = String(dateTime.getMonth() + 1).padStart(2, "0")
        const day = String(dateTime.getDate()).padStart(2, "0")
        const hoursISO = String(dateTime.getHours()).padStart(2, "0")
        const minutesISO = String(dateTime.getMinutes()).padStart(2, "0")
        const offsetMinutes = dateTime.getTimezoneOffset()
        const offsetHours = Math.abs(offsetMinutes / 60)
        const offsetSign = offsetMinutes < 0 ? "+" : "-"
        const isoString = `${year}-${month}-${day}T${hoursISO}:${minutesISO}:00+02:00`
        return isoString
    }

    const addDateToCheckout = async (formatedTime, time) => {
        const newISODate = convertToISOFormat(`${date}`, `${time[0]}`)
        setDates([...dates, `${newISODate}`])
        setFormatedDates([...formatedDates, `${date.toString().substring(0, 11)}at ${formatedTime} CET`])
    }

    const removeDateFromCheckout = (date) => {
        const dateIndex = formatedDates.indexOf(date)
        if (dateIndex !== -1) {
            const newFormatedDates = [...formatedDates]
            const newDates = [...dates]
            newFormatedDates.splice(dateIndex, 1)
            newDates.splice(dateIndex, 1)
            setFormatedDates(newFormatedDates)
            setDates(newDates)
        }
    }

    const getCalendarAvaiability = async () => {
        setFormatedTimes()
        const newDate = new Date(date)
        newDate.setDate(date?.getDate() + 1)
        const url = "/api/googleCalendar/getEvents"
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ date: newDate })
        })
        const data = await response.json()
        setFormatedTimes(data.formatedTimes)
        setTimes(data.times)
    }
   
    useEffect(() => {
        createPaymentIntent()
    }, [])

    useEffect(() => {
        getCalendarAvaiability()
    }, [date])

    //Getting the dates the google calendar events will end at
    useEffect(() => {
        if (dates.length > 0) {
            const newEndDates = dates.map(date => {
                const currentDate = new Date(date)
                const endDate = new Date(currentDate)
                endDate.setHours(currentDate.getHours() + 3) //Why 2 and not 1?
                console.log(endDate)
                return endDate.toISOString().replace(".000Z", "+02:00")
            })
            setEndDates(newEndDates)
        }
    }, [dates])

    useEffect(() => {
        const currentDate = new Date()
        setCurrentDay(currentDate.getDate())
    }, [])
    return (
        <main className="text-[#1a100d] bg-white mb-12">
            <div className="top-0 w-full h-24 md:h-36 bg-black">
                <div className="h-full w-full bg-cover bg-top bg-[url('/banner.jpeg')]"></div>
            </div>
            <div className="md:flex px-6 md:px-24 -mt-12 gap-24 space-y-12 md:space-y-0">
                {/*Caledar and times*/}
                <div className="flex flex-col items-start justify-start w-full lg:w-2/3 gap-6">
                    <div>
                        <div className="w-32 border-white border-4 aspect-square rounded-xl bg-cover bg-bottom bg-[#dddddd] overflow-hidden flex items-end"><Image loading="lazy" alt="Profile picture" width={500} height={500} src={tutor?.profile_url}/></div>
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
                        <div className="w-full h-full space-y-3 rounded-lg font-light">
                            {formatedTimes && date.getDate() > currentDay && (
                                <>
                                    {formatedTimes?.map((item, index) => (
                                        <div className="flex items-center justify-between w-full gap-3">
                                            <div key={index} className={`flex shadow-[0px_0px_15px_rgb(0,0,0,0.02)] w-full justify-center items-center h-11 px-6 text-center rounded-md border border-[#dddddd] bg-[#f4f4f4] duration-200 ease-in-out`}>
                                                <p className="font-medium text-sm truncate">{item[0]}</p>
                                            </div>
                                            <button onClick={() => addDateToCheckout(`${item[0]}`, times[index])} className="flex items-center justify-center w-2/3 py-1 h-11 font-medium rounded-md text-white font-light bg-[#1a100d] truncate px-6">+ Add</button>
                                        </div>
                                    ))}
                                </>
                            )}
                            {formatedTimes && date.getDate() <= currentDay && (
                                 <div className="flex w-full h-full justify-between items-center gap-3 px-6 pb-6">
                                    <div className="w-1/6 border-b border-[#1a100d]"></div>
                                    <p className="font-semibold w-full text-center w-4/6">Choose a day in the future</p>
                                    <div className="w-1/6 border-b border-[#1a100d]"></div>
                                </div>
                            )}
                            {!formatedTimes && (
                                <>
                                    <div className="flex items-center justify-between w-full gap-3">
                                        <div className={`flex shadow-[0px_0px_15px_rgb(0,0,0,0.02)] w-full justify-center items-center h-11 animate-pulse duration-1000 border-[#f4f4f4] px-6 text-center rounded-md border border-[#dddddd] bg-[#f4f4f4]`}></div>
                                    </div>
                                    <div className="flex items-center justify-between w-full gap-3">
                                        <div className={`flex shadow-[0px_0px_15px_rgb(0,0,0,0.02)] w-full justify-center items-center h-11 animate-pulse duration-1000 border-[#f4f4f4] px-6 text-center rounded-md border border-[#dddddd] bg-[#f4f4f4]`}></div>
                                    </div>
                                    <div className="flex items-center justify-between w-full gap-3">
                                        <div className={`flex shadow-[0px_0px_15px_rgb(0,0,0,0.02)] w-full justify-center items-center h-11 animate-pulse duration-1000 border-[#f4f4f4] px-6 text-center rounded-md border border-[#dddddd] bg-[#f4f4f4]`}></div>
                                    </div>
                                    <div className="flex items-center justify-between w-full gap-3">
                                        <div className={`flex shadow-[0px_0px_15px_rgb(0,0,0,0.02)] w-full justify-center items-center h-11 animate-pulse duration-1000 border-[#f4f4f4] px-6 text-center rounded-md border border-[#dddddd] bg-[#f4f4f4]`}></div>
                                    </div>
                                    <div className="flex items-center justify-between w-full gap-3">
                                        <div className={`flex shadow-[0px_0px_15px_rgb(0,0,0,0.02)] w-full justify-center items-center h-11 animate-pulse duration-1000 border-[#f4f4f4] px-6 text-center rounded-md border border-[#dddddd] bg-[#f4f4f4]`}></div>
                                    </div>
                                    <div className="flex items-center justify-between w-full gap-3">
                                        <div className={`flex shadow-[0px_0px_15px_rgb(0,0,0,0.02)] w-full justify-center items-center h-11 animate-pulse duration-1000 border-[#f4f4f4] px-6 text-center rounded-md border border-[#dddddd] bg-[#f4f4f4]`}></div>
                                    </div>
                                </>
                            )}
                        </div>                        
                    </div>
                </div>
                {/*Checkout modal*/}
                <div className="lg:w-1/3 h-full border border-[#dddddd] shadow-[0px_0px_15px_rgb(0,0,0,0.02)] rounded-md bg-white text-center p-6 space-y-6">
                    {dates?.length == 0 && (
                        <div className="flex flex-col justify-center text-left items-center">
                            <div className="flex w-full justify-between items-center gap-3 px-6 pb-6">
                                <div className="w-1/6 border-b border-[#1a100d]"></div>
                                <p className="font-semibold w-full text-center w-4/6">Book clases with {tutor?.name}</p>
                                <div className="w-1/6 border-b border-[#1a100d]"></div>
                            </div>
                            <video autoPlay={true} loop={true} width="320" height="240" className="w-full rounded-md" muted={true} type="video/mp4" src="/book_tutorial.mov"></video>
                        </div>
                    )}
                    {dates?.length > 0 && (
                        <>
                            <div className="space-y-3 border-b border-[#dddddd] pb-6">
                                {formatedDates?.map((item, index) => (
                                    <div key={index} className="flex items-center justify-between w-full px-6 py-3 border border-[#dddddd] rounded-md text-sm font-medium bg-[#f4f4f4] space-x-6">
                                        <button onClick={() => removeDateFromCheckout(item)}><HiTrash size={18}/></button>
                                        <p className="truncate">{item}</p>
                                        <p className="w-max">25 €</p>
                                    </div>   
                                ))}
                                <p className="text-right font-bold text-4xl pt-3"><a className="font-light text-sm">total</a> {dates?.length * 25} €</p>
                            </div>
                            {clientSecret && (
                                <Elements options={stripeOptions} stripe={stripePromise}>
                                    <CheckoutForm clientSecret={clientSecret} tutor={tutor} dates={dates} endDates={endDates} formatedDates={formatedDates}/>
                                </Elements>
                            )}
                        </>
                    )}
                </div>       
            </div>
        </main>
    )
}