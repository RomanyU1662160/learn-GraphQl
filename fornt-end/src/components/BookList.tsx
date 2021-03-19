import React, { ReactElement } from 'react';
import { IBook } from '../interfaces/interfaces';
import Book from './Book';

interface BookListProps {
  books: IBook[];
  children: string;
}

const BookList: React.FC<BookListProps> = (
  props: BookListProps
): ReactElement => {
  const { books } = props;

  return (
    <div className='row'>
      {books.map((book) => {
        return <Book book={book} key={book.id}></Book>;
      })}
    </div>
  );
};

export default BookList;
