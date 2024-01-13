import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Signup() {
  const [judul, setJudul] = useState("");
  const [pengarang, setPengarang] = useState("");
  const [cover, setCover] = useState("");
  const [harga, setHarga] = useState(0);
  const [stok, setStok] = useState(0);
  const [deskripsi, setDeskripsi] = useState("");
  const [kategori, setKategori] = useState([]);
  const [bahasa, setBahasa] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/add", {
        judul,
        pengarang,
        cover,
        harga,
        stok,
        deskripsi,
        kategori,
        bahasa,
      })
      .then((result) => {
        console.log(result);
        navigate("/dashboard");
      })
      .catch((error) => console.log(error));
  };

  const handleCheckboxChange = (e) => {
    const { value } = e.target;
    const updatedKategori = [...kategori];
    const index = updatedKategori.indexOf(value);
    if (index > -1) {
      updatedKategori.splice(index, 1);
    } else {
      updatedKategori.push(value);
    }
    setKategori(updatedKategori);
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setCover(file.name);
    setImageFile(file);
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Add Book
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="judul"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Judul
              </label>
              <div className="mt-2">
                <input
                  id="judul"
                  name="judul"
                  type="text"
                  autoComplete="judul"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => setJudul(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="pengarang"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Author
              </label>
              <div className="mt-2">
                <input
                  id="pengarang"
                  name="pengarang"
                  type="text"
                  autoComplete="pengarang"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => setPengarang(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="harga"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Harga
              </label>
              <div className="mt-2">
                <input
                  id="harga"
                  name="harga"
                  type="number"
                  autoComplete="harga"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => setHarga(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="stok"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Stok
              </label>
              <div className="mt-2">
                <input
                  id="stok"
                  name="stok"
                  type="number"
                  autoComplete="stok"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => setStok(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="deskripsi"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Deskripsi
              </label>
              <div className="mt-2">
                <input
                  id="deskripsi"
                  name="deskripsi"
                  type="text"
                  autoComplete="deskripsi"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => setDeskripsi(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Cover
              </label>
              <div className="mt-2">
                <input
                  id="cover"
                  name="cover"
                  type="file"
                  accept="cover/*"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={handleImageChange}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Kategori
              </label>
              <div className="mt-2 space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    value="Fiksi"
                    checked={kategori.includes("Fiksi")}
                    onChange={handleCheckboxChange}
                    className="rounded-md border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                  <span className="ml-2">Fiksi</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    value="Non-Fiksi"
                    checked={kategori.includes("Non-Fiksi")}
                    onChange={handleCheckboxChange}
                    className="rounded-md border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                  <span className="ml-2">Non-Fiksi</span>
                </label>
                {/* ... (other checkbox options) */}
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="bahasa"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Bahasa
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="bahasa"
                  name="bahasa"
                  type="text"
                  autoComplete="current-bahasa"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => setBahasa(e.target.value)}
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Input
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
