import { combineReducers } from 'redux';
import initialValuesReducer from './initialValuesReducer';
import decadeOneReducer from './decadeOneReducer';
import decadeTwoReducer from './decadeTwoReducer';
import decadeThreeReducer from './decadeThreeReducer';

const rootReducer = combineReducers({
  initialPage: initialValuesReducer,
  decadeOnePage: decadeOneReducer,
  decadeTwoPage: decadeTwoReducer,
  decadeThreePage: decadeThreeReducer,
});

export default rootReducer;