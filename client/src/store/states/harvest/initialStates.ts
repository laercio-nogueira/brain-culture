import { AgricultureState } from "../../interfaces/farmer.interface";

const initialState: AgricultureState = {
  producers: [],
  farms: [],
  harvests: [],
  crops: [],
  loading: false,
  error: null,
};

export default initialState;
