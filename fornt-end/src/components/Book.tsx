import React from 'react';
import { IBook, IAuthor } from '../interfaces/interfaces';

type Bookprops = {
  book: IBook;
};

const Book: React.FC<Bookprops> = (props: Bookprops) => {
  let { title, year, genre, authorId } = props.book;

  return (
    <div className='card col-md-3 mt-2'>
      <div className='card-header bg-info'>
        <h3 className='card-tittle bg-info'> {title}</h3>
      </div>
      <div className='card-body'>
        <table className='table table-hover'>
          <thead>
            <tr>
              <th> title</th>
              <td> {title}</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th> Year Of publish </th>
              <td> {year}</td>
            </tr>
            <tr>
              <th> Genre</th>
              <td> {genre}</td>
            </tr>
            <tr>
              <th> Author </th>
              <td> {authorId ? authorId.name : 'Unknown'}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className='card-footer bg-primary'>
        <button className='btn btn-outline-warning float-right '> Read </button>
      </div>
    </div>
  );
};

export default Book;
