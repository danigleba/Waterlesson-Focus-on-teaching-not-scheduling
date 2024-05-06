import { useState } from 'react'
import { Rubik } from "next/font/google"
import { FiMinus } from "react-icons/fi"
import { FiPlus } from "react-icons/fi";
const rubik = Rubik({ subsets: ["latin"] })

export default function Features() {
  const [activeIndex, setActiveIndex] = useState(null)

  const faqs = [
    {
      question: 'Do you work in my country?',
      answer: 'Add one or multiple Stripe accounts to ZenVoice. It takes less than a minute. No coding required.'
    },
    {
      question: 'How do I recieve payments?',
      answer: 'Tailwind CSS is a utility-first CSS framework for creating custom designs without having to leave your HTML.'
    },
    {
        question: 'What is Tailwind CSS?',
        answer: 'Tailwind CSS is a utility-first CSS framework for creating custom designs without having to leave your HTML.'
    }
  ]

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <div className="w-full">
      {faqs.map((faq, index) => (
        <div key={index} className={`${index == 1 ? "border-y border-[#dddddd]" : ""}`}>
          <button
            className={`w-full flex justify-between items-center rounded py-6`}
            onClick={() => toggleFAQ(index)}
        >
            <p className={`${rubik.className} font-semibold text-lg text-[#eb4c60]`}><a className="text-base">{index+1}.</a> {faq.question}</p>
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
            <p className="mb-6">{faq.answer}</p>
          )}
        </div>
      ))}
    </div>
  )
}

