import { Model, Types } from "mongoose";

export type IBookFilters = {
  searchTerm?: string;
  genre?: string;
  publication_date?: Date;
};

export type IBook = {
  title: string;
  author: string;
  genre: string;
  publication_date: Date;
  comments: string[];
  publisher_id: Types.ObjectId;
};

export type BookModel = Model<IBook, Record<string, unknown>>;
