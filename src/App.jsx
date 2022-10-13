import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Banner from './components/Banner';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useJsonQuery } from './utilities/fetch';
import Modal from './components/Modal';
import Cart from './components/Cart.jsx';
import TermSelector from './components/TermSelector';
import CourseList from './components/CourseList';
import { conflict_courses } from './utilities/checks.js';

const terms = {
  Fall: 'Fall', 
  Winter: 'Winter', 
  Spring: 'Spring'

};

const Main = () => {
  const [schedule, isLoading, error] = useJsonQuery('https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php');
  const [open, setOpen] = useState(false);
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);
  const [selected, setSelected] = useState([]);
  const [unavailable, setUnavailable] = useState([]);
  const [selection, setSelection] = useState(() => Object.keys(terms)[0]);
  const toggleSelected = (item) => { setSelected(
    selected.includes(item)
    ? selected.filter(x => x !== item)
    : [...selected, item]
    )
  setUnavailable(
    selected.includes(item)
    ? unavailable.filter((unavailable) => !conflict_courses(schedule.courses[item], schedule.courses).includes(unavailable))
    : unavailable => unavailable.concat(conflict_courses(schedule.courses[item], schedule.courses)))
    
};
  if (error) return <h1>Error loading user data: {`${error}`}</h1>;
  if (isLoading) return <h1>Loading user data...</h1>;
  if (!schedule) return <h1>No user data found</h1>;

  return (
    <div>
      <Banner title={schedule.title} />
      <div>
          <div className="d-flex p-2">
          <TermSelector 
          selection={selection}
          setSelection={setSelection} />
          <button className="ms-auto btn btn-outline-dark" onClick={openModal}><i className="bi bi-calendar"></i></button>
          </div>
          <Modal open={open} close={closeModal}>
              <Cart courses={schedule.courses} selected={selected} />    
          </Modal>
         <CourseList courses={schedule.courses} selection={selection} selected={selected} unavailable={unavailable} toggleSelected={toggleSelected}/>
         </div>
         </div>
  );
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <div className="container">
      <Main />
    </div>
  </QueryClientProvider>
);


export default App;
