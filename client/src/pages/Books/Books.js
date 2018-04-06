import React, { Component } from "react";
import API from "../../utils/API";
import DeleteBtn from "../../components/DeleteBtn";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";


class Search extends Component {
  state = {
    books:[]
  };

  componentDidMount() {
    this.loadBooks();
  }


  loadBooks = () => {
    API.getBooks({
    })
      .then(res =>{
        console.log(res);
        const bookd=[];
        this.setState({books:[]});
        let counter=0;
        res.data.map(bookob=>{
          let tempArray={
          id:bookob._id,
          title: bookob.title,
          author: bookob.author,
          synopsis: bookob.description,
          number: counter++
        }
        bookd.push(tempArray);
          });

        this.setState({books:bookd});
      })
      .catch(err => console.log(err));
  };

  removeBook = id => {
    console.log(id);
    API.deleteBook(id)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  };


  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="xs-12">
            <h1>Our Books</h1>
              {!this.state.books.length ? (
                <h1 className="text-center">Nothing saved yet!</h1>
              ) : (
                <List>
                  {this.state.books.map(book => {
                    return (
                      <ListItem 
                        key={book.id}
                        title={book.title}
                        number={book.number}
                        author={book.author}
                         > 
                        <DeleteBtn onClick={() => this.removeBook(book.id)} />
                      </ListItem>
                    );
                  })}
                </List>
              )}
            </Col>
        </Row>
      </Container>
    );
  }
}

export default Search;
///