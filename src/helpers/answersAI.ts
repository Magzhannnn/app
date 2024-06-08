import openai from "./useOpenAi";

export const helperAnswerAI = async (
  title: string,
  description: string
) => {
  const content = `Title: ${title}; Description: ${description}`;

  const chatCompetion = openai.chat.completions.create({
    messages: [{ role: "user", content }],
    model: "gpt-3.5-turbo",
  });

  // const data = `“${(await chatCompetion).choices[0].message}...”`;
  const answerAI = (await chatCompetion).choices[0].message.content;

  return answerAI;
};
