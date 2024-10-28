import React, { useState } from 'react';
import BookCard from '../books/BookCard';
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useFetchAllBooksQuery } from '../../redux/features/books/booksApi';

// Ganti catrgories dengan categories
const categories = ["Choose a genre", "Business", "Fiction", "Horror", "Adventure"];

export const TopSellers = () => {
  const [selectedCategory, setSelectedCategory] = useState('Choose a genre');
  const { data: books = [], error, isLoading } = useFetchAllBooksQuery();

  console.log("Books:", books);
  console.log("Error:", error);
  console.log("Loading:", isLoading);

  const filteredBooks = selectedCategory === 'Choose a genre' 
    ? books 
    : books.filter(book => book.category.toLowerCase() === selectedCategory.toLowerCase());

  if (isLoading) return <p>Loading...</p>; // Menampilkan pesan loading
  if (error) return <p>Error: {error.message}</p>; // Menampilkan pesan error

  return (
    <div className='py-10'>
      <h2 className='text-3xl font-semibold mb-6'>Top Sellers</h2>
      
      {/* categories filter */}
      <div className='mb-8 flex items-center'>
        <select 
          onChange={(e) => setSelectedCategory(e.target.value)}
          name="category" id="category" className='bg-[#EAEAEA] border-gray-300 rounded-md px-4 py-2 focus:outline-none'>
          {
            categories.map((category, index) => (
              <option key={index} value={category}>{category}</option> // Memperbaiki value
            ))
          }
        </select>
      </div>

      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        navigation={true}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 50,
          },
          1180: {
            slidesPerView: 3,
            spaceBetween: 50,  
          }
        }}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {
          filteredBooks.length > 0 && filteredBooks.map((book, index) => (
            <SwiperSlide key={index}> {/* Menambahkan key di sini */}
              <BookCard book={book} />
            </SwiperSlide>
          ))
        }
      </Swiper>
    </div>
  );
};