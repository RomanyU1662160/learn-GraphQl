export interface IBook {
  id: number;
  title: string;
  genre: string;
  year: number;
  authorId: IAuthor;
}

export interface IAuthor {
  name: string;
  email: string;
}
