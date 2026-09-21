import BookCard from "./components/BookCard";

// 本のデータ（3冊以上）
const bookData = [
  { id: 1, title: "リーダブルコード", author: "Dustin Boswell", rating: 5, comment: "読みやすいコードのバイブル。" },
  { id: 2, title: "React入門", author: "山田 太郎", rating: 4, comment: "基礎がしっかり学べる。" },
  { id: 3, title: "CSS設計完全ガイド", author: "鈴木 一郎", rating: 5, comment: "レイアウトの迷いが消えた。" },
];

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-xl mx-auto space-y-4">
        <h1 className="text-2xl font-bold text-center mb-6">わたしの本棚</h1>
        
        {/* mapでクルクル回してカードを並べる */}
        {bookData.map((book) => (
          <BookCard
            key={book.id}
            title={book.title}
            author={book.author}
            rating={book.rating}
            comment={book.comment}
          />
        ))}
      </div>
    </div>
  );
}