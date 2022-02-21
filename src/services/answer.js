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
