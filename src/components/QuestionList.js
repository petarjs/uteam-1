import {
  HStack,
  VStack,
  Text,
  IconButton,
  StackDivider,
  Spacer,
  Badge,
  Button,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import { CgArrowAlignV } from 'react-icons/cg';
import { useQuestionContext } from './QuestionContextProvider';
import { deleteQuestions } from '../services/questions';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const QuestionList = () => {
  const { questions, setQuestions, handleGetQuestions } = useQuestionContext();
  handleGetQuestions();
  if (!questions.length) {
    return (
      <Badge colorScheme="green" p="4" m="4" borderRadius="lg">
        No Questions yet!
      </Badge>
    );
  }
  const deleteQuestion = (id) => {
    deleteQuestions(id);
    const newQuestions = questions.filter((question) => {
      return question.id !== id;
    });
    setQuestions(newQuestions);
  };

  const setQuestion = async (id, text) => {
    window.localStorage.setItem('questionId', id);
    window.localStorage.setItem('questionText', text);
  };

  return (
    <DragDropContext
      onDragEnd={(param) => {
        const sourceIndex = param.source.index;
        const destinationIndex = param.destination.index;
        questions.splice(destinationIndex, 0, questions.splice(sourceIndex, 1)[0]);
      }}
    >
      <Droppable droppableId="droppable-1">
        {(provided) => (
          <VStack
            ref={provided.innerRef}
            {...provided.droppableProps}
            divider={<StackDivider />}
            borderColor="gray.100"
            borderWidth="2px"
            p="4"
            borderRadius="lg"
            w="100%"
            maxW={{ base: '90vw', sm: '80vw', lg: '50vw', xl: '40vw' }}
            alignItems="stretch"
          >
            {questions.map((questions, questionNumber = 0) => (
              <Draggable
                key={questions.id}
                draggableId={'draggable-' + questions.id}
                index={questionNumber}
              >
                {(provided, snapshot) => (
                  <HStack
                    key={questions.id}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                      ...provided.draggableProps.style,
                      boxShadow: snapshot.isDragging ? '0 0 .4rem #555' : 'none',
                    }}
                  >
                    <IconButton icon={<CgArrowAlignV />} bg="gray.100" isRound="true" mr="10px" />
                    <VStack alignItems="flex-start">
                      <Text fontSize="10px" color="gray.300">
                        Question {questionNumber + 1} - {questions.attributes.type}
                      </Text>

                      <Text>{questions.attributes.text}</Text>
                    </VStack>

                    <Spacer />
                    <Link to="/editQuestions">
                      <Button onClick={() => setQuestion(questions.id, questions.attributes.text)}>
                        Edit
                      </Button>
                    </Link>

                    <IconButton
                      icon={<FaTrash />}
                      isRound="true"
                      onClick={() => deleteQuestion(questions.id)}
                    />
                  </HStack>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </VStack>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default QuestionList;
