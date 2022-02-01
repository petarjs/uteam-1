import { backendClient } from './http';

export const postQuestion = async (question, option, order) => {
  try {
    const response = await backendClient.post('/questions', {
      data: {
        text: question,
        type: option,
        order: order,
      },
    });
    return response.data;
  } catch (error) {
    throw `Unable to post question: ${error}`;
  }
};

export const getQuestions = async () => {
  try {
    const response = await backendClient.get('/questions');
    return response.data;
  } catch (error) {
    throw `Unable to get questions: ${error}`;
  }
};

export const deleteQuestions = async (id) => {
  try {
    await backendClient.delete(`/questions/${id}`);
  } catch (error) {
    throw `Unable to delete question: ${error}`;
  }
};
