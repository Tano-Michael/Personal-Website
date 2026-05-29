import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './store';
import Layout from './components/Layout';
import Home from './pages/Home';
import Books from './pages/Books';
import Articles from './pages/Articles';
import ArticleDetail from './pages/ArticleDetail';
import Podcast from './pages/Podcast';
import About from './pages/About';
import Admin from './pages/Admin';
import Donate from './pages/Donate';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="books" element={<Books />} />
            <Route path="articles" element={<Articles />} />
            <Route path="articles/:id" element={<ArticleDetail />} />
            <Route path="podcast" element={<Podcast />} />
            <Route path="about" element={<About />} />
            <Route path="donate" element={<Donate />} />
            <Route path="admin" element={<Admin />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
