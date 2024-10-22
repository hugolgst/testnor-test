import { Button, Flex, Heading, Input, Spacer, Tag, TagCloseButton, TagLabel, Text, Textarea } from '@chakra-ui/react'

import { DeleteIcon } from '@chakra-ui/icons'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import useTasksStore from '@/store/tasks'

interface TaskEditorProps {
  id?: string | null
}

const TaskEditor = ({ id }: TaskEditorProps) => {
  const router = useRouter()
  const { editTask, getTask, deleteTask } = useTasksStore()
  const [ tagInput, setTagInput ] = useState<string>('')
  const [ tags, setTags ] = useState<Array<string>>([])

  const task = id && getTask(id)

  if (!task || !id) return null
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
      onChange={(e) => {
        editTask({
          ...task,
          title: e.target.value
        })
      }}
    />
    <Textarea 
      value={task.description}
      onChange={(e) => {
        editTask({
          ...task,
          description: e.target.value
        })
      }}
    />

    <Flex alignItems="center" gap="10px">
      <Text w="max-content" flexShrink="0">Due at:</Text>
      <Input 
        placeholder='Select Date and Time' 
        size='md' 
        type='datetime-local' 
        onChange={(e) => {
          editTask({
            ...task,
            dueAt: new Date(e.target.value)
          })
        }}
      />
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

      <Button 
        leftIcon={<DeleteIcon />} 
        colorScheme='red' 
        variant='solid'
        onClick={() => {
          deleteTask(id)
          router.push('/')
        }}
      >
        Delete
      </Button>
    </Flex>

  </Flex>
}

export default TaskEditor
