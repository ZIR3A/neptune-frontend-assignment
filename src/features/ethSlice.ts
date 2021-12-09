import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

export type IGlobalState = {
  address: string;
  balance: number;
  message: string;
  chainId: number;
};

const initialState: IGlobalState = {
  address: "",
  balance: 0,
  message: "",
  chainId: 0,
};

export const ethSlice = createSlice({
  name: "ethereum",
  initialState,
  reducers: {
    setBalance: (state, action: PayloadAction<any>) => {
      return { ...state, balance: action.payload };
    },
    setAddress: (state, action: PayloadAction<any>) => {
      return { ...state, address: action.payload };
    },
    setChainId: (state, action: PayloadAction<any>) => {
      return { ...state, chainId: action.payload };
    },
    removeData: (state) => {
      return (state = initialState);
    },
  },
});

export const { setBalance, setAddress, setChainId, removeData } =
  ethSlice.actions;

export const selectEthereum = (state: RootState) => state.ethereum;

export default ethSlice.reducer;
