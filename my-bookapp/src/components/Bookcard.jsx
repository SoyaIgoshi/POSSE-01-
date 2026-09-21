export default function BookCard({ title, author, rating, comment }) {
  return (
    <div className="bg-white rounded-lg shadow p-4 border border-gray-100">
      <h3 className="text-lg font-bold text-gray-800">{title}</h3>
      <p className="text-sm text-gray-500">著者: {author}</p>
      <p className="text-amber-500 font-semibold my-1">評価: {rating}</p>
      <p className="text-gray-600 text-sm">{comment}</p>
    </div>
  );
}