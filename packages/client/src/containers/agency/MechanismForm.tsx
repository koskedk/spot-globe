import React, { Component } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Mechanism } from "./models/mechanism";
import { Dropdown } from "primereact/dropdown";
import { Agency } from "./models/agency";

interface Props {
  onSave: any;
  onCancel: any;
  onDelete: any;
  mechanism: Mechanism;
  agencies: Agency[];
}

interface State {
  mechanism: Mechanism
  agencies: Agency[];
}

export class MechanismForm extends Component<Props, State> {

  constructor(props: Readonly<Props>) {
    super(props);
    this.state = {
      mechanism: props.mechanism,
      agencies: props.agencies
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
    let value = target.type === "checkbox" ? target.checked : target.value;
    let name = target.name;

    if (target.id && target.id === "agency") {
      name = target.id
    }
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
          <InputText type="text" value={this.state.mechanism._id} name="_id" readOnly
                     onChange={this.handleInputChange}/>
          <InputText type="text" value={this.state.mechanism.code} name="code" onChange={this.handleInputChange}/>
          <InputText type="text" value={this.state.mechanism.name} name="name" onChange={this.handleInputChange}/>
          <InputText type="text" value={this.state.mechanism.implementationName} name="implementationName"
                     onChange={this.handleInputChange}/>
          <Dropdown value={this.state.mechanism.agency}
                    options={this.state.agencies} onChange={this.handleInputChange}
                    placeholder="Select a Agency"  id="agency"/>

          <Button onClick={this.saveAction} label="Save" icon="pi pi-check" className="p-button-success"/>
          <Button onClick={this.cancelAction} label="Cancel" icon="pi pi-times"/>
          <Button onClick={this.deleteAction} label="Delete" icon="pi pi-trash" className="p-button-danger"
                  style={{ "float": "right" }}/>
        </form>
      </div>);
  }
}
