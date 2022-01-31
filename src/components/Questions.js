import { Heading, VStack } from '@chakra-ui/react';
import AddQuestion from './AddQuestion';
import QuestionList from './QuestionList';
import { postQuestion } from '../services/questions';

const Questions = () => {
  const addQuestion = async (question) => {
    const response = await postQuestion(question.text, question.order);
    return response;
  };

  return (
    <VStack pt="10vh">
      <Heading
        mb={['32px !important']}
        fontWeight="extrabold"
        size="2xl"
        bgGradient="linear(to-r, #38C6BD, pink.300, #38C6BD)"
        bgClip="text"
      >
        Add your question
      </Heading>
      <QuestionList />
      <AddQuestion addQuestion={addQuestion} />;
    </VStack>
  );
};

export default Questions;
