import React, { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

const INITIAL_USERS = [
  {
    name: 'Dr. Mukesh',
    email: 'doctor@medora.ai',
    password: 'demo123',
    specialty: 'Radiology & Internal Medicine',
    initials: 'DM',
  },
]

export function AuthProvider({ children }) {
  const [doctor, setDoctor] = useState(() => {
    const saved = sessionStorage.getItem('medora_session') || localStorage.getItem('medora_session')
    return saved ? JSON.parse(saved) : null
  })

  const getUsers = () => {
    const stored = localStorage.getItem('medora_users')
    if (!stored) {
      localStorage.setItem('medora_users', JSON.stringify(INITIAL_USERS))
      return INITIAL_USERS
    }
    return JSON.parse(stored)
  }

  const login = (email, password, remember = true) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = getUsers()
        const user = users.find(
          (u) => u.email.trim().toLowerCase() === email.trim().toLowerCase() && u.password === password
        )

        if (user) {
          const userSession = {
            name: user.name,
            email: user.email,
            specialty: user.specialty || 'Clinical Specialist',
            initials: user.initials || user.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2),
          }
          if (remember) {
            localStorage.setItem('medora_session', JSON.stringify(userSession))
          }
          sessionStorage.setItem('medora_session', JSON.stringify(userSession))
          setDoctor(userSession)
          resolve(userSession)
        } else {
          reject(new Error('Invalid email or password. Please check your credentials or create an account.'))
        }
      }, 500)
    })
  }

  const register = (userData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = getUsers()
        const existing = users.find(
          (u) => u.email.trim().toLowerCase() === userData.email.trim().toLowerCase()
        )

        if (existing) {
          reject(new Error('An account with this email address already exists. Please sign in instead.'))
          return
        }

        const initials = userData.name
          .replace(/^Dr\.\s*/i, '')
          .split(' ')
          .map((n) => n[0])
          .join('')
          .toUpperCase()
          .slice(0, 2) || 'MD'

        const newUser = {
          name: userData.name.startsWith('Dr.') ? userData.name : `Dr. ${userData.name}`,
          email: userData.email.trim().toLowerCase(),
          password: userData.password,
          specialty: userData.specialty || 'General Medicine',
          initials: initials,
        }

        const updated = [...users, newUser]
        localStorage.setItem('medora_users', JSON.stringify(updated))

        const userSession = {
          name: newUser.name,
          email: newUser.email,
          specialty: newUser.specialty,
          initials: newUser.initials,
        }

        sessionStorage.setItem('medora_session', JSON.stringify(userSession))
        localStorage.setItem('medora_session', JSON.stringify(userSession))
        setDoctor(userSession)
        resolve(userSession)
      }, 600)
    })
  }

  const logout = () => {
    sessionStorage.removeItem('medora_session')
    localStorage.removeItem('medora_session')
    setDoctor(null)
  }

  return (
    <AuthContext.Provider value={{ doctor, login, register, logout, isAuthenticated: !!doctor }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
