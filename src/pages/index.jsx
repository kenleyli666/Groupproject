import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import '../../app/globals.css';
import Importimg from './components/importimg'

export default function Home() {
  const [books, setBooks] = useState([]);
  const [filters, setFilters] = useState({
    title: '',
    author: '',
    publication_year: '',
    price: ''
  });

  useEffect(() => {
    axios.get('/api/books', { headers: { 'Cache-Control': 'no-cache' } })
      .then(response => {
        console.log('Response data:', response.data);
        if (Array.isArray(response.data)) {
          setBooks(response.data);
        } else {
          console.error('Response data is not an array:', response.data);
        }
      })
      .catch(error => {
        console.error('Error fetching the books data:', error);
      });
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  const filteredBooks = books.filter(book => {
    return (
      book.title.toLowerCase().includes(filters.title.toLowerCase()) &&
      book.author.toLowerCase().includes(filters.author.toLowerCase()) &&
      (filters.publication_year === '' || book.publication_year.toString() === filters.publication_year) &&
      (filters.price === '' || book.price.toString() === filters.price)
    );
  });

  return (
    <>
      <div className="p-4 ">
        <h1 className="text-2xl font-bold mb-4 text-red-500">Home Page</h1>
        <nav className="mb-4">
          <ul className="flex space-x-4">
            <li><Link href="/aboutus" className="text-blue-500 hover:underline">About Us</Link></li>
            <li><Link href="/contactus" className="text-blue-500 hover:underline">Contact Us</Link></li>
            <li><Link href="/detail" className="text-blue-500 hover:underline">Detail</Link></li>
          </ul>
        </nav>

        <h2 className="text-xl font-semibold mb-4 text-red-700">Book List</h2>
        <div className="mb-4">
          <input
            type="text"
            name="title"
            placeholder="Filter by title"
            value={filters.title}
            onChange={handleFilterChange}
            className="border p-2 mr-2"
          />
          <input
            type="text"
            name="author"
            placeholder="Filter by author"
            value={filters.author}
            onChange={handleFilterChange}
            className="border p-2 mr-2"
          />
          <input
            type="text"
            name="publication_year"
            placeholder="Filter by year"
            value={filters.publication_year}
            onChange={handleFilterChange}
            className="border p-2 mr-2"
          />
          <input
            type="text"
            name="price"
            placeholder="Filter by price"
            value={filters.price}
            onChange={handleFilterChange}
            className="border p-2"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredBooks.map((book, index) => (
            <div key={index} className="border p-4 flex flex-col items-center">
              <h3 className="text-lg font-bold mb-2">{book.title}</h3>
              <p className="mb-1">Author: {book.author}</p>
              <p className="mb-1">Year: {book.publication_year}</p>
              <p className="mb-1">Price: ${book.price}</p>
              <p className="mb-2">Description: {book.description}</p>
              <Image src={book.cover_image} alt={book.title} width={200} height={300} className="w-full h-auto" />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
