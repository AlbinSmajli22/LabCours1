import { tsConstructorType } from '@babel/types';
import React,{Component} from 'react';
import {variables} from './Variables.js';

export class Employe extends React.Component{

    

      constructor(props){
        super(props);
        this.state={
            employes:[], 
            modalTitle:"",
            Password:"",
            Emaili:"",
            Adresa:"",
            NrTel:"",
            Mbiemri:"",
            Emri:"",
            Id:0

        };
    }

    refreshList(){
        //fetch(variables.API_URL+'employe')
        fetch("https://localhost:44384/api/employe",{
            method:"GET"
        })
        .then(responsive=>responsive.json())
        .then(data=>{
            this.setState({employes:data});
           
        })
    }
  
    componentDidMount(){
       this.refreshList();
    }

    changeEmri = (e)=>{
        this.setState({Emri:e.target.value});
    }
    changeMbiemri = (e)=>{
        this.setState({Mbiemri:e.target.value});
    }
    changeNrTel = (e)=>{
        this.setState({NrTel:e.target.value});
    }
    changeAdresa = (e)=>{
        this.setState({Adresa:e.target.value});
    }
    changeEmail = (e)=>{
        this.setState({Emaili:e.target.value});
    }
    changePassword = (e)=>{
        this.setState({Password:e.target.value});
    }

    addClick(){
        this.setState({
            modalTitle:"Add Employe",
            Id:0,
            Emri:"",
            Mbiemri:"",
            NrTel:"",
            Adresa:"",
            Emaili:"",
            Password:""

        })
    }
    editClick(emp){
        this.setState({
            modalTitle:"Edit Employe",
            Id:emp.id,
            Emri:emp.emri,
            Mbiemri:emp.mbiemri,
            NrTel:emp.nrTel,
            Adresa:emp.adresa,
            Emaili:emp.emaili,
            Password:emp.passwordi
            

        })
    }

    createClick(){
        fetch(variables.API_URL+'employe',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                Emri:this.state.Emri,
                Mbiemri:this.state.Mbiemri,
                NrTel:this.state.NrTel,
                Adresa:this.state.Adresa,
                Emaili:this.state.Emaili,
                Password:this.state.Password,
                
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result)
            this.refreshList();
        },(error)=>{
            alert("Failed");
        })
    }

    updateClick(){
        fetch(variables.API_URL+'employe',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                Id:this.state.Id,
                Emri:this.state.Emri,
                Mbiemri:this.state.Mbiemri,
                NrTel:this.state.NrTel,
                Adresa:this.state.Adresa,
                Emaili:this.state.Emaili,
                Password:this.state.Password
                
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert('u perditsua me sukses')
            this.refreshList();
        },(error)=>{
            alert("Failed");
        })
    }
    deleteClick(id){
        if(window.confirm('A jeni i sigurt?')){
        fetch(variables.API_URL+'employe/'+id,{
            method:'DELETE',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result)
            this.refreshList();
        },(error)=>{
            alert("Failed");
        })
    }
    }

    render(){
        const {
            employes,
            modalTitle,
            Id,
            Emri,
            Mbiemri,
            NrTel,
            Adresa,
            Emaili,
            Password

        }=this.state;
        console.log(employes)
        return(
<div>

    <button type='button' className='btn btn-primary m-2 float-end'
    data-bs-toggle="modal"
    data-bs-target="#exampleModal"
    onClick={()=>this.addClick()}>
        Add Employe
    </button>

    <table className="table table-striped">
    <thead>
    <tr>
        <th>Id</th>
        <th>Emri</th>
        <th>Mbiemri</th>
        <th>Nr.Tel</th>
        <th>Adresa</th>
        <th>E-mail</th>
        <th>Password</th>
        <th>Options</th>
    </tr>
    </thead>
    <tbody>
        {employes.map(emp =>
            <tr key={emp.id}>
                <td>{emp.id}</td>   
                <td>{emp.emri}</td>
                <td>{emp.mbiemri}</td>
                <td>{emp.nrTel}</td>
                <td>{emp.adresa}</td>
                <td>{emp.emaili}</td>
                <td>{emp.passwordi}</td>
                <td>
                    <button type='button' 
                    className='btn btn-light mr-1'
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={()=>this.editClick(emp)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                    </svg>
                    </button>

                    <button type='button' 
                    className='btn btn-light mr-1'
                    onClick={()=>this.deleteClick(emp.id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                    <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                    </svg>
                    </button>
                </td>
            </tr>
            )}
    </tbody>        
    </table>
    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true" >
        <div className='modal-dialog modal-lg modal-dialog-centered'>
        <div className="modal-content">
            <div className='modal-header'>
                <h5 className='modal-title'>{modalTitle}</h5>
                <button type='button' className='btn-close' data-bs-dismiss="modal" aria-label="Close">   
                </button>
            </div>

            <div className='modal-body'>
                <div className='input-group mb-3'>
                    <span className='input-group-text'>Emri</span>
                    <input type="text" className='form-control'
                    value={Emri}
                    onChange={this.changeEmri}/>

                    <span className='input-group-text'>Mbiemri</span>
                    <input type="text" className='form-control'
                    value={Mbiemri}
                    onChange={this.changeMbiemri}/>

                     <span className='input-group-text'>Nr.Tel</span>
                    <input type="text" className='form-control'
                    value={NrTel}
                    onChange={this.changeNrTel}/>
                    </div>
                    <div className='input-group mb-3'>
                    <span className='input-group-text'>Adresa</span>
                    <input type="text" className='form-control'
                    value={Adresa}
                    onChange={this.changeAdresa}/>
                   
                    <span className='input-group-text'>E-mail</span>
                    <input type="email" className='form-control'
                    value={Emaili}
                    onChange={this.changeEmail}/>

                    <span className='input-group-text'>Passwordi</span>
                    <input type="password" className='form-control'
                    value={Password}
                    onChange={this.changePassword}/>
                </div>

                {Id===0?
                <button type='button'
                className='btn btn-primary float-start'
                onClick={()=>this.createClick()}>
                    Create
                </button>
                :null}

                {Id!==0?
                <button type='button'
                className='btn btn-primary float-start'
                onClick={()=>this.updateClick()}>
                    Update
                </button>
                :null}

            </div>

        </div>   
        </div>
        </div>


</div>
        )
    }
}
