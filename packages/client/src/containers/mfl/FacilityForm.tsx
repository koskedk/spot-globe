import React, { Component } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Facility } from "./models/facility";
import { County } from "./models/county";
import { Mechanism } from "../agency/models/mechanism";
import { Dropdown } from "primereact/dropdown";
import { Agency } from "../agency";

interface Props {
  onSave: any;
  onCancel: any;
  onDelete: any;
  facility: Facility;
  counties: County[];
  mechanisms: Mechanism[];
}

interface State {
  facility: Facility;
  counties: County[];
  mechanisms: Mechanism[];
}

export class FacilityForm extends Component<Props, State> {
  constructor(props: Readonly<Props>) {
    super(props);
    this.state = {
      facility: props.facility,
      counties: props.counties,
      mechanisms: props.mechanisms,
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
    let value = target.type === "checkbox" ? target.checked : target.value;
    let name = target.name;

    if (target.id && (target.id === "county" || target.id === "mechanism")) {
      name = target.id;
    }
    this.setState((prevState) => ({
      facility: {
        ...prevState.facility,
        [name]: value,
      },
    }));
  };

  render() {
    return (
      <div>
        <form>
          <InputText
            type="text"
            value={this.state.facility._id}
            name="_id"
            readOnly
            onChange={this.handleInputChange}
          />
          <InputText
            type="text"
            value={this.state.facility.code}
            name="code"
            onChange={this.handleInputChange}
          />
          <InputText
            type="text"
            value={this.state.facility.name}
            name="name"
            onChange={this.handleInputChange}
          />
          <Dropdown
            value={this.state.facility.county}
            options={this.state.counties}
            onChange={this.handleInputChange}
            placeholder="Select a County"
            id="county"
          />
          <Dropdown
            value={this.state.facility.mechanism}
            options={this.state.mechanisms}
            onChange={this.handleInputChange}
            placeholder="Select a Mechanism"
            id="mechanism"
          />
          <Button
            onClick={this.saveAction}
            label="Save"
            icon="pi pi-check"
            className="p-button-success"
          />
          <Button
            onClick={this.cancelAction}
            label="Cancel"
            icon="pi pi-times"
          />
          <Button
            onClick={this.deleteAction}
            label="Delete"
            icon="pi pi-trash"
            className="p-button-danger"
            style={{ float: "right" }}
          />
        </form>
      </div>
    );
  }
}
