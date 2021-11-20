import { GameType } from "../store/index";

export interface QuestionIterface {
  answerIsCorrect: boolean | null;
  correctAnswer: string;
  choices: string[];
}

const choiceCount = 4;

export const generateQuestions = (
  questionCount: number,
  countryList: string[],
  questionType: GameType
) => {
  let toReturn = [];
  let shuffled = [...countryList].sort(() => 0.5 - Math.random());
  let sIndex = 0;
  for (let i = 0; i < questionCount; i++) {
    let question;
    if (questionType === GameType.Quiz) {
      question = {
        answerIsCorrect: null,
        correctAnswer: shuffled[sIndex],
        choices: shuffled
          .slice(sIndex, sIndex + choiceCount)
          .sort(() => 0.5 - Math.random()),
      };
      sIndex += choiceCount;
    } else {
      question = {
        answerIsCorrect: null,
        correctAnswer: shuffled[sIndex],
        choices: [],
      };
      sIndex++;
    }
    toReturn.push(question);
  }
  return toReturn;
};
