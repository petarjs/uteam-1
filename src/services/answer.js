import { backendClient } from './http';

export const postAnswer = async (questionId, profileId, answer) => {
  try {
    const response = await backendClient.post('/answers', {
      data: {
        question: questionId,
        profile: profileId,
        answer: answer,
      },
    });
    return response;
  } catch (error) {
    throw `Answer creation failed - ${error}`;
  }
};

export const putAnswer = async (profileId, answerId, questionId, answer) => {
  try {
    const response = await backendClient.put(`/answers/${answerId}`, {
      data: {
        question: questionId,
        profile: profileId,
        answer: answer,
      },
    });
    return response;
  } catch (error) {
    throw `Editing answers failed - ${error}`;
  }
};

export const getAnswers = async (profileId) => {
  try {
    const response = await backendClient.get('/answers', {
      params: {
        'filters[profile][id][$eq]': profileId,
        populate: 'question',
      },
    });
    return response;
  } catch (error) {
    throw `Getting answers failed - ${error}`;
  }
};
