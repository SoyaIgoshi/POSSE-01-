import React, { useState, useEffect } from 'react';
import ReflectionForm from './components/ReflectionForm';
import TagFilter from './components/TagFilter';
import ReflectionCard from './components/ReflectionCard';

export default function App() {
  const [logs, setLogs] = useState(() => {
    const savedLogs = localStorage.getItem('reflection_logs');
    return savedLogs ? JSON.parse(savedLogs) : [];
  });

  const [filterCategory, setFilterCategory] = useState('すべて');

  useEffect(() => {
    localStorage.setItem('reflection_logs', JSON.stringify(logs));
  }, [logs]);

  const handleAddLog = (newLog) => {
    setLogs([newLog, ...logs]);
  };

  const handleDeleteLog = (id) => {
    setLogs(logs.filter((log) => log.id !== id));
  };

  const handleAddComment = (id, commentText) => {
    setLogs(
      logs.map((log) => {
        if (log.id === id) {
          return {
            ...log,
            comments: [...(log.comments || []), commentText],
          };
        }
        return log;
      })
    );
  };

  const filteredLogs = filterCategory === 'すべて'
    ? logs
    : logs.filter((log) => log.category === filterCategory);

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        
        {/* ヘッダー */}
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            🌱 成長ログ ＆ 振り返りノート
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            日々の学びを記録し、タグで振り返り、反省を次に繋げよう
          </p>
        </header>

        {/* 2カラムレイアウト */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* 左側：入力フォーム */}
          <div className="lg:col-span-5 lg:sticky lg:top-8">
            <ReflectionForm onAddLog={handleAddLog} />
          </div>

          {/* 右側：フィルター ＆ カード一覧 */}
          <div className="lg:col-span-7">
            <TagFilter
              currentFilter={filterCategory}
              onSelectFilter={setFilterCategory}
            />

            <main className="space-y-4">
              {filteredLogs.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-300 text-slate-400 text-sm shadow-sm">
                  記録がありません。左のフォームから最初の振り返りを追加してみよう！
                </div>
              ) : (
                filteredLogs.map((log) => (
                  <ReflectionCard
                    key={log.id}
                    log={log}
                    onDeleteLog={handleDeleteLog}
                    onAddComment={handleAddComment}
                  />
                ))
              )}
            </main>
          </div>

        </div>
      </div>
    </div>
  );
}