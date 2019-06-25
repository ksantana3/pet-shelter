import React, { Component } from 'react';
import axios from 'axios';


export class View extends Component {
    constructor(props){
        super(props);
        this.state = {
            pet: {},
            disabled: false
        }
        
    }
    componentDidMount = () => {
        console.log(this.props.match.params._id);
        axios.get(`http://localhost:8000/api/pets/${this.props.match.params._id}`)
            .then(res => {
                this.setState({pet: res.data.pet});
            })
    }
   
    updateLike = (e) => {
        axios.put(`http://localhost:8000/api/pets/${this.state.pet._id}`, this.state.pet)
        .then( res => {
            console.log(res);
            // this.componentDidMount();
        })
        .catch( err => {
            console.log(err);
        });
    }
    
    likeme = (e) => {
        let p = {...this.state.pet};
        var count = this.state.pet.like+1 
        p["like"] = count;
        this.setState({pet: p, disabled: true}, function () {this.updateLike();})
      }
    delete = (_id) => {
        axios.delete(`http://localhost:8000/api/pets/${_id}`)
        .then( res => {
            if(res.data.errors){
              this.setState({errors: res.data.errors.errors})
            } else {
              this.props.history.push("/");
            }
          });
      }
    
    render() {
        const view = this.state.disabled === false;
        return (
            <div>
              <div style={{display: "flex", justifyContent: "space-around"}}>
              {/* {this.state.pet.name} */}
                <img src={this.state.pet.image} alt="the pet" className="aligntop"/>
                <span className="aligntop">
                  <h1>Details about {this.state.pet.name}</h1>
                  <p>Type: {this.state.pet.type}</p>
                  <p>Description: {this.state.pet.description}</p>
                  <p>Skills:{this.state.pet.skill1}</p>
                  <p>{this.state.pet.skill2}</p>
                  <p>{this.state.pet.skill3}</p>
                  <p> Likes: {this.state.pet.like}</p>
                  &nbsp;
                  <span>
                  <button onClick={() => { this.delete(this.state.pet._id) }} 
                    className="btn">Adopt Me!</button>
                    &nbsp;&nbsp;&nbsp;
                  {view ? <button onClick={() => { this.likeme(this.state.pet._id) }} 
                    className="btn">Like Me!</button> : 
                    <button className="btn">Like Me!</button>}
                    </span>  
                </span>
              </div>
            </div>
        );
    }
}

export default View;