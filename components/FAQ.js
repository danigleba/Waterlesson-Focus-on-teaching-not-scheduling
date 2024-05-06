import { useState } from 'react'

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null)

  const faqs = [
    {
      question: 'Do you work in my country?',
      answer: 'Next.js is a React framework for building server-rendered applications.'
    },
    {
      question: 'How do I recieve payments?',
      answer: 'Tailwind CSS is a utility-first CSS framework for creating custom designs without having to leave your HTML.'
    },
    {
        question: 'What is Tailwind CSS?',
        answer: 'Tailwind CSS is a utility-first CSS framework for creating custom designs without having to leave your HTML.'
    },
    {
        question: 'What is Tailwind CSS?',
        answer: 'Tailwind CSS is a utility-first CSS framework for creating custom designs without having to leave your HTML.'
    },
  ]

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <div className="w-full">
      {faqs.map((faq, index) => (
        <div key={index} className="">
          <button
            className="w-full flex justify-between items-center rounded"
            onClick={() => toggleFAQ(index)}
          >
            <p className="font-semibold text-lg border-t border-[#dddddd] w-full py-6 text-left">{faq.question}</p>

          </button>
          {activeIndex === index && (
            <p className="mt-2">{faq.answer}</p>
          )}
        </div>
      ))}
    </div>
  )
}

