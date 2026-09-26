import React, { useState } from 'react';

export default function ReflectionCard({ log, onDeleteLog, onAddComment }) {
  const [commentText, setCommentText] = useState('');

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    onAddComment(log.id, commentText);
    setCommentText('');
  };

  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 mb-4 transition-all">
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-semibold text-slate-500">{log.date}</span>
          <span className="text-xs bg-blue-50 text-blue-600 px-2.5 py-0.5 rounded-full font-medium">
            {log.category}
          </span>
        </div>
        <button
          onClick={() => onDeleteLog(log.id)}
          className="text-xs text-rose-500 hover:text-rose-700 font-medium transition-colors"
        >
          削除
        </button>
      </div>

      <div className="space-y-2 mb-4">
        <div>
          <span className="text-xs font-bold text-slate-400 block uppercase">出来事</span>
          <p className="text-sm text-slate-800 leading-relaxed">{log.event}</p>
        </div>
        <div>
          <span className="text-xs font-bold text-emerald-600 block uppercase">学び・気づき</span>
          <p className="text-sm text-slate-800 leading-relaxed">{log.learning}</p>
        </div>
      </div>

      {log.comments && log.comments.length > 0 && (
        <div className="bg-slate-50 p-3 rounded-lg mb-3 space-y-1.5 border border-slate-100">
          <span className="text-xs font-bold text-slate-500 block mb-1">💬 後からの見返しコメント・反省:</span>
          {log.comments.map((cmt, idx) => (
            <p key={idx} className="text-xs text-slate-700 bg-white p-2 rounded border border-slate-200">
              • {cmt}
            </p>
          ))}
        </div>
      )}

      <form onSubmit={handleCommentSubmit} className="flex gap-2">
        <input
          type="text"
          placeholder="見返して気づいた反省・ネクストアクションを追記..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          className="flex-1 px-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <button
          type="submit"
          className="bg-slate-700 hover:bg-slate-800 text-white text-xs font-medium px-3 py-1.5 rounded-lg transition-colors"
        >
          追記
        </button>
      </form>
    </div>
  );
}