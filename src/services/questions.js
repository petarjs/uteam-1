import { backendClient } from './http';

export const postQuestion = async (question, option, order, companyId) => {
  try {
    const response = await backendClient.post('/questions', {
      data: {
        text: question,
        type: option,
        order: order,
        company: companyId,
      },
    });
    return response.data;
  } catch (error) {
    throw `Unable to post question: ${error}`;
  }
};

export const getQuestions = async (companyId) => {
  try {
    const response = await backendClient.get('/questions', {
      params: {
        'filters[company][id][$eq]': companyId,
        populate: ['company'],
      },
    });
    return response.data;
  } catch (error) {
    throw `Unable to get questions: ${error}`;
  }
};

export const getAllQuestions = async () => {
  try {
    const response = await backendClient.get('/questions');
    return response;
  } catch (error) {
    throw `Unable to get all questions: ${error}`;
  }
};

export const deleteQuestions = async (id) => {
  try {
    await backendClient.delete(`/questions/${id}`);
  } catch (error) {
    throw `Unable to delete question: ${error}`;
  }
};

export const editQuestion = async (id, question, option) => {
  try {
    const response = await backendClient.put(`/questions/${id}`, {
      data: {
        text: question,
        type: option,
      },
    });
    return response;
  } catch (error) {
    throw `Unable to edit question: ${error}`;
  }
};

export const changeQuestionOrder = async (id, newOrder) => {
  try {
    await backendClient.put(`/questions/${id}`, {
      data: {
        order: newOrder,
      },
    });
  } catch (error) {
    throw `Unable to reorder question: ${error}`;
  }
};
