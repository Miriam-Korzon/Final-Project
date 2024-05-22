import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from './Login/login';
import UserList from './user/userList';
import store from './Store';
import { Provider } from 'react-redux';
import Layout from './commen/layout';
import CourseList from './Course/coursesList';
import LogOut from './Login/logOut';
import DisConnection from './Login/disConnection';
import MyCourseList from './MyCourses/myCoursesList';
import DetailCourse from './Course/detailCourse';
import SetCourse from './Course/setCourses';
import HomePage from './commen/HomePage';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path='/' element={<Layout />}>
              <Route path='/home' element={<HomePage/>} />
              <Route path='/users' element={<UserList />} />
              <Route path='/courses' element={<CourseList />} />
              <Route path='/Login' element={<Login />} />
              <Route path='/LogOut' element={<LogOut />} />
              <Route path='/DisConnection' element={<DisConnection />} />
              <Route path='/myCourses' element={<MyCourseList />} />
              <Route path='/detailCourse' element={<DetailCourse />} />
              <Route path='/setCourses' element={<SetCourse />} />
            </Route>
          </Routes>
        </Router>
        {<h1>{store.name}</h1>}
      </Provider>
    </div>
  );
}

export default App;
