import { useState, useEffect } from 'react';

interface Stats {
  total: number;
  today: number;
  byCategory: Record<string, number>;
  latestDate: string | null;
}

interface PDF {
  id: string;
  title: string;
  category: string;
  type: string;
  description: string;
  date: string;
  filename: string;
  path: string;
  pageCount?: number;
  wordCount?: number;
  imageCount?: number;
  tags?: string[];
}

export default function HomePage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [todayPDFs, setTodayPDFs] = useState<PDF[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [statsRes, pdfsRes] = await Promise.all([
        fetch('/api/stats'),
        fetch('/api/pdfs/today')
      ]);
      
      const statsData = await statsRes.json();
      const pdfsData = await pdfsRes.json();
      
      setStats(statsData);
      setTodayPDFs(pdfsData.pdfs);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerate = async () => {
    setGenerating(true);
    setMessage('');
    
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({})
      });
      
      const data = await response.json();
      
      if (data.success) {
        setMessage(`✅ Successfully generated ${data.count} PDFs!`);
        loadData();
      } else {
        setMessage('❌ Generation failed');
      }
    } catch (error) {
      console.error('Error generating PDFs:', error);
      setMessage('❌ Error generating PDFs');
    } finally {
      setGenerating(false);
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
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Dashboard Overview</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-6 text-white">
            <div className="text-4xl mb-2">📊</div>
            <div className="text-3xl font-bold">{stats?.total || 0}</div>
            <div className="text-blue-100">Total PDFs</div>
          </div>
          
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-6 text-white">
            <div className="text-4xl mb-2">📅</div>
            <div className="text-3xl font-bold">{stats?.today || 0}</div>
            <div className="text-green-100">Generated Today</div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-6 text-white">
            <div className="text-4xl mb-2">📁</div>
            <div className="text-3xl font-bold">{Object.keys(stats?.byCategory || {}).length}</div>
            <div className="text-purple-100">Categories</div>
          </div>
        </div>

        <button
          onClick={handleGenerate}
          disabled={generating}
          className={`w-full py-4 px-6 rounded-lg text-white font-bold text-lg transition-all ${
            generating
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-xl'
          }`}
        >
          {generating ? '🔄 Generating PDFs...' : '🚀 Generate New PDFs Now'}
        </button>
        
        {message && (
          <div className={`mt-4 p-4 rounded-lg ${
            message.includes('✅') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {message}
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Today's PDFs</h3>
        
        {todayPDFs.length === 0 ? (
          <p className="text-gray-600">No PDFs generated today yet. Click the button above to generate!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {todayPDFs.map((pdf) => (
              <div key={pdf.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-2">
                  <div className="text-2xl">📄</div>
                  <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">
                    {pdf.category}
                  </span>
                </div>
                <h4 className="font-bold text-gray-800 mb-1 line-clamp-2">{pdf.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{pdf.type}</p>
                
                {(pdf.pageCount || pdf.imageCount) && (
                  <div className="flex gap-2 text-xs text-gray-500 mb-2">
                    {pdf.pageCount && <span>📄 {pdf.pageCount} pages</span>}
                    {pdf.imageCount && <span>🖼️ {pdf.imageCount} images</span>}
                  </div>
                )}
                
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
