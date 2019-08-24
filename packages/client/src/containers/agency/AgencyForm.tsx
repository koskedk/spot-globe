import React, { Component } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Agency } from "./models/agency";

interface Props {
  onSave: any;
  onCancel: any;
  onDelete: any;
  agency: Agency;
}

interface State {
  agency: Agency
}

export class AgencyForm extends Component<Props, State> {

  constructor(props: Readonly<Props>) {
    super(props);
    this.state = {
      agency: props.agency
    };
  }

  saveAction = (event: any) => {
    event.preventDefault();
    this.props.onSave(this.state.agency);
  };

  cancelAction = (event: any) => {
    event.preventDefault();
    this.props.onCancel(this.state.agency);
  };

  deleteAction = (event: any) => {
    event.preventDefault();
    this.props.onDelete(this.state.agency);
  };

  handleInputChange = (event: any) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    console.log("changin...", name);
    this.setState(prevState => ({
      agency: {
        ...prevState.agency,
        [name]: value
      }
    }));

    console.log("finad...", this.state.agency);
  };

  render() {
    return (
      <div>
        <form>
          <InputText type="text" value={this.state.agency._id} name="_id" readOnly onChange={this.handleInputChange}/>
          <InputText type="text" value={this.state.agency.name} name="name" onChange={this.handleInputChange}/>
          <InputText type="text" value={this.state.agency.display} name="display" onChange={this.handleInputChange}/>
          <Button onClick={this.saveAction} label="Save" icon="pi pi-check" className="p-button-success"/>
          <Button onClick={this.cancelAction} label="Cancel" icon="pi pi-times"/>
          <Button onClick={this.deleteAction} label="Delete" icon="pi pi-trash" className="p-button-danger"
                  style={{ "float": "right" }}/>
        </form>
      </div>);
  }
}
