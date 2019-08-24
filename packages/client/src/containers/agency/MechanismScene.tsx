import React, { Component } from "react";
import { Mechanism } from "./models/mechanism";
import axios from "axios";
import { MechanismList } from "./MechanismList";
import { Dialog } from "primereact/dialog";
import { MechanismForm } from "./MechanismForm";
import { Growl } from "primereact/growl";

interface State {
  mechanisms: Mechanism[]
  showForm: boolean
  editMode: boolean
  activeMechanism: Mechanism
}

const url = "./api/v1/practices/mechanisms/";

export class MechanismScene extends Component<{}, State> {
  private messages: any;

  constructor(props: Readonly<{}>) {
    super(props);
    this.state = {
      mechanisms: [],
      showForm: false,
      editMode: false,
      activeMechanism: {
        _id: "00000000-0000-0000-0000-000000000000",
        code: "",
        name: "",
        implementationName: ""
      }
    };
  }

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
    console.log(form);
  };

  handleHide = () => {
    this.setState({ showForm: false });
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
              <MechanismForm mechanism={this.state.activeMechanism} onSave={this.handleSave}
                             onDelete={this.handleDelete}
                             onCancel={this.handleCancel}/> :
              <div></div>
          }

        </Dialog>

      </div>);
  }
}
