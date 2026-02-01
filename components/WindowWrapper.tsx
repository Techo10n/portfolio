"use client"

import { useState, useEffect, ReactNode } from "react"

interface WindowWrapperProps {
  children: ReactNode
  isOpen: boolean
}

export default function WindowWrapper({ children, isOpen }: WindowWrapperProps) {
  const [isAnimating, setIsAnimating] = useState(false)
  const [shouldRender, setShouldRender] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true)
      // Small delay to ensure the element is in the DOM before animating
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsAnimating(true)
        })
      })
    } else {
      setIsAnimating(false)
      // Wait for animation to complete before unmounting
      const timeout = setTimeout(() => {
        setShouldRender(false)
      }, 300)
      return () => clearTimeout(timeout)
    }
  }, [isOpen])

  if (!shouldRender) return null

  return (
    <div
      className={`w-full h-full transition-all duration-300 ease-out ${
        isAnimating ? "scale-100 opacity-100" : "scale-75 opacity-0"
      }`}
    >
      {children}
    </div>
  )
}
