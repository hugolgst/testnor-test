'use client'

import { Flex, Heading, chakra, useDisclosure } from '@chakra-ui/react'

import CreateTask from '@/components/Task/CreateTask'
import { Task } from '@/store/tasks'
import TaskComponent from '@/components/Task'

const Page = () => {
  const { onOpen } = useDisclosure()
  const tasks = [
    {
      id:'t',
      title: 'Research content ideas',
      isCompleted: false
    }
  ] as Array<Task>

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
        Today <chakra.span fontSize="0.6em" color="grey">(5)</chakra.span>
      </Heading>

      <Flex 
        w="100%"
        direction="column" 
        gap="10px"
      >
        <CreateTask onOpen={onOpen} />

        {tasks.map((task, i) => (<TaskComponent key={i} task={task} />))}
      </Flex>
    </Flex>

    <Flex 
      flex="2" h="100%"
    >

    </Flex>
  </Flex>
}

export default Page
