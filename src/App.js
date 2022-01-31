import './App.css';
import routes from './router/route';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {

  return (
    <Router>
      <div className="App">
        <div className='content'>
          <Routes>
            {
              routes.map(x => (
                <Route key={x.to} path={x.to} element={x.components} exact/>
              ))
            }
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
