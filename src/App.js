import { Routes, Route, Link, BrowserRouter} from 'react-router-dom'
//import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import ArrayAnimation from './Components/Array/Array';
import Stack from './Components/Stack/stack';
import Queue from './Components/Queue/queue';
import Home from './Home'
import BinarySearch from './Components/Searching/Binary Search/binarySearch';
import LinearSearch from './Components/Searching/Linear Search/linearSearch';
import LinkedList from './Components/LinkedList/linkedList';
import Navbar from './Components/navbar';
import BubbleSort from './Components/Sorting/Bubble Sort/bubbleSort';
import QuickSort from './Components/Sorting/Quick Sort/quickSort';


function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/array" element={<ArrayAnimation/>}/>
          <Route path="/stack" element={<Stack/>}/>
          <Route path="/queue" element={<Queue/>}/>
          <Route path="/binarySearch" element={<BinarySearch/>}/>
          <Route path="/linearSearch" element={<LinearSearch/>}/>
          <Route path="/linkedList" element={<LinkedList/>}/>
          <Route path="/bubbleSort" element={<BubbleSort/>}/>
          <Route path="/quickSort" element={<QuickSort/>}/>
         
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
