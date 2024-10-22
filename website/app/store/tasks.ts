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

  getTask: (id: string) => Task | undefined
  /** Creates a new task with an empty title and returns its id */
  createTask: () => string 
}

const useTasksStore = create(
  persist<TasksStore>(
    (set, get) => ({
      tasks: [],

      getTask: (id: string) => get().tasks.find(task => task.id === id),

      createTask: () => {
        const id = crypto.randomUUID()
        set((state) => {
          state.tasks.push({
            id, title: '', isCompleted: false
          })
          return { tasks: state.tasks }
        })

        return id
      }
    }),
    {
      name: 'tasks-store'
    }
  )
)

export default useTasksStore
