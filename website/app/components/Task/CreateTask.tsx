import { Flex, Heading } from '@chakra-ui/react'
import { PlusSquareIcon } from '@chakra-ui/icons'

interface CreateTaskProps {
  onOpen: () => void
}

const CreateTask = ({ onOpen }: CreateTaskProps) => {
  return <Flex
    p="10px"
    gap="10px"
    backgroundColor="gray.100"
    cursor="pointer"
    transition=".3s"
    _hover={{
      backgroundColor: 'gray.200'
    }}
    alignItems="center"
    borderRadius="10px"
    onClick={onOpen}
  >
    <PlusSquareIcon w={6} h={6} />

    <Heading fontSize="1.4em">
      Create new task
    </Heading>
  </Flex>
}

export default CreateTask
