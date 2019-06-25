import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import axios from 'axios';

class List extends Component {

  constructor(props){
    super(props);
    this.state = {
      pets: []
    }
  }
  componentDidMount = () => {
    axios.get("/api/pets")
      .then( res => {
        this.setState({pets: res.data.pets});
      })
      .catch( err => {
        console.log(err);
      });
  }

  delete = (_id) => {
    axios.delete(`/api/pets/${_id}`)
      .then( res => {
        console.log(res);
        this.componentDidMount();
      })
      .catch( err => {
        console.log(err);
      });
  }

  render() {
    return (
      <>
      <div className = "pet_header">
          <p>Image</p>
          <p>Pet Name</p> 
          <p>Pet Type</p>
          <p>Actions</p>
      </div>
      {this.state.pets.sort(function(a, b){
            if(a.type < b.type) { return -1; }
            if(a.type > b.type) { return 1; }
            return 0;
        }).map( pet =>
        <div key={pet._id} className="pet">
          <img src={pet.image} alt={pet.name} height="100px" />
          <h3>{pet.name}</h3>
          <p>{pet.type}</p>
          {/* <p>{pet.description}</p> */}
          <span>
          <Link to={`/pet/${pet._id}`}>View</Link>
          &nbsp;
          <Link to={`/edit/${pet._id}`}>Edit</Link>
          &nbsp;
          {/* <a href="#!" onClick={this.delete.bind(this, pet._id)}>Delete</a> */}
        </span>
        </div>
      )
      }
      </>
    )
  }
}

export default List