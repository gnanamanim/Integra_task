import React, {Component} from 'react';
import './App.css';

class User extends Component {
 
  constructor(props) {
    super(props)
    this.state = {
      userName: "",
      email: "",
      password: "",
      status: 1,
      isNameError: "",
      isEmailError: "",
      isPasswordError:"",
      isAdd: true,
      isUpdate: false,
      index: ""
    }
    this.userList = [];
}
  handleTextChage = (value,type) => {
      if(value){
        if(type === "username"){
          this.setState({userName: value, isNameError: ''});
        } else if(type === "email"){
              const mailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
              if(mailPattern.test(value.toLowerCase())){
                  this.setState({email: value, isEmailError: ''});
              } else {
                  this.setState({email: value, isEmailError: 'Please enter the valid email'});
              }
        } else if(type === "password"){
          this.setState({password: value, isPasswordError: ''});
        } else if(type === "status"){
          this.setState({status: value});
        }
      } else {
          if(type === "username"){
              this.setState({userName: "",isNameError: 'Name is required'});
          } else if(type === "email"){
            this.setState({email: "",isEmailError: 'Email is required'});
          } else if(type === "password"){
              this.setState({password: "", sPasswordError: 'Password is required'});
          }
      }

  }
  register = () => {
    if(this.state.userName && this.state.email && this.state.password){
        if(!this.state.isNameError && !this.state.isEmailError && !this.state.isPasswordError) {
          console.log(this.state, 'state valueee');
          const data ={
            name: this.state.userName,
            email: this.state.email,
            password: this.state.password,
            status: this.state.status
          }
          if(!this.state.isUpdate){
            this.userList.push(data);
            this.clearData(false);
          } else {
            this.userList[this.state.index].name = this.state.userName;
            this.userList[this.state.index].email = this.state.email;
            this.userList[this.state.index].password = this.state.password;
            this.userList[this.state.index].status = this.state.status;
            this.clearData(false);
          }
          
        } else {
            alert('Please enter the valid inputs');
        }
    } else {
        if(this.state.userName === ""){
            this.setState({isNameError: 'Name is required'});
        }
        if(this.state.email === ""){
          this.setState({isEmailError: 'Email is required'});
        }
        if(this.state.password === ""){
            this.setState({isPasswordError: 'Password is required'});
        }
    }
  }
  clearData = (flag) => {
    this.setState({
      isAdd: flag,
      userName: "",
      email: "",
      password: "",
      status: 1,
      isNameError: "",
      isEmailError: "",
      isPasswordError:"",
      index: "",
      isUpdate: false
    });
  }
  editData = (data, i) => {
    this.setState({
      userName: data.name,
      email: data.email,
      password: data.password,
      active: data.status,
      isAdd: true,
      isUpdate: true,
      index: i
    });
  }

  render(){
    return(
      <>
        { this.state.isAdd &&
          <div className="container">
            <form>
              <div className="title">
                <h2>User Registration</h2>
              </div>
              <div>
                <label>Name</label>
                <input type="text" placeholder="User name" value={this.state.userName} onChange={(e) => this.handleTextChage(e.target.value,'username')} required></input>
                { this.state.isNameError && <span className="errorClass"> {this.state.isNameError} </span>}
              </div>
              <div>
                <label>Email</label>
                <input type="text" placeholder="Email" value={this.state.email} onChange={(e) => this.handleTextChage(e.target.value,'email')} required></input>
                { this.state.isEmailError && <span className="errorClass"> {this.state.isEmailError} </span>}
              </div>
              <div>
                <label>Password</label>
                <input type="text" placeholder="Password" value={this.state.password} onChange={(e) => this.handleTextChage(e.target.value,'password')} required></input>
                { this.state.isPasswordError && <span className="errorClass"> {this.state.isPasswordError} </span>}
              </div>
              <div class="custom-select" >
                <label>Status</label>
                <select onChange={(e) => this.handleTextChage(e.target.value,'status')} value={this.state.status}>
                  <option value="1">Active</option>
                  <option value="0">Inactive</option>
                </select>
              </div>
              
              <div className="buttonRow">
                <button onClick={this.register} className="button">{ this.state.isUpdate ? 'Update' : 'Save'}</button>
                <button onClick={() =>{this.setState({isAdd: false})}} className="buttonBack">View</button>

              </div>
            </form>                  
        </div>
      }
        { !this.state.isAdd &&
          <div className="tableContainer">
            <div style={{paddingBottom: 10}}>
              <button onClick={() => this.clearData(true)} className="buttonBack">Back</button>
            </div>
            <table id="customers">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Password</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
              <tbody>
                { this.userList.length > 0 ? this.userList.map((list, i) =>
                  <tr key={i}>
                    <td>{list.name}</td>
                    <td>{list.email}</td>
                    <td>{list.password}</td>
                    <td>{list.status}</td>
                    <td>
                      <span className="editIcon" onClick={() => this.editData(list, i)}>Edit</span>
                      </td>
                  </tr>
                )
                : 
                <tr>
                  <td colSpan="5" style={{textAlign: 'center'}}>No Data Found</td>
                </tr>
                }
              </tbody>
            </table>
          </div>
        }

        </>


        
    )
}
}

export default User;
