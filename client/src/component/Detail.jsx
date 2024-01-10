// Detail.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function Detail() {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/books/${id}`)
      .then((res) => {
        setBook(res.data.book);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Terjadi kesalahan saat mengambil data.");
        setLoading(false);
      });
  }, [id]);

  const handleBuyClick = () => {
    if (book) {
      const confirmBuy = window.confirm(
        `Anda yakin ingin membeli buku '${book.judul}'?`
      );
      if (confirmBuy) {
        alert(`Anda telah membeli buku '${book.judul}'`);

        axios
          .delete(`http://localhost:3001/api/books/${id}`)
          .then(() => {
            navigate("/dashboard");
          })
          .catch((err) => {
            console.error("Error deleting book:", err);
          });
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!book) {
    return <div>Data buku tidak ditemukan.</div>;
  }

  const { judul, author, image } = book;

  return (
    <div className="container-mx-3">
      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900">
          Applicant Information
        </h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
          Personal details and application.
        </p>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Judul
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {judul}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Author
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {author}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Book Image
            </dt>
            <img
              src={image}
              className="h-full w-full object-cover object-center group-hover:opacity-75"
            />
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <button
              onClick={handleBuyClick}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Buy
            </button>
          </div>
        </dl>
      </div>
    </div>
  );
}
