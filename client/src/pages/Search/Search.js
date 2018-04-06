import React, { Component } from "react";
import API from "../../utils/API";
import SaveBtn from "../../components/SaveBtn";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, FormBtn } from "../../components/Form";
import "./Search.css";

class Search extends Component {
  state = {
    books:[],
    title:"",
    author:"",
    message: "Search Requires Name of Author or Title",
  };

key='d97e4d75c3fd47ac899b353f501391b1';


searchBooks = () => {
    API.searchBooks({
      'api-key': this.key,
      'author': this.state.author,
      'title': this.state.title,
    })
      .then(res =>{
        console.log(res);
        this.setState({books:[]});
        if(res.data.results.length>0){
        let counter=0;
        res.data.results.map(bookob=>{
          let tempArray={
          title: bookob.title,
          author: bookob.author,
          synopsis: bookob.description,
          saved: "false",
          number: counter++
        }
        this.state.books.push(tempArray);
          });

        this.setState({title: "", author: "",message:"Search Requires Name of Author or Title"});
        console.log(this.state.books);
      }
        else
        this.setState({message: "No Results Found."});
      }
      )
      .catch(err => console.log(err));
  };

  getSuggestions=()=>{
    API.searchSuggestions({
      'api-key': this.key,
      'list': "trade-fiction-paperback"
    })
    .then(res=>{
      this.setState({books:[]});
        let counter=0;
        const bookd=[];
        res.data.results.map(bookob=>{
          let tempArray2={
          title: bookob.book_details[0].title,
          author: bookob.book_details[0].author,
          synopsis: bookob.book_details[0].description,
          saved: "false",
          number: counter++,
          newid:""
        }
        console.log(tempArray2);
        bookd.push(tempArray2);
          });
        this.setState({books:bookd});
    })
    .catch(err => console.log(err));
  };

  saveThisBook = book=> {
    API.saveBook({
      dumnum:book.number,
      title: book.title,
      author: book.author,
      synopsis: book.synopsis
    })
      .then(res => {
        this.savedfunction(res.data.dumnum,res.data._id);
      })
      .catch(err => console.log(err));
  };

  removeBook = id => {
    API.deleteBook(id)
      .then(res => 
        this.savedfunction(res.data.dumnum,res.data._id)
    )
      .catch(err => console.log(err));
  };

savedfunction=(currentnum,dataid)=>{
  console.log(this.state.books);
  const checkstate2=this.state.books.map(book =>{
     if (book.number===currentnum&&book.saved==="false"){
        book.saved="true";
        book.newid=dataid;
     }
     else if(book.number===currentnum&&book.saved==="true"){
        book.saved="false";
        book.newid="";
     }
  });
  this.setState({checkstate2});
};


    handleInputChange = event => {
      const { name, value } = event.target;
      this.setState({
        [name]: value
      });
    };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.title || this.state.author)
      this.searchBooks();
  };

  handleOtherSubmit = event => {
    event.preventDefault();
      this.getSuggestions();
  };


  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
              <h1 className="forFont">Search</h1>
            <form>
            <label>Book Title</label>
              <Input
                value={this.state.title}
                onChange={this.handleInputChange}
                name="title"
              />
              <label>Author</label>
              <Input
                value={this.state.author}
                onChange={this.handleInputChange}
                name="author"
              />
              <FormBtn
                disabled={!(this.state.author) && !(this.state.title)}
                onClick={this.handleFormSubmit}
              >
                Search
              </FormBtn>
              <FormBtn
                disabled={(this.state.author) || (this.state.title)}
                onClick={this.handleOtherSubmit}
              >
                Suggestions
              </FormBtn>
            </form>
          </Col>
        </Row>
        <Row>
          <Col size="xs-12">
              {!this.state.books.length ? (
                <h1>{this.state.message}</h1>
              ) : (
              <div>
                <h1>Results (up to 20 results)</h1>
                <List>
                {this.state.books.map(book => {
                    if(book.saved==="false"){
                    return (
                      <ListItem 
                        key={book.number}
                        number={book.number}
                        title={book.title}
                        author={book.author}
                        >
                        <SaveBtn onClick={() => this.saveThisBook(book)}>Add to List</SaveBtn>

                      </ListItem>

                      );
                    }
                    else{
                      return (
                      <ListItem
                        key={book.number}
                        number={book.number}
                        title={book.title}
                        author={book.author}
                         >  
                        <SaveBtn onClick={() => this.removeBook(book.newid)}>Saved!</SaveBtn>
                      </ListItem>
                      );
                    }
                  })}
                </List>
                </div>
              )}

            </Col>
        </Row>
      </Container>
    );
  }
}

export default Search;
