import React from "react";
import { Link, useLocation } from "react-router-dom";

export function BookCard({ book }) {
  const { judul, pengarang, cover } = book;

  const imagePath = `cover/${cover}`;

  const location = useLocation();
  const isHistoryPage = location.pathname === "/history";

  if (isHistoryPage) {
    return (
      <div className="group">
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
          <img
            src={imagePath}
            alt={judul}
            className="h-full w-full object-cover object-center opacity-25"
          />
        </div>
        <h3 className="mt-4 text-sm text-gray-700">{judul}</h3>
        <p className="mt-1 text-lg font-medium text-red-500">Stock Habis</p>
        <p className="mt-1 text-lg font-medium text-gray-900">{pengarang}</p>
      </div>
    );
  }

  return (
    <Link to={`/detail/${book._id}`} className="group">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
        <img
          src={imagePath}
          alt={judul}
          className="h-full w-full object-cover object-center group-hover:opacity-75"
        />
      </div>
      <h3 className="mt-4 text-sm text-gray-700">{judul}</h3>
      <p className="mt-1 text-lg font-medium text-gray-900">{pengarang}</p>
    </Link>
  );
}

export default BookCard;
