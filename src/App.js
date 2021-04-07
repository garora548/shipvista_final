import './App.css';
import { store } from "./actions/store";
import { Provider } from "react-redux";
import PlantList from "./components/plantList";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
<Provider store = {store}>
  <Router>
    <div className = "container">
  <Route path="/" exact component={PlantList} />
  </div>
  </Router>
  

</Provider>
  );
}

export default App;
