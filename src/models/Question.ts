import { GameType } from "../store/index";

export class Question {
  answerIsCorrect: boolean | null;

  constructor() {
    this.answerIsCorrect = null;
  }
}

export class QuizQuestion extends Question {
  static readonly choiceCount = 4;
  correctAnswer: string;
  choces: string[];

  constructor(correctAnswer: string, choces: string[]) {
    super();
    this.correctAnswer = correctAnswer;
    this.choces = choces;
  }
}

export class FindCountryQuestion extends Question {
  correctAnswer: string;
  constructor(correctAnswer: string) {
    super();
    this.correctAnswer = correctAnswer;
  }
}

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
      question = new QuizQuestion(
        shuffled[sIndex],
        shuffled.slice(sIndex, sIndex + QuizQuestion.choiceCount)
      );
      sIndex += QuizQuestion.choiceCount;
    } else {
      question = new FindCountryQuestion(shuffled[sIndex]);
      sIndex++;
    }
    toReturn.push(question);
  }
  return toReturn;
};
