import { create } from 'zustand'

interface MoonCalendarStore {
  start: Date,

  setStart: (date: Date) => void
}

const useMoonCalendarStore = create<MoonCalendarStore>((set) => ({
  start: new Date(),

  setStart: (date: Date) => set(() => ({ start: date })),
}))

export default useMoonCalendarStore