import React ,{useState} from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Signup() {
  const [judul, setJudul] = useState();
  const [author, setAuthor] = useState();
  const [image, setImage] = useState();
  const navigate = useNavigate(); 

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('http://localhost:3001/add', {judul, author, image})
    .then(result => {console.log(result)
      navigate('/dashboard')
    })
    .catch(error => console.log(error))
  }

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
                htmlFor="author"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Author 
              </label>
              <div className="mt-2">
                <input
                  id="author"
                  name="author"
                  type="text"
                  autoComplete="author"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => setAuthor(e.target.value)}
                  />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="image"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  image
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="image"
                  name="image"
                  type="text"
                  autoComplete="current-image"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => setImage(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
            <div>
              <Link to={"/login"} className="flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-indigo-500 shadow-sm">
                Login
              </Link>
              </div>
          </form>
        </div>
      </div>
    </>
  );
}
