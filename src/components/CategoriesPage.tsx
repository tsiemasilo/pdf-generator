import { useState, useEffect } from 'react';

interface PDF {
  id: string;
  title: string;
  category: string;
  type: string;
  description: string;
  date: string;
  filename: string;
  path: string;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [pdfs, setPdfs] = useState<PDF[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      loadCategoryPDFs(selectedCategory);
    }
  }, [selectedCategory]);

  const loadCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      const data = await response.json();
      setCategories(data.categories);
    } catch (error) {
      console.error('Error loading categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadCategoryPDFs = async (category: string) => {
    try {
      const response = await fetch(`/api/pdfs?category=${encodeURIComponent(category)}`);
      const data = await response.json();
      setPdfs(data.pdfs);
    } catch (error) {
      console.error('Error loading PDFs:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Browse by Category</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedCategory === category
                  ? 'border-purple-600 bg-purple-50 shadow-md'
                  : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50'
              }`}
            >
              <div className="text-2xl mb-2">📁</div>
              <div className="font-semibold text-gray-800">{category}</div>
            </button>
          ))}
        </div>
      </div>

      {selectedCategory && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            {selectedCategory} ({pdfs.length} PDFs)
          </h3>
          
          {pdfs.length === 0 ? (
            <p className="text-gray-600">No PDFs in this category yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {pdfs.map((pdf) => (
                <div key={pdf.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-2">
                    <div className="text-2xl">📄</div>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {pdf.type}
                    </span>
                  </div>
                  <h4 className="font-bold text-gray-800 mb-2 line-clamp-2">{pdf.title}</h4>
                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">{pdf.description}</p>
                  <div className="text-xs text-gray-500 mb-3">{pdf.date}</div>
                  <a
                    href={`/${pdf.path}`}
                    download
                    className="block text-center bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors text-sm"
                  >
                    Download
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
