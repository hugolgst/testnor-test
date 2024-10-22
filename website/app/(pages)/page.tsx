'use client'

import { Flex, Heading, chakra } from '@chakra-ui/react'

import CreateTask from '@/components/Task/CreateTask'
import TaskComponent from '@/components/Task'
import TaskEditor from '@/components/Task/Editor'
import { useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import useTasksStore from '@/store/tasks'

const Page = () => {
  const { tasks } = useTasksStore()

  const tomorrow = useMemo(() => {
    const tomorrow = new Date()
    tomorrow.setHours(tomorrow.getHours() + (24 - tomorrow.getHours()))
    return tomorrow
  }, [])

  const uncompletedTasks = useMemo(() => tasks.filter(task => !task.isCompleted), [ tasks ])
  const todaysTasks = useMemo(() => uncompletedTasks.filter(task => {
    if (!task.dueAt) return true
    return task.dueAt.getTime() < tomorrow.getTime()
  }), [ uncompletedTasks, tomorrow ])
  const laterTasks = useMemo(() => uncompletedTasks.filter(task => task.dueAt && task.dueAt.getTime() >= tomorrow.getTime()), [ uncompletedTasks, tomorrow ])

  const searchParams = useSearchParams()

  return <Flex
    w="100vw" h="100vh"
    gap="20px"
    p="40px"
  >
    <Flex 
      flex="1" h="100%"
    >

    </Flex>

    {/* TASK LIST */}
    <Flex 
      flex="2" h="100%"
      gap="20px"
      direction="column"
    >
      <Heading size="2xl">
        Today <chakra.span fontSize="0.6em" color="grey">({todaysTasks.length})</chakra.span>
      </Heading>

      <Flex 
        w="100%"
        direction="column" 
        gap="10px"
      >
        <CreateTask />

        {todaysTasks.map((task, i) => (<TaskComponent key={i} id={task.id} />))}
      </Flex>

      <Heading size="2xl">
        Later <chakra.span fontSize="0.6em" color="grey">({laterTasks.length})</chakra.span>
      </Heading>

      <Flex 
        w="100%"
        direction="column" 
        gap="10px"
      >
        {laterTasks.map((task, i) => (<TaskComponent key={i} id={task.id} />))}
      </Flex>
    </Flex>

    <Flex 
      flex="2" h="100%"
    >
      <TaskEditor id={searchParams.get('id')} />
    </Flex>
  </Flex>
}

export default Page
