import { create } from 'zustand'

interface RTSWStore {
  tooltipDate?: Date,
  tooltipX?: number,
  setTooltipDate: (date: Date | undefined) => void
  setTooltipX: (x: number | undefined) => void

  // Selected part of the graph by the user to add more points in
  selection?: [number, number],
  setSelection: (value?: [number, number]) => void,
  // If the user is current selecting a part to add more points in
  isSelecting: boolean,
  setIsSelecting: (value: boolean) => void

  // Current timestamp updated every minute to keep the graph moving forward
  currentTime: number
  setCurrentTime: (time: number) => void

  // Bounds is a tuple of timestamps representing the current extent of the brush used to filter data visible
  // in line plots.
  bounds?: [ number, number ],
  setBounds: (value?: [number, number]) => void
}

const useRTSWStore = create<RTSWStore>(set => ({
  tooltipDate: undefined,
  tooltipX: undefined,

  setTooltipDate: (date: Date | undefined) => set(() => ({ tooltipDate: date })),
  setTooltipX: (x: number | undefined) => set(() => ({ tooltipX: x })),

  selection: undefined,
  setSelection: (value?: [number, number]) => set(() => ({ selection: value })),

  isSelecting: false,
  setIsSelecting: (value: boolean) => set(() => ({ isSelecting: value })),

  currentTime: new Date().getTime(),
  setCurrentTime: (time: number) => set(() => ({ currentTime: time })),

  bounds: undefined,
  setBounds: (value?: [number, number]) => set(() => ({ bounds: value }))
}))

export default useRTSWStore
