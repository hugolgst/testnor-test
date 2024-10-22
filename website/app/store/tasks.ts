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
}

const useTasksStore = create(
  persist<TasksStore>(
    (set, get) => ({
      tasks: [],

      getTask: (id: string) => get().tasks.find(task => task.id === id)
    }),
    {
      name: 'tasks-store'
    }
  )
)

export default useTasksStore
