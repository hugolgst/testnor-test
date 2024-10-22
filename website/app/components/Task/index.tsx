import { Checkbox, Flex, Spacer, Text } from '@chakra-ui/react'

import { ArrowForwardIcon } from '@chakra-ui/icons'

export interface Task {
  title: string
  description?: string
  dueAt?: Date
  tags?: Array<string>
  isCompleted: boolean
}

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

    <ArrowForwardIcon h={6} w={6} />
  </Flex>
}

export default TaskComponent
