import { useState } from 'react'
import { Rubik } from "next/font/google"
import { FiMinus } from "react-icons/fi"
import { FiPlus } from "react-icons/fi"
import { FaGoogle } from "react-icons/fa"
import { BsStripe } from "react-icons/bs"
import { SiWise } from "react-icons/si"
import { TbWorld } from "react-icons/tb"
import { FaCalendar } from "react-icons/fa";

const rubik = Rubik({ subsets: ["latin"] })

export default function Features() {
  const [activeIndex, setActiveIndex] = useState(null)

  const faqs = [
    {
      question: 'Connect your calendar',
      answer: 'Add one or multiple Stripe accounts to ZenVoice. It takes less than a minute. No coding required.'
    },
    {
      question: 'Share your Waterlesson link',
      answer: 'Tailwind CSS is a utility-first CSS framework for creating custom designs without having to leave your HTML.'
    },
    {
        question: 'Your students buy classes',
        answer: 'Tailwind CSS is a utility-first CSS framework for creating custom designs without having to leave your HTML.'
    }
  ]

  const toggleFAQ = (index) => {
    setActiveIndex(index)
  }

  return (
    <div className="w-full">
      {faqs.map((faq, index) => (
        <div key={index} className={`${index == 1 ? "border-y border-[#dddddd]" : ""}`}>
          <button
            className={`w-full flex justify-between items-center rounded py-6`}
            onClick={() => toggleFAQ(index)}>
            <p className={`${rubik.className} ${activeIndex == index ? "text-[#eb4c60]" : ""} font-semibold text-lg`}><a className="text-base">{index+1}.</a> {faq.question}</p>
            <div className='-ml-6 mr-12'>
                {activeIndex == index && (
                    <FiMinus size={18} strokeWidth={2}/>
                )}
                {activeIndex != index && (
                <   FiPlus size={18} strokeWidth={2}/>
                )}
            </div>
          </button>
          {activeIndex === index && (
            <div className='pb-6 space-y-3'>
              <p >{faq.answer}</p>
              {activeIndex == 0 && (
                <p className='flex items-center justify-start gap-2 font-semibold'><FaCalendar size={14}/>Connected to your calendar</p>
              )}
              {activeIndex == 1 && (
                <p className='flex items-center justify-start gap-2 font-semibold'><TbWorld size={14}/>Set a custom domain</p>
              )}
              {activeIndex == 2 && (
                <div className='leading-6'>
                  <p className='flex items-center justify-start gap-2 font-semibold'><BsStripe size={14}/>Secured with Stripe</p>
                  <p className='flex items-center justify-start gap-2 font-semibold'><SiWise size={14}/>Secured with Wise</p>
                </div>
              )}
            </div>
          )}

        </div>
      ))}
    </div>
  )
}

