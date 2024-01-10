import React from "react";
import { Link } from "react-router-dom";

export function BookCard({ book }) {
  const { judul, author, image } = book;
  console.log("---------" + book)
  return (
    <Link to={`/detail/${book._id}`} className="group">
    <>
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
        <img
          src={image}
          className="h-full w-full object-cover object-center group-hover:opacity-75"
        />
      </div>
      <h3 className="mt-4 text-sm text-gray-700">{judul}</h3>
      <p className="mt-1 text-lg font-medium text-gray-900">{author}</p>
    </>
    </Link>
  );
}
