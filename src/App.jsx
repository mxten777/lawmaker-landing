import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';

// Import pages
import Home from './pages/Home';
import About from './pages/About';
import Pledges from './pages/Pledges';
import PledgeDetail from './pages/PledgeDetail';
import News from './pages/News';
import NewsDetail from './pages/NewsDetail';
import District from './pages/District';
import Contact from './pages/Contact';
import Volunteer from './pages/Volunteer';
import Support from './pages/Support';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/pledges" element={<Pledges />} />
          <Route path="/pledges/:id" element={<PledgeDetail />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/:id" element={<NewsDetail />} />
          <Route path="/district" element={<District />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/volunteer" element={<Volunteer />} />
          <Route path="/support" element={<Support />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
