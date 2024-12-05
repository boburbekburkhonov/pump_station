import { combineReducers } from "redux";
import theme from './themeReducer'
import alert from './alertReducers'
import stations from './stationsReducer'
import region from './regionReducers'
import district from './districtReducers'
import organization from './organizationReducers'
import aggregates from './aggregateReducer'

export default combineReducers({
  theme,
  alert,
  stations,
  region,
  district,
  organization,
  aggregates
});
