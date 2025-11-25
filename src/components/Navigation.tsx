type Page = 'home' | 'categories' | 'pdfs';

interface NavigationProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export default function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const navItems: { id: Page; label: string; icon: string }[] = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'categories', label: 'Categories', icon: '📁' },
    { id: 'pdfs', label: 'All PDFs', icon: '📄' },
  ];

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-purple-600">📚 AutoPDF Library</h1>
          </div>
          
          <div className="flex space-x-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`px-4 py-2 rounded-lg transition-all ${
                  currentPage === item.id
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'text-gray-700 hover:bg-purple-100'
                }`}
              >
                <span className="mr-2">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
