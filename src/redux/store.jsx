import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { thunk } from "redux-thunk";
import reducer from "./reducers/index";

const middleware = [thunk];

const store = createStore(reducer, applyMiddleware(...middleware));

const DataProvider = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default DataProvider;
