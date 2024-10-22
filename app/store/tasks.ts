import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Task {
  id: string
  title: string
  description?: string
  dueAt?: Date
  tags?: Array<string>
  isCompleted: boolean
}

interface TasksStore {
  tasks: Array<Task>
  /** name: color */
  tags: Record<string, string> 

  addTag: (name: string) => void

  getTask: (id: string) => Task | undefined
  /** Creates a new task with an empty title and returns its id */
  createTask: () => string 
  editTask: (task: Task) => void
  deleteTask: (id: string) => void
}

const DEFAULT_COLORS = [ '#C53030', '#ED8936', '#FAF089', '#68D391', '#4FD1C5', '#4299e1', '#B794F4', '#F687B3', '#E9D8FD', '#A0AEC0' ]

const useTasksStore = create(
  persist<TasksStore>(
    (set, get) => ({
      tasks: [],
      tags: {},

      addTag: (name: string) => set((state) => {
        if (name in state.tags) return state

        const color = DEFAULT_COLORS[Math.round(Math.random() * (DEFAULT_COLORS.length - 1))]
        state.tags[name] = color
        return { tags: { ...state.tags } }
      }),

      getTask: (id: string) => get().tasks.find(task => task.id === id),

      createTask: () => {
        const id = crypto.randomUUID()
        set((state) => {
          state.tasks.push({
            id, title: '', isCompleted: false
          })
          return { tasks: [ ...state.tasks ] } // Trick to propagate changes to the component

        })

        return id
      },

      editTask: (task: Task) => set((state) => {
        const index = state.tasks.findIndex(({ id }) => id === task.id)
        state.tasks[index] = task

        return { tasks: [ ...state.tasks ] } // Trick to propagate changes to the component
      }),

      deleteTask: (id: string) => set((state) => ({
        tasks: state.tasks.filter(task => task.id !== id)
      }))
    }),
    {
      name: 'tasks-store'
    }
  )
)

export default useTasksStore
