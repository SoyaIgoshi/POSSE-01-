import React, { useState } from 'react';

export default function ReflectionForm({ onAddLog }) {
  const today = new Date().toISOString().split('T')[0];

  const [date, setDate] = useState(today);
  const [category, setCategory] = useState('POSSE・開発');
  const [event, setEvent] = useState('');
  const [learning, setLearning] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!event.trim() || !learning.trim()) {
      alert('「出来事」と「学び・気づき」を入力してください！');
      return;
    }

    const newLog = {
      id: Date.now(),
      date,
      category,
      event,
      learning,
      comments: [],
    };

    onAddLog(newLog);
    setEvent('');
    setLearning('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-6">
      <h2 className="text-lg font-bold mb-4 text-slate-800">🌱 今日の振り返りを記録する</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">日付</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">カテゴリ</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
          >
            <option value="POSSE・開発">POSSE・開発</option>
            <option value="大学・学業">大学・学業</option>
            <option value="プライベート">プライベート</option>
          </select>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-slate-600 mb-1">出来事・インプット</label>
        <textarea
          rows="2"
          placeholder="今日あったことや取り組んだことを書こう"
          value={event}
          onChange={(e) => setEvent(e.target.value)}
          className="w-full p-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-slate-600 mb-1">学び・気づき・反省</label>
        <textarea
          rows="2"
          placeholder="そこから得た気づきや改善ポイントを書こう"
          value={learning}
          onChange={(e) => setLearning(e.target.value)}
          className="w-full p-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg text-sm transition-colors shadow-sm"
      >
        記録を追加する
      </button>
    </form>
  );
}