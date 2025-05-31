"use client"

import { useState, useEffect, useRef } from "react"

interface TypewriterProps {
  text: string
  speed?: number
  delayBeforeReverse?: number
}

export default function TypewriterEffect({ text, speed = 100, delayBeforeReverse = 1000 }: TypewriterProps) {
  const [displayText, setDisplayText] = useState("")
  const [isTyping, setIsTyping] = useState(true)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const animateText = () => {
      if (isTyping) {
        if (displayText.length < text.length) {
          setDisplayText(text.substring(0, displayText.length + 1))
        } else {
          // Typing complete, wait before reversing
          timerRef.current = setTimeout(() => {
            setIsTyping(false)
          }, delayBeforeReverse)
          return
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.substring(0, displayText.length - 1))
        } else {
          // Erasing complete, wait before typing again
          timerRef.current = setTimeout(() => {
            setIsTyping(true)
          }, delayBeforeReverse)
          return
        }
      }

      timerRef.current = setTimeout(animateText, speed)
    }

    timerRef.current = setTimeout(animateText, speed)

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [displayText, isTyping, text, speed, delayBeforeReverse])

  return (
    <span className="inline-block">
      {displayText}
      <span className="animate-blink text-blue-500 animate-pulse">|</span>
    </span>
  )
}
