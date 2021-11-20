import { createSlice, configureStore, PayloadAction } from "@reduxjs/toolkit";
import { QuestionIterface, generateQuestions } from "../models/Question";

const questionCount = 10;

export enum GameType {
  None = "None",
  Quiz = "Quiz",
  FindCountry = "FindCountry",
}

interface GameState {
  nickname: string;
  gameType: GameType;
  globeLoaded: boolean;
  gameStarted: boolean;
  countryList: string[];
  currentQuestion: number;
  questions: QuestionIterface[];
}

const initialState: GameState = {
  nickname: "",
  gameType: GameType.None,
  globeLoaded: false,
  gameStarted: false,
  countryList: [],
  currentQuestion: -1,
  questions: [],
};

const resetGameState = (state: GameState) => {
  state.nickname = "";
  state.gameType = GameType.None;
  state.gameStarted = false;
  state.currentQuestion = -1;
  state.questions = [];
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
    startGame(state) {
      if (state.globeLoaded) {
        state.questions = generateQuestions(
          questionCount,
          state.countryList,
          state.gameType
        );
        state.currentQuestion = 0;
        state.gameStarted = true;
      }
    },
    stepToNextQuestion(state, action) {
      if (state.globeLoaded && state.gameStarted) {
        state.questions[state.currentQuestion].answerIsCorrect = action.payload;
        state.currentQuestion++;
        if (state.currentQuestion >= state.questions.length) {
          resetGameState(state);
        }
      }
    },
    endGame(state) {
      resetGameState(state);
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
