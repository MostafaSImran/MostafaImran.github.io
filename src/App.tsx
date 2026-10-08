import { Routes, Route } from 'react-router'
import Home from './pages/Home'
import ArticlePage from './pages/Article'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/insights/:slug" element={<ArticlePage />} />
    </Routes>
  )
}
