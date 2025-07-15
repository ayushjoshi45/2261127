import { Route, Routes } from "react-router-dom";
import Homepage from "./Homepage";
import ShortUrlRedirect from "./components/ShortUrlRedirect ";
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path='/' element={ <Homepage /> } />
                <Route path='/:urlCode' element={ <ShortUrlRedirect /> } />
            </Routes>
            <footer className="footer">
                &copy; {new Date().getFullYear()} Ayush Joshi
                <div className="footer-socials">
                    <a href="mailto:ayush.joshi@email.com" title="Email" target="_blank" rel="noopener noreferrer"><FaEnvelope /></a>
                    <a href="https://github.com/ayushjoshi" title="GitHub" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
                    <a href="https://linkedin.com/in/ayushjoshi" title="LinkedIn" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
                </div>
            </footer>
        </div>
    );
}

export default App;
