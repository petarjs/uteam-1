import { Button, HStack, Input, Text, Select } from '@chakra-ui/react';

import { useForm } from 'react-hook-form';
import { useQuestionContext } from './QuestionContextProvider';

const AddQuestion = ({ addQuestion }) => {
  const { questions, setQuestions, maximumOrder, setMaximumOrder } = useQuestionContext();

  const {
    register,
    handleSubmit,
    reset,

    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();

    const question = {
      formData,
      text: data.text,
      option: data.option,
      order: maximumOrder + 1,
      company: window.localStorage.getItem('companyId'),
    };

    setMaximumOrder(maximumOrder + 1);

    try {
      const createdQuestion = await addQuestion(question);

      setQuestions([...questions, createdQuestion.data]);

      reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <HStack mt="8">
        <Input
          variant="filled"
          placeholder="Post your question here"
          type="text"
          {...register('text', { required: true })}
        />
        <Button bg="#87d4cd" px="8" type="submit" color="white" cursor="pointer">
          Add Question
        </Button>
      </HStack>
      {errors.text && (
        <Text color="red" fontSize="15px" mt={3}>
          This field is required
        </Text>
      )}
      <Select
        color="gray.400"
        mt="30px"
        variant="filled"
        w="67%"
        placeholder="Select question type"
        {...register('option', { required: true })}
      >
        <option value="text">Text</option>
        <option value="long_text">Long text</option>
        <option value="image">Image</option>
      </Select>
      {errors.option && (
        <Text color="red" fontSize="15px" mt={3}>
          This field is required
        </Text>
      )}
    </form>
  );
};

export default AddQuestion;
