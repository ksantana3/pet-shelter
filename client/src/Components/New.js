import React, { Component } from 'react';
import FileUpload from './FileUpload';
import axios from 'axios';

class New extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            newPet: {
                name: "",
                type: "",
                description: "",
                image: "default",
                skills1: "",
                skills2: "",
                skills3: ""
            },
            errors: {}
        }
    }
    change = (key, e) => {
        let p = {...this.state.newPet};
        p[key] = e.target.value;
        this.setState({newPet: p});
    }

    fileChange = (image) => {
      let p = {...this.state.newPet, image: image};
      this.setState({newPet: p});
    }

    makePet = (e) => {
      e.preventDefault();
      axios.post("http://localhost:8000/api/pets", this.state.newPet)
        .then( res => {
          if(res.data.errors){
            this.setState({errors: res.data.errors.errors})
          } else {
            this.props.history.push("/");
          }
        });
    }

    render() {
        return (
            <form onSubmit={this.makePet}>
                <div className="form-group">
                    <label>Pet Name:</label>
                    <input type="text" onChange={this.change.bind(this, "name")} />
                    {
                      this.state.errors.name ?
                      <p>{this.state.errors.name.message}</p>:
                      ""
                    }
                </div>

                <div className="form-group">
                    <label>Pet Type:</label>
                    <input type="text" onChange={this.change.bind(this, "type")} />
                    {
                      this.state.errors.type ?
                      <p>{this.state.errors.type.message}</p>:
                      ""
                    }
                </div>

                <div className="form-group">
                    <label>Pet Description:</label>
                    <input type="text" onChange={this.change.bind(this, "description")} />
                    {
                      this.state.errors.description ?
                      <p>{this.state.errors.description.message}</p>:
                      ""
                    }
                </div>

                <div className="form-group">
                    <label>Skill 1:</label>
                    <input type="text" onChange={this.change.bind(this, "skill1")} />
                </div>
                <div className="form-group">
                    <label>Skill 2:</label>
                    <input type="text" onChange={this.change.bind(this, "skill2")} />
                </div>
                <div className="form-group">
                    <label>Skill 3:</label>
                    <input type="text" onChange={this.change.bind(this, "skill3")} />
                </div>

                <div className="form-group">
                    <label>Pet Image:</label>
                    <FileUpload onUpload={this.fileChange} />
                </div>

                <input type="submit" className="btn-submit" />
            </form>
        );
    }
}

export default New;