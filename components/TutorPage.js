import Image from "next/image"
import { useEffect, useState } from "react"
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import { FaShoppingCart } from "react-icons/fa"
import { FaCalendar } from "react-icons/fa"
import HeaderStore from "./HeaderStore"
import { Calendar } from "@/components/ui/calendar"

export default function TutorPage({ tutor, availableClasses, user, userData }) {
    const [clientSecret, setClientSecret] = useState()
    const [state, setState] = useState("Buy classes")
    const [selectedPrice ,setSelectedPrice] = useState()
    const [numberOfClassesChosen, setNumberOfClassesChosen] = useState()
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
    const [date, setDate] = useState(new Date())

    const createPaymentIntent = async (price, nClasses) => {
        setSelectedPrice(price)
        const stripe = await stripePromise
        const response = await fetch(`/api/stripe/createPaymentIntent?price=${price}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          }
        })
        const data = await response.json()
        setClientSecret(`${data.clientSecret}`)
        setNumberOfClassesChosen(nClasses)
    }

    useEffect(() => {
        console.log(availableClasses)
    }, [availableClasses])
    return (
        <main className="mb-24">
            {/*Header*/}
            <HeaderStore />
            {/*Tutor profile*/}
            <div className="flex flex-col md:flex-row w-full items-center justify-center w-full px-8 md:px-20 mt-6">
                <div className="flex items-center justify-center gap-6">
                    <Image className="rounded-full" alt="Student's profile picture" height={70} width={70} src={tutor?.picture} />
                    <div>
                        <div className="flex flex-col gap-2 pb-2">
                            <p className="font-bold text-xl">{tutor?.name}</p>   
                                <div className="bg-[#f9f9f9] py-1.5 px-4 font-base w-max rounded-md">
                                    {availableClasses} clases compradas
                                </div>
                        </div>
                    </div>
                </div> 
                {/*
                <div className="w-full pt-12 md:pt-0 md:w-1/3">
                    <div className="flex flex-col justify-center items-center h-full gap-6 font-medium">
                        <button className="flex justify-center items-center gap-2 bg-[#eb4c60] w-full hover:bg-[#d63c4f] border border-[#eb4c60] hover:border-[#d63c4f] text-white px-12 py-2 rounded-lg transition ease-in-out" onClick={() => setState("Buy classes")}><FaShoppingCart size={15}/>Comprar clases</button>
                        <button className="flex justify-center items-center gap-2 bg-[#f4f4f4] w-full hover:bg-[#dddddd] border border-[#dddddd] px-12 py-2 rounded-lg duration-200 transition ease-in-out"><FaCalendar size={15}/>Reservar clases</button>
                    </div>            
                </div>
                */}
            </div>
            <div className="flex flex-col justify-center items-center bg-blue-200">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border w-max mx-8 md:mx-20 mt-12"
                />
                <input type="time" className="w-full border border-[#dddddd]"/>
            </div>

        
        
        {/*
        <div className="mx-8 md:mx-20 pt-12">

            
            {(availableClasses <= 0 || state == "Buy classes") && (
                <>
                {!clientSecret && (
                    <div className="w-full">
                    <h2 className="text-center text-2xl md:text-3xl md:pb-3">Compra clases con {tutor?.given_name}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full pt-4 text-center font-bold text-lg rounded">
                        <div className="checkout-card md:mt-11" onClick={() => createPaymentIntent(tutor?.prices?.one_class * 100, 1)} type="submit">
                            <p className="bg-[#f4f4f4] rounded-md py-1">1 clase</p>
                            <p className="text-3xl">{tutor?.prices?.one_class} €</p>
                            <button className="checkout-btn">Comprar</button> 
                            <div className="font-normal text-xs">   
                                <p className="pb-2">Todas las clases son de 1 hora.</p>
                                <p>Toda clase cancelada será devuelta al alumno.</p>
                            </div>
                        </div>
                        <div className="flex flex-col w-full items-center justify-center">
                            <div className="font-semibold bg-[#eb4c60] w-1/2 text-center text-white rounded-md mb-2 py-1">
                                <p>Más popular</p>
                            </div>
                            <div className="checkout-card border-[#eb4c60] border-2 w-full" onClick={() => createPaymentIntent(tutor?.prices?.ten_classes * 100, 10)} type="submit">
                                <p className="bg-[#eb4c60] text-white rounded-md py-1">10 clases</p>
                                <p className="text-3xl">{tutor?.prices?.ten_classes} €<a className="text-lg font-light"> / clase</a></p>
                                <button className="checkout-btn">Comprar</button> 
                                <div className="font-normal text-xs">   
                                    <p className="pb-2">Todas las clases son de 1 hora.</p>
                                    <p>Toda clase cancelada será devuelta al alumno.</p>
                                </div>
                            </div>
                        </div>
                        <div className="checkout-card md:mt-11" onClick={() => createPaymentIntent(tutor?.prices?.twenty_classes * 100, 20)} type="submit">
                            <p className="bg-[#f4f4f4] rounded-md py-1">20 clases</p>
                            <p className="text-3xl">{tutor?.prices?.twenty_classes} €<a className="text-lg font-light"> / clase</a></p>
                            <button className="checkout-btn">Comprar</button> 
                            <div className="font-normal text-xs">   
                                <p className="pb-2">Todas las clases son de 1 hora.</p>
                                <p>Toda clase cancelada será devuelta al alumno.</p>
                            </div>
                        </div>

                    </div>
                </div>
                )}
                {clientSecret && (
                    <div className="flex justify-center">
                        <Elements options={stripeOptions} stripe={stripePromise}>
                            <CheckoutForm clientSecret={clientSecret} user={user} userData={userData} tutor={tutor} selectedPrice={selectedPrice} numberOfClassesChosen={numberOfClassesChosen}/>
                        </Elements>
                    </div>
                )}
                </>
            )}
        </div>
        */}
        </main>
    )
}