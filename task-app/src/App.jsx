import { useState } from "react";
import TaskItem from "./components/TaskItem";

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("all"); // "all" | "active" | "completed"

  // タスク追加
  const addTask = () => {
    if (!input.trim()) return;
    setTasks([
      ...tasks,
      { id: Date.now(), text: input, done: false }
    ]);
    setInput("");
  };

  // 完了切り替え
  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  // 削除
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // フィルターされたタスクのリスト
  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.done;
    if (filter === "completed") return task.done;
    return true; // "all"
  });

  return (
    <div className="max-w-md mx-auto p-6 mt-10 bg-gray-50 rounded-xl shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">タスク管理アプリ</h1>

      {/* 入力フォーム */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="新しいタスクを入力..."
          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white"
        />
        <button
          onClick={addTask}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
        >
          追加
        </button>
      </div>

      {/* フィルターボタン */}
      <div className="flex justify-center gap-2 mb-4 text-sm">
        <button
          onClick={() => setFilter("all")}
          className={`px-3 py-1 rounded-md ${filter === "all" ? "bg-purple-600 text-white" : "bg-gray-200 text-gray-700"}`}
        >
          すべて
        </button>
        <button
          onClick={() => setFilter("active")}
          className={`px-3 py-1 rounded-md ${filter === "active" ? "bg-purple-600 text-white" : "bg-gray-200 text-gray-700"}`}
        >
          未完了
        </button>
        <button
          onClick={() => setFilter("completed")}
          className={`px-3 py-1 rounded-md ${filter === "completed" ? "bg-purple-600 text-white" : "bg-gray-200 text-gray-700"}`}
        >
          完了済み
        </button>
      </div>

      {/* タスク一覧 */}
      <ul className="space-y-2">
        {filteredTasks.length === 0 ? (
          <p className="text-center text-gray-400 py-4">タスクがありません</p>
        ) : (
          filteredTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={toggleTask}
              onDelete={deleteTask}
            />
          ))
        )}
      </ul>
    </div>
  );
}

export default App;