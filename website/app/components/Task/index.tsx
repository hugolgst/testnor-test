import { Checkbox, Flex, Spacer, Text, chakra } from '@chakra-ui/react'

import { ArrowForwardIcon } from '@chakra-ui/icons'
import { Task } from '@/store/tasks'
import { formatDistanceToNow } from 'date-fns'
import { useRouter } from 'next/navigation'

interface TaskProps {
  task: Task 
}

const TaskComponent = ({ task }: TaskProps) => {
  const router = useRouter()

  return <Flex
    w="100%"
    gap="10px"
    alignItems="center"
    cursor="pointer"
    onClick={() => {
      router.push(`?id=${task.id}`)
    }}
  >
    <Checkbox />

    <Flex alignItems="center" w="100%">
      <Text fontSize="1.4em">
        {task.title}
      </Text>

      <Spacer />

      { task.dueAt && <chakra.span fontSize="0.8em" color="grey">(due {formatDistanceToNow(task.dueAt, { addSuffix: true })})</chakra.span> }
    </Flex>

    <Spacer />

    <ArrowForwardIcon 
      cursor="pointer"
      h={6} w={6} 
    />
  </Flex>
}

export default TaskComponent
