import React, { Component } from 'react';

import './App.css';
import {Button,Card, Col, Form, FormGroup, Label, Input,Table, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';

class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      name:"",
      Designation:"",
      location:"",
      postStatus:"",
      deletestatus:'',
      updatestatus:'',
      data:[],
      modal: false,
      ID:0,
    }
    this.handleChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this);
    this.toggle = this.toggle.bind(this);
  }
  toggle(id) {
    
    
    this.setState({
      modal: !this.state.modal,
      ID:id
    });
   
  }
  submit(){
    var data={
      "Name": this.state.name,
      "Designation": this.state.Designation,
      "Location": this.state.location,
        }
    fetch("http://localhost:55773/api/PostEmployee",{
      method: 'POST',
      headers:{'Content-Type': 'application/json',
                'Accept': 'application/json'
              },
      body: JSON.stringify(data)
      
    }).then(Response=>{            
      Response.json().then(body=>{ 
        this.setState({postStatus:body})
      });
     })
    
    console.log(data);
    
  }
  update(){
    var data={
      "ID":this.state.ID,
      "Name": this.state.name,
      "Designation": this.state.Designation,
      "Location": this.state.location,
        }
        console.log("Updated data");
        console.log(data);
    fetch("http://localhost:55773/api/PutEmployee?id="+this.state.ID,{
      method: 'PUT',
      headers:{'Content-Type': 'application/json',
                'Accept': 'application/json'
  
              },
              body: JSON.stringify(data)
            }).then(Response=>{            
      Response.json().then(body=>{ 
        this.setState({
          modal: !this.state.modal,
          
        });
       
      });
     })
    

  }
  delete(id){
    fetch("http://localhost:55773/api/DeleteEmployee?id="+id,{
      method: 'DELETE',
      headers:{'Content-Type': 'application/json',
                'Accept': 'application/json'
              }}).then(Response=>{            
      Response.json().then(body=>{ 
        this.setState({deletestatus:body})
      });
     })
    console.log("id");
    console.log(id);

  }
 
  componentWillMount(){
    fetch("http://localhost:55773/api/GetEmployees").then(Response=>{            
      Response.json().then(body=>{ 
        this.setState({data:body})
      });
     })

  }
  handleChange(event) {
    this.setState({
        [event.target.id]: event.target.value
      });
    }
  render() {
    fetch("http://localhost:55773/api/GetEmployees").then(Response=>{            
      Response.json().then(body=>{ 
        this.setState({data:body})
      });
     })
     
    return (
     <div>
        <h1><b><center>React CRUD </center></b></h1>
      <Card className='cardt'>
          <Form>
          <h1><b>Enter New Record</b></h1>
<br/>
<br/>
            <Col >
              <FormGroup>
                <Label for="Name">Name</Label>
                <Input type="text" name="Name" id="name" placeholder="Name" onChange={this.handleChange}/>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for="Designation">Designation</Label>
                <Input type="text" name="Designation" id="Designation" placeholder="Designation" onChange={this.handleChange} />
              </FormGroup>
            </Col>
          <Col>
              <FormGroup>
                <Label for="location">Location</Label>
                <Input type="text" name="location" id="location" placeholder="Location" onChange={this.handleChange}/>
              </FormGroup> 
          </Col>  
          <Col>  
                <br/>
                <Button onClick={this.submit}>submit</Button>
                <br/>
                {this.state.postStatus==="Updated"?(<div>Successfully Updated</div>):""}
          </Col>
        </Form>
    </Card>
    
    <Card className='cardt'>
    <h1><b>Employee Records</b></h1>
      <Table striped  >
      
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Designation</th>
            <th>location</th>
          </tr>
        </thead>
        <tbody>
            {this.state.data.map((prop)=>{
              return(
                <tr>
                  <td>{prop.ID}</td>
                  <td>{prop.Name}</td>
                  <td>{prop.Designation}</td>
                  <td>{prop.Location}</td>
                  <td ><Button color="danger" onClick={()=>this.delete(prop.ID)}>Delete</Button></td>
                  <td ><Button color="warning" onClick={()=>this.toggle(prop.ID)}>Edit</Button></td>
                </tr>
              )
            })}
         
        </tbody>
      </Table>
    </Card>
    <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Edit Employee Details</ModalHeader>
          <ModalBody>
            <div>
              Employee ID:       {this.state.ID}
            </div>
          <Form>
          
          <Col >
            <FormGroup>
              <Label for="Name">Name</Label>
              <Input type="text" name="Name" id="name" placeholder="Name" onChange={this.handleChange}/>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="Designation">Designation</Label>
              <Input type="text" name="Designation" id="Designation" placeholder="Designation" onChange={this.handleChange} />
            </FormGroup>
          </Col>
          <Col>
           <FormGroup>
            <Label for="location">Location</Label>
            <Input type="text" name="location" id="location" placeholder="Location" onChange={this.handleChange}/>
           </FormGroup>     
           </Col>
        
      </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={()=>this.update()}>Update</Button>{' '}
         
          </ModalFooter>
        </Modal>
    </div>
    );
  }
}

export default App;
