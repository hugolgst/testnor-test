import { create } from 'zustand'
import { jwtDecode } from 'jwt-decode'
import { persist } from 'zustand/middleware'

interface UserStore {
  // Geo location
  userLocation: [number, number] | null
  setLocation: (location: [number, number] | null) => void
  getLocation: () => [number, number] // Fallsback to europe if user did not allow location
  fetchLocation: () => void

  // Auth
  getUsername: () => string | null
  getRole: () => number
  loggedIn: () => boolean
}

interface Token {
  name: string
  role: number
}

const useUserStore = create(
  persist<UserStore>(
    (set, get) => ({
      userLocation: null,

      setLocation: (location: [ number, number ] | null) => {
        set(() => ({
          userLocation: location
        }))
      },
      getLocation: () => {
        if (!get().userLocation) get().fetchLocation()
        return get().userLocation ?? [ 8, 47 ]
      },
      fetchLocation: () => {
        if (typeof window !== 'undefined' && navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              set(() => ({ userLocation: [ position.coords.longitude, position.coords.latitude ] }))
            },
            () => { return },
            {
              enableHighAccuracy: false,
              timeout: 5000,
              maximumAge: Infinity
            }
          )
        } else {
          console.error('Geolocation is not supported by this browser.')
        }
      },

      getUsername: () => {
        const token = localStorage.getItem('token')
        if (!token) return null
        return jwtDecode<Token>(token).name
      },
      getRole: () => {
        const token = localStorage.getItem('token')
        if (!token) return 0 
        return jwtDecode<Token>(token).role 
      },
      loggedIn: () => Boolean(localStorage.getItem('token')),
    }),
    {
      name: 'user-store'
    }
  )
)

export default useUserStore
