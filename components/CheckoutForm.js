import { useState } from "react"
import { useRouter } from "next/router"
import { PaymentElement, useStripe, useElements, LinkAuthenticationElement } from "@stripe/react-stripe-js"

export default function CheckoutForm({ clientSecret, tutor, dates, endDates, formatedDates }) {
  const router = useRouter()
  const stripe = useStripe()
  const elements = useElements()
  const paymentElementOptions = {
    layout: "tabs",
  }
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [confirmationStatus, setConfirmationStatus] = useState(false)
  
  const handleSubmit = async (e) => {
    setIsLoading(true)
    const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: "https://waterlesson.com",
        },
        redirect: "if_required"
      })
  
      stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
        if (paymentIntent.status == "requires_payment_method") setIsLoading(false)
        if (paymentIntent.status == "succeeded") bookClassesInCalendar()
    })
  }

  const createEvent = async (startTime, endTime) => {
    const url = "https://n8n-nqy6.onrender.com/webhook/03c3a674-d776-4522-b275-24f03f4dabfc"
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ start: startTime, end: endTime, email: email, tutorName: tutor?.name, tutorEmail: tutor?.email, tutorURL: tutor?.url})
    })
    const data = await response.json()
  } 

  const bookClassesInCalendar = async () => {
    try {
      for (let i = 0; i < dates.length; i++) {
        await createEvent(dates[i], endDates[i])
      }
      setConfirmationStatus(true)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
   
  }
  return (
    <>
      <form id="payment-form" onSubmit={handleSubmit} className="w-full">
        <LinkAuthenticationElement
          id="email-element"
          options={paymentElementOptions}
          onChange={(e) => setEmail(e.value.email)}
          className="pb-3" />
        <PaymentElement 
          id="payment-element" 
          options={paymentElementOptions}/>
      </form>     
      <button onClick={() => handleSubmit()} className="bg-[#eb4c60] hover:bg-[#d63c4f] w-full font-medium text-white py-2 rounded-md">{isLoading ? "Loading..." : `Buy ${dates?.length} ${ dates?.length > 1 ? "classes" : "class"}`}</button>
      {/*Confirmation Modal*/}
      {confirmationStatus && (
        <div className="flex items-center bg-[#1a100d] bg-opacity-70 justify-center fixed bottom-0 left-0 w-full h-full">
          <div className="md:w-1/2 full bg-white border border-[#dddddd] shadow-md rounded-lg mx-8 space-y-6 p-6">
            <div className="space-y-1">
              <p className="font-bold text-xl">You've schedualed {dates.length} {dates.length > 1 ? "classes" : "class" } with {tutor?.name}</p>
              <p className="font-light text-sm">Find all your classes in Google Calendar</p>
            </div>
            <div className="space-y-3">
              {formatedDates?.map((item, index) => (
                <div key={index} className="flex items-center justify-center w-full px-6 py-3 border border-[#dddddd] rounded-md text-sm font-medium bg-[#f4f4f4] space-x-6">
                  <p className="truncate">{item}</p>
                </div>   
              ))}
            </div>
            <div className="flex flex-col justify-center items-center space-y-3">
              <button onClick={() => router.reload()} className="bg-[#eb4c60] hover:bg-[#d63c4f] w-full font-medium text-white py-2 rounded-md">Buy more classes</button>
              <a href="https://calendar.google.com/calendar" target="_blank" className="border border-[#dddddd] hover:bg-[#dddddd] w-full font-base py-2 rounded-md">Go to my calendar</a>
            </div>
          </div>
        </div>
      )}  
    </>
  )
}