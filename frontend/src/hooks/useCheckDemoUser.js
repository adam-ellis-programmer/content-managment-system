import { useState, useMemo, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setGlobalAlert } from '../features/auth/authSlice'

const useCheckDemoUser = () => {
  const dispatch = useDispatch()
  const isDemoUser = (msg = 'test msg') => {
    const user = JSON.parse(localStorage.getItem('user')).isDemoUser
    console.log(user)
    if (user) {
      // set
      dispatch(setGlobalAlert(true))
      // un-set
      setTimeout(() => {
        dispatch(setGlobalAlert(false))
      }, 3000)
      return user
    }
    return false
  }

  return {
    isDemo: isDemoUser,
  }
}

export default useCheckDemoUser
