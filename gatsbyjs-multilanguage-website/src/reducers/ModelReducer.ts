import AnObject from "../ts/AnObject"

export enum RESPONSE {
  GET_ALL_SUCCESS,
  GET_ALL_FAILURE,
  PUT_SUCCESS,
  PUT_FAILURE
}


export enum REQUEST_STATUS  {
  LOADING,
  SUCCESS,
  ERROR
}

export interface IStateReducerForm {
  records:Array<AnObject>,
  status: REQUEST_STATUS,
  error?: null
}

export interface IActionState {
  record:AnObject,
  type: RESPONSE,
  error?:null
}

const modelReducer = (state: IStateReducerForm, action:IActionState):IStateReducerForm => {
  switch (action.type) {
    case RESPONSE.GET_ALL_SUCCESS: {
      return {
        ...state,
        records: [ action.record, ... state.records],
        status: REQUEST_STATUS.SUCCESS,
      };
    }
    case RESPONSE.GET_ALL_FAILURE: {
      return {
        ...state,
        status: REQUEST_STATUS.ERROR,
        error: action.error,
      };
    }
    case RESPONSE.PUT_SUCCESS:
      const { records } = state;
      const { record } = action;
      const recordIndex = records.map((rec) => rec.Name).indexOf(record.Name);
      return {
        ...state,
        records: [
          ...records.slice(0, recordIndex),
          record,
          ...records.slice(recordIndex + 1),
        ],
      };
    case RESPONSE.PUT_FAILURE:
      console.log(
        'PUT_FAILURE: Currently just logging to console without refreshing records list',
      );
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
};
export default modelReducer;
