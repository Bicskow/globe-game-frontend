import { createSlice, configureStore, PayloadAction } from "@reduxjs/toolkit";
import { QuestionIterface, generateQuestions } from "../models/Question";

const questionCount = 10;

export enum GameType {
  None = "None",
  Quiz = "Quiz",
  FindCountry = "FindCountry",
}

export enum GameStep {
  Init = "Init",
  LoadingGame = "LoadingGame",
  Countdown = "Countdown",
  InGame = "InGame",
  ViewResults = "ViewResults",
}

interface GameState {
  nickname: string;
  gameType: GameType;
  gameStep: GameStep;
  globeLoaded: boolean;
  countryList: string[];
  currentQuestion: number;
  questions: QuestionIterface[];
  startTime: number;
}

const initialState: GameState = {
  nickname: "",
  gameType: GameType.None,
  gameStep: GameStep.Init,
  globeLoaded: false,
  countryList: [],
  currentQuestion: -1,
  questions: [],
  startTime: -1,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setNickname(state, action: PayloadAction<string>) {
      state.nickname = action.payload;
    },
    setGameType(state, action: PayloadAction<GameType>) {
      state.gameType = action.payload;
    },
    setGlobeLoaded(state, action: PayloadAction<boolean>) {
      state.globeLoaded = action.payload;
    },
    setCountryList(state, action: PayloadAction<string[]>) {
      state.countryList = action.payload;
    },
    loadGame(state) {
      state.gameStep = GameStep.LoadingGame;
    },
    startCountdown(state) {
      if (state.globeLoaded) {
        state.questions = generateQuestions(
          questionCount,
          state.countryList,
          state.gameType
        );
        state.gameStep = GameStep.Countdown;
      }
    },
    startGame(state) {
      if (state.gameStep === GameStep.Countdown) {
        state.gameStep = GameStep.InGame;
        state.startTime = new Date().getTime();
        state.currentQuestion = 0;
      }
    },
    stepToNextQuestion(state, action: PayloadAction<boolean>) {
      if (state.globeLoaded && state.gameStep === GameStep.InGame) {
        state.questions[state.currentQuestion].answeredAt =
          new Date().getTime();
        state.questions[state.currentQuestion].answerIsCorrect = action.payload;
        state.currentQuestion++;
        if (state.currentQuestion >= state.questions.length) {
          state.gameStep = GameStep.ViewResults;
        }
      }
    },
    countrySelected(state, action: PayloadAction<string>) {
      if (
        state.gameType === GameType.FindCountry &&
        state.gameStep === GameStep.InGame
      ) {
        state.questions[state.currentQuestion].answerIsCorrect =
          state.questions[state.currentQuestion].correctAnswer ===
          action.payload;
        state.currentQuestion++;
        if (state.currentQuestion >= state.questions.length) {
          state.gameStep = GameStep.ViewResults;
        }
      }
    },
    endGame(state) {
      state.gameType = GameType.None;
      state.gameStep = GameStep.Init;
      state.currentQuestion = -1;
      state.questions = [];
      state.currentQuestion = -1;
      state.questions = [];
    },
  },
});

const store = configureStore({
  reducer: { game: gameSlice.reducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const gameActions = gameSlice.actions;
export default store;
