import { Checkbox, Flex, Spacer, Text } from '@chakra-ui/react'

import { ArrowForwardIcon } from '@chakra-ui/icons'
import { Task } from '@/store/tasks'

interface TaskProps {
  task: Task 
}

const TaskComponent = ({ task }: TaskProps) => {
  return <Flex
    w="100%"
    gap="10px"
    alignItems="center"
  >
    <Checkbox />

    <Text fontSize="1.4em">
      {task.title}
    </Text>

    <Spacer />

    <ArrowForwardIcon 
      cursor="pointer"
      h={6} w={6} 
    />
  </Flex>
}

export default TaskComponent
