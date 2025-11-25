import { useState } from 'react';
import HomePage from './components/HomePage';
import CategoriesPage from './components/CategoriesPage';
import PDFsPage from './components/PDFsPage';
import Navigation from './components/Navigation';

type Page = 'home' | 'categories' | 'pdfs';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />
      
      <main className="container mx-auto px-4 py-8">
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'categories' && <CategoriesPage />}
        {currentPage === 'pdfs' && <PDFsPage />}
      </main>
    </div>
  );
}

export default App;
