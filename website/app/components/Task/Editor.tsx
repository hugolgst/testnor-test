import { Button, Flex, Heading, Input, Spacer, Tag, TagCloseButton, TagLabel, Text, Textarea } from '@chakra-ui/react'

import { DeleteIcon } from '@chakra-ui/icons'
import { Task } from '@/store/tasks'
import { useState } from 'react'

interface TaskEditorProps {
  task: Task
}

const TaskEditor = ({ task }: TaskEditorProps) => {
  const [ tagInput, setTagInput ] = useState<string>('')
  const [ tags, setTags ] = useState<Array<string>>([])

  return <Flex
    w="100%" h="100%"
    direction="column"

    backgroundColor="gray.100"
    borderRadius="10px"
    p="30px"
    gap="20px"
  >
    <Heading>Task</Heading>

    <Input 
      value={task.title}
    />
    <Textarea 
      value={task.description}
    />

    <Flex alignItems="center" gap="10px">
      <Text w="max-content" flexShrink="0">Due at:</Text>
      <Input placeholder='Select Date and Time' size='md' type='datetime-local' />
    </Flex>

    <Flex direction="column">
      <Flex alignItems="center" gap="10px">
        <Text w="max-content" flexShrink="0">Tags:</Text>
        <Input 
          value={tagInput}
          onChange={(e) => {
            setTagInput(e.target.value)
          }}
        />
        <Button onClick={() => {
          setTags([ 
            ...tags,
            tagInput
          ])
          setTagInput('')
        }}>Add tag</Button>
      </Flex>

      <Flex alignItems="center" gap="10px">
        {tags.map((tag, i) => (<Tag
          key={i}
        >
          <TagLabel>{tag}</TagLabel>
          <TagCloseButton 
            cursor="pointer"
            onClick={() => {
              setTags(tags.filter(_tag => _tag !== tag))
            }}
          />
        </Tag>))}
      </Flex>
    </Flex>

    <Spacer />

    <Flex gap="10px">
      <Spacer />

      <Button leftIcon={<DeleteIcon />} colorScheme='red' variant='solid'>
        Delete
      </Button>

      <Button variant='solid'>
        Save
      </Button>
    </Flex>

  </Flex>
}

export default TaskEditor
