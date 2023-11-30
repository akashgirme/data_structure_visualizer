import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap'


const Home = () => {

    return (
        <Container style={{display:'flex', flexDirection:'column', justifyContent: 'center', alignItems:'center'}}>
          <div style={{width: '70%'}}>
            <div>
              <h3>Basic Data Structures</h3>
              <ul>
                <li><Link to="/array">Array</Link></li>
                <li><Link to="/linkedList">LinkedList</Link></li>
                <li><Link to="/stack">Stack</Link></li>
                <li><Link to="/queue">Queue</Link></li>
              </ul>
            </div>
            <div>
                <h3>Searching Techniques</h3>
                <ul>
                  <li><Link to="/linearSearch">Linear Search</Link></li>
                  <li><Link to="/binarySearch">Binary Search</Link></li>
                </ul>
            </div>
            <div>
              <h3>Sorting Techniques</h3>
              <ul>
                <li><Link to="/bubbleSort">Bubble Sort</Link></li>
                <li><Link to="/quickSort">Quick Sort</Link></li>
              </ul>
            </div>
          </div>
       </Container>
    )
}
export default Home;