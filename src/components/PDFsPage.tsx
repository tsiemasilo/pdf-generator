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

export default function PDFsPage() {
  const [pdfs, setPdfs] = useState<PDF[]>([]);
  const [filteredPdfs, setFilteredPdfs] = useState<PDF[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPDFs();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredPdfs(pdfs);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = pdfs.filter(
        (pdf) =>
          pdf.title.toLowerCase().includes(query) ||
          pdf.category.toLowerCase().includes(query) ||
          pdf.type.toLowerCase().includes(query) ||
          pdf.description.toLowerCase().includes(query)
      );
      setFilteredPdfs(filtered);
    }
  }, [searchQuery, pdfs]);

  const loadPDFs = async () => {
    try {
      const response = await fetch('/api/pdfs');
      const data = await response.json();
      setPdfs(data.pdfs);
      setFilteredPdfs(data.pdfs);
    } catch (error) {
      console.error('Error loading PDFs:', error);
    } finally {
      setLoading(false);
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
        <h2 className="text-3xl font-bold text-gray-800 mb-6">All PDFs</h2>
        
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search PDFs by title, category, type, or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            />
            <div className="absolute left-4 top-3.5 text-gray-400 text-xl">🔍</div>
          </div>
        </div>

        <div className="mb-4 text-gray-600">
          Showing {filteredPdfs.length} of {pdfs.length} PDFs
        </div>

        {filteredPdfs.length === 0 ? (
          <p className="text-gray-600">No PDFs found matching your search.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPdfs.map((pdf) => (
              <div key={pdf.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-2">
                  <div className="text-2xl">📄</div>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">
                      {pdf.category}
                    </span>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {pdf.type}
                    </span>
                  </div>
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
    </div>
  );
}
