import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Banner from './components/Banner';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useDbData } from "./utilities/firebase";
import Modal from './components/Modal';
import Cart from './components/Cart.jsx';
import TermSelector from './components/TermSelector';
import CourseList from './components/CourseList';
import { conflict_courses } from './utilities/checks.js';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CourseForm from './components/CourseForm';
import { useProfile } from './utilities/profile';

const terms = {
  Fall: 'Fall', 
  Winter: 'Winter', 
  Spring: 'Spring'

};

const Main = () => {
  const [data, error] = useDbData('/');
  const [open, setOpen] = useState(false);
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);
  const [selected, setSelected] = useState([]);
  const [unavailable, setUnavailable] = useState([]);
  const [selection, setSelection] = useState(() => Object.keys(terms)[0]);
  const [profile, profileLoading, profileError] = useProfile();


  const toggleSelected = (item) => { setSelected(
    selected.includes(item)
    ? selected.filter(x => x !== item)
    : [...selected, item]
    )
  setUnavailable(
    selected.includes(item)
    ? unavailable.filter((unavailable) => !conflict_courses(data.courses[item], data.courses).includes(unavailable))
    : unavailable => unavailable.concat(conflict_courses(data.courses[item], data.courses)))
    
};
  if (error) return <h1>Error loading data: {`${error}`}</h1>;
  if (data === undefined) return <h1>Loading data...</h1>;
  if (!data) return <h1>No data found</h1>;
  if (profileError) return <h1>Error loading profile: {`${profileError}`}</h1>;
  if (profileLoading) return <h1>Loading user profile</h1>;
  if (!profile) return <h1>No profile data</h1>;
  

  return (
    <div>
      <Banner title={data.title} />
      <div>
          <div className="d-flex p-2">
          <TermSelector 
          selection={selection}
          setSelection={setSelection} />
          <button className="ms-auto btn btn-outline-dark" onClick={openModal}><i className="bi bi-calendar"></i></button>
          </div>
          <Modal open={open} close={closeModal}>
              <Cart courses={data.courses} selected={selected} />    
          </Modal>
         <CourseList courses={data.courses} selection={selection} selected={selected} unavailable={unavailable} toggleSelected={toggleSelected} profile={profile}/>
         </div>
         </div>
  );
};

const queryClient = new QueryClient();

const App = () => {
  const [profile, profileLoading, profileError] = useProfile();
  

  if (profileError) return <h1>Error loading profile: {`${profileError}`}</h1>;
  if (profileLoading) return <h1>Loading user profile</h1>;
  if (!profile) return <h1>No profile data</h1>;

  return (
  <QueryClientProvider client={queryClient}>
    <div className="container">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main/>} />
        <Route path="/CourseForm/:id" element={<CourseForm />} profile={profile}/>
      </Routes>
    </BrowserRouter>
    </div>
  </QueryClientProvider>)
};


export default App;
