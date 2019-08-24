import React, { Component } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Facility } from "./models/facility";

interface Props {
  onSave: any;
  onCancel: any;
  onDelete: any;
  facility: Facility;
}

interface State {
  facility: Facility
}

export class FacilityForm extends Component<Props, State> {

  constructor(props: Readonly<Props>) {
    super(props);
    this.state = {
      facility: props.facility
    };
  }

  saveAction = (event: any) => {
    event.preventDefault();
    this.props.onSave(this.state.facility);
  };

  cancelAction = (event: any) => {
    event.preventDefault();
    this.props.onCancel(this.state.facility);
  };

  deleteAction = (event: any) => {
    event.preventDefault();
    this.props.onDelete(this.state.facility);
  };

  handleInputChange = (event: any) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState(prevState => ({
      facility: {
        ...prevState.facility,
        [name]: value
      }
    }));
  };

  render() {
    return (
      <div>
        <form>
          <InputText type="text" value={this.state.facility._id} name="_id" readOnly onChange={this.handleInputChange}/>
          <InputText type="text" value={this.state.facility.code} name="code" onChange={this.handleInputChange}/>
          <InputText type="text" value={this.state.facility.name} name="name" onChange={this.handleInputChange}/>
          {/*/!*<InputText type="text" value={this.state.facility.county} name="county" onChange={this.handleInputChange}/>*/}
          {/*<InputText type="text" value={this.state.facility.mechanism} name="mechanism" onChange={this.handleInputChange}/>*!/*/}
          <Button onClick={this.saveAction} label="Save" icon="pi pi-check" className="p-button-success"/>
          <Button onClick={this.cancelAction} label="Cancel" icon="pi pi-times"/>
          <Button onClick={this.deleteAction} label="Delete" icon="pi pi-trash" className="p-button-danger"
                  style={{ "float": "right" }}/>
        </form>
      </div>);
  }
}
