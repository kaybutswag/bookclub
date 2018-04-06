import axios from "axios";

export default {
  // Gets all books
  searchBooks: function(query) {
    return axios.get("https://api.nytimes.com/svc/books/v3/lists/best-sellers/history.json",{params:query});
 },
 searchSuggestions:function(query){
    return axios.get("https://api.nytimes.com/svc/books/v3/lists.json",{params:query});
 },
  // Gets the book with the given id
  getBooks:function(){
    return axios.get("/api/books/")
  },
  // Deletes the book with the given id
  deleteBook: function(id) {
    return axios.delete("/api/books/" + id);
  },
  // Saves a book to the database
  saveBook: function(bookData) {
    return axios.post("/api/books/", bookData);
  }
}
