import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import SubjectList from './pages/SubjectList'
import BookList from './pages/BookList'
import ChapterView from './pages/ChapterView'
import AIPrompts from './pages/AIPrompts'
import './App.css'

function App() {
  return (
    <Router basename="/cbse-class-10-resources">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/subjects/:subject" element={<SubjectList />} />
        <Route path="/subjects/:subject/books/:book" element={<BookList />} />
        <Route path="/subjects/:subject/books/:book/chapters/:chapter" element={<ChapterView />} />
        <Route path="/subjects/:subject/books/:book/chapters/:chapter/ai/:aiType" element={<AIPrompts />} />
      </Routes>
    </Router>
  )
}

export default App
