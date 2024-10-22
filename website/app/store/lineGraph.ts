import { create } from 'zustand'

interface LineGraphStore {
  filteredData: Record<string, Record<string, unknown>>,
  tooltipData: Record<string, Record<string, unknown> | undefined>,
  setFilteredData: (id: string, data: Record<string, unknown>) => void
  setTooltipData: (id: string, data: Record<string, unknown> | undefined) => void
}

const useLineGraphStore = create<LineGraphStore>((set, get) => ({
  filteredData: {},
  tooltipData: {},

  setFilteredData: (id, data) => set(() => ({ 
    filteredData: {
      ...get().filteredData,
      [id]: data
    } 
  })),
  setTooltipData: (id, data) => set(() => ({ 
    tooltipData: {
      ...get().tooltipData,
      [id]: data
    } 
  })),
}))

export default useLineGraphStore