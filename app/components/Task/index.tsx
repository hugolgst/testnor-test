import { Checkbox, Flex, Spacer, Text, chakra } from '@chakra-ui/react'
import { useRouter, useSearchParams } from 'next/navigation'

import { ArrowForwardIcon } from '@chakra-ui/icons'
import { formatDistanceToNow } from 'date-fns'
import useTasksStore from '@/store/tasks'

interface TaskProps {
  id: string
}

const TaskComponent = ({ id }: TaskProps) => {
  const router = useRouter()
  const { getTask, editTask } = useTasksStore()
  const task = getTask(id)
  const searchParams = useSearchParams()

  if (!task) return null
  return <Flex
    w="100%"
    gap="10px"
    alignItems="center"
    cursor="pointer"
    onClick={() => {
      router.push(`?id=${task.id}`)
    }}
  >
    <Checkbox
      defaultChecked={task.isCompleted}
      onChange={(e) => {
        editTask({
          ...task,
          isCompleted: e.target.checked
        })

        if (searchParams.get('id') === task.id) {
          router.push('/')
        }
      }}
    />

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
