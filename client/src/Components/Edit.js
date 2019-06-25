import React, { Component } from 'react'
import FileUpload from './FileUpload';
import axios from 'axios';

class Edit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pet: {
        name: "",
        type: "",
        description: "",
        skill1: "",
        skill2: "",
        skill3: "",
        image: ""
      },
      errors: {}
    }
  }

  componentDidMount = () => {
    console.log(this.props.match.params._id);
    axios.get(`/api/pets/${this.props.match.params._id}`)
      .then( res => {
        this.setState({pet: res.data.pet});
      })
      .catch( err => {
        console.log(err);
      });
  }

  change = (key, e) => {
    let p = {...this.state.pet};
    p[key] = e.target.value;
    this.setState({pet: p});
  }

  fileChange = (image) => {
    let p = {...this.state.pet, image: image};
    this.setState({pet: p});
  }

  updatePet = (e) => {
    e.preventDefault();
    axios.put(`/api/pets/${this.state.pet._id}`, this.state.pet)
      .then( res => {
        if(res.data.errors){
          this.setState({errors: res.data.errors.errors})
        } else {
          this.props.history.push(`/pet/${this.state.pet._id}`);
        }
      });
  }

  render() {
    return (
      <form onSubmit={this.updatePet}>
        <div className="form-group">
          <label>Pet Name:</label>
          <input type="text" onChange={this.change.bind(this, "name")} value={this.state.pet.name} />
          {
            this.state.errors.name ? 
            <p>{this.state.errors.name.message}</p>:
            ""
          }
        </div>

        <div className="form-group">
          <label>Pet Type:</label>
          <input type="text" onChange={this.change.bind(this, "type")} value={this.state.pet.type} />
          {
            this.state.errors.type ?
            <p>{this.state.errors.type.message}</p>:
            ""
          }
        </div>

        <div className="form-group">
          <label>Pet Description:</label>
          <input type="text" onChange={this.change.bind(this, "description")} value={this.state.pet.description} />
          {
            this.state.errors.description ?
            <p>{this.state.errors.description.message}</p>:
            ""
          }
        </div>

        <div className="form-group">
          <label>Skill 1:</label>
          <input type="text" onChange={this.change.bind(this, "skill1")} value={this.state.pet.skill1} />
        </div>

        <div className="form-group">
          <label>Skill 2:</label>
          <input type="text" onChange={this.change.bind(this, "skill2")} value={this.state.pet.skill2} />
        </div>

        <div className="form-group">
          <label>Skill 3:</label>
          <input type="text" onChange={this.change.bind(this, "skill3")} value={this.state.pet.skill3} />
        </div>

        <div className="form-group">
          <label>
            <img src={this.state.pet.image} alt="pet image" width="100px" />
          </label>
          <FileUpload onUpload={this.fileChange} />
        </div>

        <input type="submit" className="btn" value="Update" />

      </form>
    )
  }
}

export default Edit