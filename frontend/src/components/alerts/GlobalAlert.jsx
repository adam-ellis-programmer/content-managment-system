import React, { useRef } from 'react'
import { useEffect } from 'react'

const GlobalAlert = () => {
  const alertRef = useRef()
  useEffect(() => {
    return () => {}
  }, [])
  return (
    <div ref={alertRef} tabIndex={-1} className='global-alert-div'>
      <p>You cannot perform this action as a demo user!</p>
    </div>
  )
}

export default GlobalAlert
