'use client'
import React, { useEffect, useRef, useState } from 'react'
import Stories from '../Stories/Stories'

const ScrollDetect = () => {
  const [currentDiv, setCurrentDiv] = useState(null)
  const observerRef = useRef(null)

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      // threshold: 0.5, // 50% gosterilen element
    }

    const handleIntersect = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setCurrentDiv(entry.target.id)
          console.log(entry.target.id)
        }
      })
    }

    observerRef.current = new IntersectionObserver(handleIntersect, options)

    const divs = document.querySelectorAll('.scrollable-div')
    divs.forEach((div) => observerRef.current.observe(div))

    return () => {
      observerRef.current.disconnect()
    }
  }, [])

  return (
    <>
      <Stories />
      {[...Array(33)].map((_, i) => {
        return (
          <div id={i} className="scrollable-div h-[1000px]">
            <p>
              Div {i + 1} - Lorem ipsum dolor sit amet, consectetur adipiscing
              elit. Sed eget quam nec dolor blandit scelerisque.
            </p>
          </div>
        )
      })}
    </>
  )
}

export default ScrollDetect
