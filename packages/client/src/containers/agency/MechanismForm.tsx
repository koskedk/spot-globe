import React, { Component } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Mechanism } from "./models/mechanism";

interface Props {
  onSave: any;
  onCancel: any;
  onDelete: any;
  mechanism: Mechanism;
}

interface State {
  mechanism: Mechanism
}

export class MechanismForm extends Component<Props, State> {

  constructor(props: Readonly<Props>) {
    super(props);
    this.state = {
      mechanism: props.mechanism
    };
  }

  saveAction = (event: any) => {
    event.preventDefault();
    this.props.onSave(this.state.mechanism);
  };

  cancelAction = (event: any) => {
    event.preventDefault();
    this.props.onCancel(this.state.mechanism);
  };

  deleteAction = (event: any) => {
    event.preventDefault();
    this.props.onDelete(this.state.mechanism);
  };

  handleInputChange = (event: any) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState(prevState => ({
      mechanism: {
        ...prevState.mechanism,
        [name]: value
      }
    }));
  };

  render() {
    return (
      <div>
        <form>
          <InputText type="text" value={this.state.mechanism._id} name="_id" readOnly onChange={this.handleInputChange}/>
          <InputText type="text" value={this.state.mechanism.code} name="code" onChange={this.handleInputChange}/>
          <InputText type="text" value={this.state.mechanism.name} name="name" onChange={this.handleInputChange}/>
          <InputText type="text" value={this.state.mechanism.implementationName} name="implementationName" onChange={this.handleInputChange}/>
          <Button onClick={this.saveAction} label="Save" icon="pi pi-check" className="p-button-success"/>
          <Button onClick={this.cancelAction} label="Cancel" icon="pi pi-times"/>
          <Button onClick={this.deleteAction} label="Delete" icon="pi pi-trash" className="p-button-danger"
                  style={{ "float": "right" }}/>
        </form>
      </div>);
  }
}
