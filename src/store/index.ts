import { createSlice, configureStore, PayloadAction } from "@reduxjs/toolkit";

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
}

const initialState: GameState = {
  nickname: "",
  gameType: GameType.None,
  globeLoaded: false,
  gameStarted: false,
  countryList: [],
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
      state.gameStarted = true;
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
