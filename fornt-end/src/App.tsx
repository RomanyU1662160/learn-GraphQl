import React from 'react';
import logo from './logo.svg';
import './App.css';
import BookList from './components/BookList';
import { IBook } from './interfaces/interfaces';
import { useQuery, gql } from '@apollo/client';

const GET_BOOKS = gql`
  query {
    books {
      title
      id
      genre
      year
      authorId {
        name
        email
      }
    }
  }
`;

interface BooksQueryResponse {
  books: IBook[];
}

const App = () => {
  const { loading, error, data } = useQuery<BooksQueryResponse>(GET_BOOKS);
  console.log('loading', loading);
  console.log('data', data);
  console.log('error', error);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return (
    <div className='App '>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
      </header>
      <div className='container'>
        <BookList books={data!.books}> </BookList>
      </div>
    </div>
  );
};

export default App;
