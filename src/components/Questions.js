import { Heading, VStack } from '@chakra-ui/react';
import AddQuestion from './AddQuestion';
import QuestionList from './QuestionList';
import { postQuestion } from '../services/questions';

const Questions = () => {
  const addQuestion = async (question) => {
    const response = await postQuestion(
      question.text,
      question.option,
      question.order,
      question.company
    );
    return response;
  };

  return (
    <VStack pt="14vh">
      <Heading
        mb={['32px !important']}
        fontWeight="bold"
        size="2xl"
        bgGradient="linear(to-r, #87d4cd, #38C6BD, #87d4cd)"
        bgClip="text"
        position="relative"
        zIndex="1"
        pb="6px"
      >
        Questions
      </Heading>
      <QuestionList />
      <AddQuestion addQuestion={addQuestion} />;
    </VStack>
  );
};

export default Questions;
