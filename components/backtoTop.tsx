'use client'

import { useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { ArrowBigUp, ArrowUp } from 'lucide-react'

gsap.registerPlugin(ScrollToPlugin)

export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 300)
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    gsap.to(window, {
      duration: 1.2,
      scrollTo: { y: 0 },
      ease: 'power3.out',
    })
  }

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-4 bg-blue-100 text-blue-500 p-3 w-12 h-12 z-50 border-3 flex items-center font-black justify-center border-blue-500/60 hover:text-white hover:border-blue-200 rounded-full shadow-lg transition-opacity hover:bg-blue-500 ${
        visible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
        <ArrowUp />
    </button>
  )
}
