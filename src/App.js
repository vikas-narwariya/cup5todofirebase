import React,{useState, useEffect} from 'react';
import './App.css';
import NavBar from './components/NavBar';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Todo from './components/Todo';
import Login from './components/Login';
import Signup from './components/Signup';
import {auth} from './firebase'
import TodoDesc from './components/TodoDesc';



function App() {
  const [user,setUser] = useState(null)
  useEffect(()=>{
    auth.onAuthStateChanged(user=>{
      if(user) setUser(user)
      else setUser(null)
    })
  }, [])
  return (
    <div className="App">
      <BrowserRouter>
      <NavBar user={user}/>
      <Switch>
        <Route exact path="/">
          <Todo user={user}/>
        </Route>
        {/* <Route exact path="/tododesc">
          <TodoDesc user={user}/>
        </Route> */}
        <Route path="/login" component={Login} exact/>
        <Route path="/signup" component={Signup} exact/>
      </Switch>
      </BrowserRouter>
      </div>
  );
}

export default App;
