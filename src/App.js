import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import StudentListing from './Student/StudentListing';
import StudentCreate from './Student/StudentCreate';
import StudentDetail from './Student/StudentDetail';
import StudentEdit from './Student/StudentEdit';
import TeacherCreate from './Teacher/TeacherCreate';
import TeacherListing from './Teacher/TeacherListing';
import TeacherDetail from './Teacher/TeacherDetail';
import TeacherEdit from './Teacher/TeacherEdit';
import SubjectListing from './Subject/SubjectListing';
import SubjectCreate from './Subject/SubjectCreate';
import SubjectDetail from './Subject/SubjectDetail';
import SubjectEdit from './Subject/SubjectEdit';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
//import { Login , Signup } from './pages';
import CourseListing from './Course/CourseListing';
import CourseCreate from './Course/CourseCreate';
import CourseEdit from './Course/CourseEdit';
import CourseDetail from './Course/CourseDetail';
import MarksDetail from './Marks/MarksDetail';
import MarksListing from './Marks/MarksListing';
import MarksCreate from './Marks/MarksCreate';
import MarksEdit from './Marks/MarksEdit';


function App() {
  return (
    <div className="App">
      <h1>Learning Management System Opertations</h1>
      <BrowserRouter>
        <Routes>
          {/* <Route path='/' element={<Home/>}></Route>  */}
          <Route path='/' element={<Dashboard/>}></Route> 
          {/* <Route path='/pages/Dashboard' element={<Dashboard />}></Route>
          <Route path='/pages/Login' element={<Login />}></Route>
          <Route path='/pages/Signup' element={<Signup />}></Route> */}

          <Route path='/student/listing' element={<StudentListing />}></Route>
          <Route path='/student/create' element={<StudentCreate />}></Route>
          <Route path='/student/detail/:id' element={<StudentDetail />}></Route>
          <Route path='/student/edit/:id' element={<StudentEdit />}></Route>
          

          <Route path='/subject/detail/:id' element={<SubjectDetail />}></Route>
          <Route path='/subject/edit/:id' element={<SubjectEdit />}></Route>
          <Route path='/subject/create' element={<SubjectCreate />}></Route>
          <Route path='/subject/listing' element={<SubjectListing />}></Route>

          

          <Route path='/teacher/detail/:id' element={<TeacherDetail />}></Route>
          <Route path='/teacher/edit/:id' element={<TeacherEdit />}></Route>
          <Route path='/teacher/create' element={<TeacherCreate />}></Route>
          <Route path='/teacher/listing' element={<TeacherListing />}></Route>

          <Route path='/course/detail/:id' element={<CourseDetail />}></Route>
          <Route path='/course/edit/:id' element={<CourseEdit />}></Route>
          <Route path='/course/create' element={<CourseCreate />}></Route>
          <Route path='/course/listing' element={<CourseListing />}></Route>

          <Route path='/marks/detail/:id' element={<MarksDetail />}></Route>
          <Route path='/marks/edit/:id' element={<MarksEdit />}></Route>
          <Route path='/marks/create' element={<MarksCreate />}></Route>
          <Route path='/marks/listing' element={<MarksListing />}></Route>

        </Routes>
      </BrowserRouter>

      {/* <div style= {{
        width:'1530px',
        height:'500px',
        backgroundSize:'cover',
        backgroundImage:`url(${require('./assest/School.jpg')})`
      }}></div> */}
    </div>
  );

}

export default App;
