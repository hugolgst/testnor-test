import { Layout, Layouts } from 'react-grid-layout'

import { create } from 'zustand'

const defaultPageName = 'Untitled Page :)'
const localStorageKey = 'dashboard-layouts'
const localStorageAppsKey = 'dashboard-apps'

/**
 * Stores the different layouts in a record where the key is the page name
 * As much pages as needed can be created by the user and the current page 
 * must always be updated in the store to keep the behaviours consitent throughout the actions
 */
type Pages = Record<string, Layouts>
type Apps = Record<string, Array<string>>

interface DashboardStore {
  toolboxVisible: boolean,
  apps: Apps, // pages -> apps 
  pagesLayouts: Pages,
  currentPage: number,
  drawerOpen: boolean,

  toggleToolbox: () => void,
  setDrawerOpen: (open: boolean) => void,

  pages: () => Array<string>,
  savePages: (pagesLayouts: Pages) => void,

  updateCurrentPage: (page: number) => void
  deletePage: (pageName: string) => void
  createPage: () => void
  changePageName: (old: string, _new: string) => void
  
  updateLayouts: (currentLayout: Array<Layout>, allLayouts: Layouts) => void
  currentLayout: () => Layouts,

  saveApps: (apps: Apps) => void
  removeApp: (key: string) => void
  addApp: (key: string) => void,
  currentApps: () => Array<string>
}

const getLSPages = () => typeof window !== 'undefined' ? window?.localStorage.getItem(localStorageKey) : null
const getLSApps = () => typeof window !== 'undefined' ? window?.localStorage.getItem(localStorageAppsKey) : null

const useDashboardStore = create<DashboardStore>((set, get) => ({
  toolboxVisible: false,
  currentPage: 0,
  apps: (getLSApps() ? JSON.parse(getLSApps()!) : { [defaultPageName]: [] }) as Apps,
  pagesLayouts: (getLSPages() ? JSON.parse(getLSPages()!) : { [defaultPageName]: {} }) as Pages,
  drawerOpen: false,

  toggleToolbox: () => set(() => ({ toolboxVisible: !get().toolboxVisible })),
  setDrawerOpen: (open: boolean) => set(() => ({ drawerOpen: open })),

  pages: () => Object.keys(get().pagesLayouts),
  savePages: (pagesLayouts: Pages) => set(() => {
    if (typeof window === 'undefined') return {}
    window?.localStorage.setItem(localStorageKey, JSON.stringify(pagesLayouts))
    return { pagesLayouts }
  }),
  
  updateCurrentPage: (index: number) => set({ currentPage: index }),
  deletePage: (pageName: string) => {
    const { pagesLayouts, apps } = get()
    delete pagesLayouts[pageName]
    delete apps[pageName]
    get().savePages(pagesLayouts)
    get().saveApps(apps)
    set({ currentPage: 0 })
  },
  createPage: () => {
    const { pagesLayouts } = get()

    get().savePages({
      ...pagesLayouts,
      [`${defaultPageName} ${Object.keys(pagesLayouts).length + 1}`]: {}
    })
  },
  changePageName: (old: string, _new: string) => {
    const { pagesLayouts: oldPagesLayouts } = get()
    if (_new === '' || _new === old) return
  
    const pagesLayouts: Pages = Object.keys(oldPagesLayouts).reduce((acc, key) => {
      if (key === old) {
        acc[_new] = oldPagesLayouts[old]
      } else {
        acc[key] = oldPagesLayouts[key]
      }
      return acc
    }, {} as Pages)
  
    get().savePages(pagesLayouts)
  },

  /**
   * Designed to be fed directly to react grid layout's onLayoutChange event
   * Will assign the new layout to the current page
   * 
   * @param currentLayout 
   * @param allLayouts 
   * @returns 
   */
  updateLayouts: (currentLayout: Array<Layout>, allLayouts: Layouts) => {
    const { currentPage, pagesLayouts } = get()
    get().savePages({
      ...pagesLayouts,
      [Object.keys(pagesLayouts)[currentPage]]: allLayouts
    })
  },
  currentLayout: () => Object.values(get().pagesLayouts)[get().currentPage] || ({} as Layouts),

  saveApps: (apps: Apps) => {
    if (typeof window === 'undefined') return {}
    window?.localStorage.setItem(localStorageAppsKey, JSON.stringify(apps))
    set({ apps })
  },
  removeApp: (key: string) => {
    const { apps, pages } = get()
    const current = pages()[get().currentPage]
    apps[current] = apps[current].filter(app => app !== key)
    
    get().saveApps(apps)
  },
  addApp: (key: string) => {
    let apps = get().apps
    const pages = get().pages()
    const pageName = pages[get().currentPage]

    if (!apps[pageName]) {
      apps = { ...apps, [pageName]: [] }
    }

    apps[pageName].push(key)
    get().saveApps(apps)
  },
  currentApps: () => get().apps[get().pages()[get().currentPage]] ?? []
}))

export default useDashboardStore
