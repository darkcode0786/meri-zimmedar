'use client'

import { ReactNode, useEffect } from 'react'
import Lenis from '@studio-freight/lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type Props = {
  children: ReactNode
}

export const LenisProvider = ({ children }: Props) => {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.07,
    })

    const raf = (time: number) => {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    lenis.on('scroll', ScrollTrigger.update)

    // 👇 Smooth scroll for anchor links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.tagName.toLowerCase() === 'a') {
        const anchor = target as HTMLAnchorElement
        const href = anchor.getAttribute('href')
        if (href?.startsWith('#')) {
          e.preventDefault()
          const targetEl = document.querySelector(href) as HTMLElement
          if (targetEl) {
            lenis.scrollTo(targetEl, {
              offset: -100,
              duration: 1.2,
              easing: (t) => 1 - Math.pow(1 - t, 3), // custom easing
            })
          }
        }
      }
    }

    document.addEventListener('click', handleAnchorClick)

    return () => {
      document.removeEventListener('click', handleAnchorClick)
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
