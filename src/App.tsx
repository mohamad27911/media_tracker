
import './App.css'
import Footer from './Components/Footer'
import Navbar from './Components/Navbar'
import HomePage from './Components/HomePage';
// import Chatbot from './Components/ChatBot';
import Operations from './Components/Operations';
import UserAuth from './Components/UserAuth';

function App() {

  return (
   <>
   <Navbar />
   <HomePage/>
   <Operations/>

{/* <UserAuth/> */}
   <Footer />
   </>
  )
}

export default App