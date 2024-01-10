// Detail.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";

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

  const { judul, pengarang, cover, harga, deskripsi, kategori, bahasa } = book;
  const imagePath = `/cover/${cover}`;

  return (
    <div className="container flex justify-center">
      <div className="max-w-md py-8 ">
        <div className="text-center">
          <h3 className="text-base font-semibold leading-7 text-gray-900">
            Informasi Buku
          </h3>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
            Detail buku yang dipilih.
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
            <div className="aspect-h-1 aspect-w-1 w-full">
              <img src={imagePath} alt={judul} className="w-48 h-auto" />
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Pengarang
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {pengarang}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Harga
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {harga}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Deskripsi
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {deskripsi}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Kategori
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {kategori && kategori.join(", ")}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Bahasa
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {bahasa}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <button
                onClick={handleBuyClick}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Beli
              </button>
            </div>
          </dl>
        </div>
        <div className="px-4 py-4 text-center">
          <Link to="/dashboard" className="bg-gray-300 px-4 py-2 rounded">
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
