import {
  VStack,
  Text,
  Box,
  Button,
  Input,
  InputGroup,
  Textarea,
  FormLabel,
  HStack,
  Image,
  Flex,
} from '@chakra-ui/react';
import { useQuestionContext } from './QuestionContextProvider';
import { useForm } from 'react-hook-form';
import { useRef, useState, useEffect } from 'react';
import { MdOutlineNearbyError } from 'react-icons/md';
import { getPhoto, uploadPhoto } from '../services/upload';
import { putAnswer, postAnswer } from '../services/answer';

const EditAnswers = () => {
  const { questions, handleGetQuestions, handleGetAnswers, answers } = useQuestionContext();
  const { register, handleSubmit } = useForm();
  const filePicker = useRef(null);
  const [files, setFiles] = useState([]);
  const [mappedAnswers, setMappedAnswers] = useState(new Map());

  handleGetQuestions();
  handleGetAnswers();

  useEffect(async () => {
    const answersMap = new Map();
    try {
      for (let answer of answers) {
        if (answer.attributes.question.data.attributes.type === 'image') {
          let imageUrl = await getPhoto(parseInt(answer.attributes.answer));
          answersMap.set(
            answer.attributes.question.data.id,
            `http://localhost:1337${imageUrl.data.url}`
          );
        } else {
          answersMap.set(answer.attributes.question.data.id, answer.attributes.answer);
        }
      }
      setMappedAnswers(answersMap);
      return;
    } catch (error) {
      return;
    }
  }, [answers]);

  const handleFileUpload = (e) => {
    setFiles((currentPickedFiles) => {
      let newFiles = [...currentPickedFiles];
      newFiles = newFiles.filter(
        (element) => element.questionId != e.target.getAttribute('questionid')
      );
      newFiles.push({ questionId: e.target.getAttribute('questionid'), file: e.target.files });
      return newFiles;
    });
  };

  const onSubmit = async (data) => {
    if (answers.length) {
      answers.forEach(async (answer) => {
        let profileId = window.localStorage.getItem('currentProfileId');
        let questionId = answer.attributes.question.data.id;
        let answerId = answer.id;
        let updatedAnswer = data[questionId];
        // If it is a picture
        if (updatedAnswer === undefined) {
          let formData = new FormData();
          let selectedFile = files.filter((element) => element.questionId == questionId)[0].file[0];
          formData.append('files', selectedFile);
          const photoResponse = await uploadPhoto(formData);
          const photoId = photoResponse.data[0].id;
          updatedAnswer = photoId.toString();
        }

        let response = await putAnswer(profileId, answerId, questionId, updatedAnswer);
      });
    } else {
      questions.forEach(async (question) => {
        let profileId = window.localStorage.getItem('currentProfileId');
        let questionId = question.id;
        let updatedAnswer = data[questionId];
        // If it is a picture
        if (updatedAnswer === undefined) {
          let formData = new FormData();
          let selectedFile = files.filter((element) => element.questionId == questionId)[0].file[0];
          formData.append('files', selectedFile);
          const photoResponse = await uploadPhoto(formData);
          const photoId = photoResponse.data[0].id;
          updatedAnswer = photoId.toString();
        }

        let response = await postAnswer(questionId, profileId, updatedAnswer);
      });
    }
  };

  return (
    <VStack
      pb="20px"
      bg="#87d4cd"
      borderRadius="15px"
      w="35vw"
      position="relative"
      border="4px solid white"
    >
      <Box bg="gray.200" borderRadius="10px" w="100%" p="10px" mb="10px">
        <Text alignSelf="flex-start" color="#3e9e98" fontWeight="bold" fontSize="20px">
          Answers
        </Text>
      </Box>

      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack>
          {questions.map((question, index) => (
            <VStack key={index} alignItems="flex-start" w="100%">
              <Text color="white">{question.attributes.text}</Text>
              {question.attributes.type === 'text' ? (
                <Box w="100%" borderBottom="2px solid white" pb="30px" justifyContent="center">
                  <Input
                    bg="white"
                    borderColor="white"
                    type="text"
                    w="100%"
                    defaultValue={mappedAnswers.get(question.id)}
                    {...register(`${question.id}`, { required: true })}
                  ></Input>
                </Box>
              ) : null}

              {question.attributes.type === 'long_text' ? (
                <Box w="100%" borderBottom="2px solid white" pb="30px">
                  <Textarea
                    bg="white"
                    borderColor="white"
                    type="text"
                    defaultValue={mappedAnswers.get(question.id)}
                    {...register(`${question.id}`, { required: true })}
                  ></Textarea>
                </Box>
              ) : null}
              {question.attributes.type === 'image' ? (
                <Box w="100%" borderBottom="2px solid white" pb="30px">
                  <HStack>
                    {mappedAnswers.get(question.id) ? (
                      <Image
                        h="150px"
                        w="auto"
                        src={mappedAnswers.get(question.id)}
                        alt="Profile photo"
                      ></Image>
                    ) : (
                      <Flex h="150px" w="150px" bg="white">
                        <VStack>
                          <MdOutlineNearbyError fontSize="150px" color="gray" />
                          <Text fontWeight="bold" color="gray">
                            No photo
                          </Text>
                        </VStack>
                      </Flex>
                    )}

                    <InputGroup
                      justifyContent="space-between"
                      alignItems="center"
                      mt="2"
                      border="1px solid"
                      borderColor="#2FE1D6"
                      borderRadius="5"
                      p={1.5}
                      bg="white"
                    >
                      <FormLabel
                        htmlFor="file-upload"
                        fontSize="14"
                        color="#CBD5E0"
                        fontWeight="semibold"
                      ></FormLabel>
                      <Button
                        _focus="outline-none"
                        _hover={{
                          background: '#2FE1D6',
                        }}
                        color="white"
                        textShadow="1px 1px #e0e0e0"
                        bg="#2FE1D6"
                        h="1.75rem"
                        size="sm"
                        onClick={() => {
                          filePicker.current.click();
                        }}
                      >
                        Choose Photo
                      </Button>
                      <Input
                        type="file"
                        questionid={question.id}
                        ref={filePicker}
                        onChange={handleFileUpload}
                        d="none"
                      />
                    </InputGroup>
                  </HStack>
                </Box>
              ) : null}
            </VStack>
          ))}
          <Button type="submit">Save</Button>
        </VStack>
      </form>
    </VStack>
  );
};

export default EditAnswers;
