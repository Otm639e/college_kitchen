
import './App.css';
import MainPage from './pages/MainPage';
import AboutPage from './pages/AboutPage';
import HomePage from './pages/HomePage';
import Recipe from './pages/Recipe';
import SigninPage from './pages/SigninPage';
import ProfilePage from './pages/ProfilePage';
import AddRecipeForm from './pages/AddRecipeForm';
import {BrowserRouter as Router, Switch} from 'react-router-dom';
import PrivateRouter from './components/PrivateRouter';
import PublicRouter from './components/PublicRouter';



function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div className="App">
          <Switch> {/** Switch makes it so that only the first rout that matches gets rendered. */}
            <PublicRouter restricted={false} path="/" component={MainPage} exact/>
            <PublicRouter restricted={false} path="/About" component={AboutPage} />
            <PublicRouter restricted={true} path="/Signin" component={SigninPage} />
            <PrivateRouter path="/Home" component={HomePage} />
            <PrivateRouter path="/Recipe/:id" component={Recipe} />
            <PrivateRouter path="/Profile" component={ProfilePage} />
            <PrivateRouter path="/Recipe-Creation" component={AddRecipeForm}/>

          </Switch>
      </div>
    </Router>
  );
}

export default App;
