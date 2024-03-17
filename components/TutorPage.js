import Image from "next/image"
import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"

export default function TutorPage({ tutor, availableClasses, user, userData }) {
    const [clientSecret, setClientSecret] = useState()
    const [date, setDate] = useState(new Date())
    const times = [["09:00", "10:00"],["10:00", "11:00"],["11:00", "12:00"],["12:00", "13:00"],["13:00", "14:00"],["14:00", "15:00"],["15:00", "16:00"],["16:00", "17:00"],]
    const [state, setState] = useState("Buy classes")
    const [selectedPrice ,setSelectedPrice] = useState()
    return (
        <main className="mb-24 text-[#0d1220] mb-6">
            <div className="top-0 w-full h-36 bg-black">
                <div className="h-full w-full bg-cover bg-top bg-[url('/banner.jpeg')]"></div>
            </div>
            <div className="flex flex-col items-start justify-start gap-12 px-24 -mt-12">
                <div>
                    <div className="w-32 border-white border-4 aspect-square rounded-xl bg-cover bg-bottom bg-[url('/berta.webp')]"></div>
                    <p className="font-bold text-xl mt-3">Berta Puig 🇪🇸 🇬🇧 🇫🇷 🇵🇱</p>
                    <p>Profesora de Español con más de 20 años de experiencia</p>
                </div>
                <div className="flex h-full w-full gap-6">
                    <div>
                        <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            className="bg-[#f4f4f4] rounded-lg border border-[#dddddd] w-max shadow-[0px_0px_15px_rgb(0,0,0,0.02)]"/>
                    </div>
                    <div className="w-full h-72 space-y-3 rounded-lg bg-white font-light">
                        {times.map((item, index) => (
                            <div className="flex items-center justify-between w-full gap-3">
                                <div key={index} className={`flex shadow-[0px_0px_15px_rgb(0,0,0,0.02)] w-full justify-center items-center h-11 px-6 text-center rounded-md border border-[#dddddd] bg-[#f4f4f4] duration-200 ease-in-out`}>
                                    <p className="font-medium text-sm">{item[0]} a {item[1]}</p>
                                </div>
                                <button className="flex items-center justify-center w-2/3 py-1 h-11 font-medium rounded-md text-white font-light bg-[#0d1220]">+ Añadir</button>
                            </div>
                        ))}
                    </div>
                    <div className="h-screen border-r border-[#dbe2ec] mx-12"></div>
                    <div className="w-full h-full border border-[#dddddd] rounded-md text-center p-6 space-y-6">
                        <div className="space-y-3">
                            <div className="w-full py-3 border border-[#dddddd] rounded-md text-sm font-medium bg-[#f4f4f4]">Sab 10 Feb, de 12:00 a 13:00</div>
                            <div className="w-full py-3 border border-[#dddddd] rounded-md text-sm font-medium bg-[#f4f4f4]">Sab 10 Feb, de 12:00 a 13:00</div>
                            <span className="text-xs text-left">Your email</span>
                            <input type="text" placeholder="youremail@gmail.com" className="w-full py-2 px-3 border border-[#dddddd] rounded-md text-sm font-medium" />
                        </div>
                        <button className="bg-[#eb4c60] hover:bg-[#d63c4f] w-full font-medium text-white py-2 rounded-md">Reservar clases</button>
                    </div>
                </div>
            </div>
        </main>
    )
}