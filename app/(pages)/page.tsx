'use client'

import { Flex, Heading, chakra } from '@chakra-ui/react'
import { useMemo, useState } from 'react'

import CreateTask from '@/components/Task/CreateTask'
import TagList from '@/components/Tag'
import TaskComponent from '@/components/Task'
import TaskEditor from '@/components/Task/Editor'
import { useSearchParams } from 'next/navigation'
import useTasksStore from '@/store/tasks'

/*
 * Thank you all at Testnor for allowing me to complete this exercice!
 *
 * I am looking forward to our next chat and hopefully to working with you soon
 * Best wishes, Hugo
 */
const Page = () => {
  const { tasks } = useTasksStore()
  const [ activeTags, setActiveTags ] = useState<Array<string>>([])

  const tomorrow = useMemo(() => {
    const tomorrow = new Date()
    tomorrow.setHours(tomorrow.getHours() + (24 - tomorrow.getHours()))
    return tomorrow
  }, [])

  const uncompletedTasks = useMemo(() => tasks.filter(task => !task.isCompleted), [ tasks ])
  const filteredTasks = useMemo(() => uncompletedTasks.filter(task => 
    activeTags.length ? (task.tags ?? []).some(element => activeTags.includes(element)) : true
  ), [ activeTags, uncompletedTasks ])

  const todaysTasks = useMemo(() => filteredTasks.filter(task => {
    if (!task.dueAt) return true
    return task.dueAt.getTime() < tomorrow.getTime()
  }), [ filteredTasks, tomorrow ])
  const laterTasks = useMemo(() => filteredTasks.filter(task => task.dueAt && task.dueAt.getTime() >= tomorrow.getTime()), [ filteredTasks, tomorrow ])

  const searchParams = useSearchParams()

  return <Flex
    w="100vw" h="100vh"
    gap="20px"
    p="40px"
  >
    <Flex 
      flex="1" h="100%"
    >
      <TagList activeTags={activeTags} setActiveTags={setActiveTags} />
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
