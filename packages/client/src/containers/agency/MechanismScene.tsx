import React, { Component } from "react";
import { Mechanism } from "./models/mechanism";
import axios from "axios";
import { MechanismList } from "./MechanismList";
import { Dialog } from "primereact/dialog";
import { MechanismForm } from "./MechanismForm";
import { Growl } from "primereact/growl";
import { Agency } from "./models/agency";

interface State {
  mechanisms: Mechanism[]
  showForm: boolean
  editMode: boolean
  activeMechanism: Mechanism
  agencies: Agency[]
}

const url = "http://localhost:4710/api/v1/practices/mechanisms/";
const agenciesUrl = "http://localhost:4710/api/v1/practices/agencies/";

export class MechanismScene extends Component<{}, State> {
  private messages: any;

  constructor(props: Readonly<{}>) {
    super(props);
    this.state = {
      mechanisms: [],
      showForm: false,
      editMode: false,
      agencies: [],
      activeMechanism: {
        _id: "00000000-0000-0000-0000-000000000000",
        code: "",
        name: "",
        implementationName: ""
      }
    };
  }

  loadMeta = async () => {
    try {
      let res = await axios.get(agenciesUrl);
      let data = res.data;
      this.setState(prevState => ({
        ...prevState, agencies: data.map((a: Agency) => ({ label: a.name, value: a._id }))
      }));
    } catch (e) {
      this.messages.show({ severity: "error", summary: "Error loading", detail: `${e}` });
    }
  };

  loadData = async () => {
    try {
      let res = await axios.get(url);
      let data = res.data;
      this.setState(prevState => ({
        ...prevState, mechanisms: data
      }));
    } catch (e) {
      this.messages.show({ severity: "error", summary: "Error loading", detail: `${e}` });
    }
  };

  handleAdd = () => {
    this.resetState();
    this.setState(prevState => ({
      ...prevState, showForm: true
    }));
  };

  handleManage = (rowData: any) => {
    this.setState(prevState => ({
      ...prevState,
      activeMechanism: rowData,
      showForm: true,
      editMode: true
    }));
  };

  handleSave = async (form: any) => {
    this.messages.clear();
    try {
      let res = await axios.post(url, form);
      let savedMechanism = res.data;
      this.messages.show({ severity: "success", summary: "Saved successfully", detail: `${savedMechanism.name}` });
      this.resetState();
      this.loadData();
    } catch (e) {
      this.messages.show({ severity: "error", summary: "Error occurred", detail: `${e}` });
    }
  };

  handleDelete = async (form: any) => {
    this.messages.clear();
    try {
      await axios.delete(`${url}${form._id}`, form);
      this.messages.show({ severity: "success", summary: "Deleted successfully", detail: `${form.name}` });
      this.resetState();
      this.loadData();
    } catch (e) {
      this.messages.show({ severity: "error", summary: "Error ocurred", detail: `${e}` });
    }
  };

  handleCancel = (form: any) => {
    this.resetState()
    this.handleHide();
  };

  handleHide = () => {
    this.setState(prevState => ({
      ...prevState, showForm: false
    }));
  };

  resetState = () => {
    this.setState({
      showForm: false,
      editMode: false,
      activeMechanism: {
        _id: "00000000-0000-0000-0000-000000000000",
        name: "",
        display: ""
      }
    });
  };

  async componentDidMount() {
    await this.loadMeta();
    await this.loadData();
  }

  render() {
    return (
      <div>
        <Growl ref={(el) => this.messages = el}></Growl>

        <div>
          {this.state.mechanisms ?
            <MechanismList mechanisms={this.state.mechanisms} onManage={this.handleManage} onAdd={this.handleAdd}/> :
            <div></div>
          }
        </div>

        <Dialog header="Mechanism" visible={this.state.showForm} style={{ width: "50vw" }}
                onHide={this.handleHide}
                maximizable>
          {
            this.state.showForm ?
              <MechanismForm mechanism={this.state.activeMechanism}
                             agencies={this.state.agencies}
                             onSave={this.handleSave}
                             onDelete={this.handleDelete}
                             onCancel={this.handleCancel}/> :
              <div></div>
          }

        </Dialog>

      </div>);
  }
}
