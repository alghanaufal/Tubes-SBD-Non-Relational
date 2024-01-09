import React, {useEffect, useState} from "react";
import axios from "axios";
import { BookCard } from "./BookCard";

export default function Dashboard() {
    const [books, setBook] = useState([])
    useEffect(() =>{
        axios.get('http://localhost:3001/books')
        .then(res => {
            setBook(err.data.book)
            console.log(err.data)
        }).catch(err => {console.log(err)});
    }, [])
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Books</h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {books.map(book => {
            return <BookCard key={book.id} book = {book}></BookCard>
          })
          }
        </div>
      </div>
    </div>
  );
}
