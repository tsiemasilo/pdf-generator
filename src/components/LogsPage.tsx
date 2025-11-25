import { useState, useEffect } from 'react';

interface LogEntry {
  id: string;
  timestamp: string;
  type: 'batch' | 'single';
  success: boolean;
  count?: number;
  category?: string;
  title?: string;
  pageCount?: number;
  imageCount?: number;
  errors?: number;
  categories?: number;
}

export default function LogsPage() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLogs();
  }, []);

  const loadLogs = async () => {
    try {
      const response = await fetch('/api/logs?limit=100');
      const data = await response.json();
      setLogs(data.logs);
    } catch (error) {
      console.error('Error loading logs:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-xl text-gray-600">Loading logs...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Generation History</h2>
        
        {logs.length === 0 ? (
          <p className="text-gray-600">No generation logs yet.</p>
        ) : (
          <div className="space-y-3">
            {logs.map((log) => (
              <div 
                key={log.id} 
                className={`border rounded-lg p-4 ${
                  log.success ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        log.type === 'batch' 
                          ? 'bg-purple-100 text-purple-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {log.type === 'batch' ? '📦 Batch Generation' : '📄 Single PDF'}
                      </span>
                      <span className={`text-sm ${log.success ? 'text-green-600' : 'text-red-600'}`}>
                        {log.success ? '✓ Success' : '✗ Failed'}
                      </span>
                    </div>
                    
                    {log.type === 'batch' ? (
                      <p className="text-gray-700">
                        Generated <strong>{log.count}</strong> PDFs across <strong>{log.categories}</strong> categories
                        {log.errors && log.errors > 0 && (
                          <span className="text-red-600 ml-2">
                            ({log.errors} errors)
                          </span>
                        )}
                      </p>
                    ) : (
                      <div>
                        <p className="text-gray-700 font-semibold">{log.title}</p>
                        <p className="text-gray-600 text-sm">
                          Category: {log.category} | Pages: {log.pageCount} | Images: {log.imageCount}
                        </p>
                      </div>
                    )}
                  </div>
                  
                  <div className="text-right text-sm text-gray-500">
                    {formatDate(log.timestamp)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
