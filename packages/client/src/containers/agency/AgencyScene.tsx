import React, { Component } from "react";
import { Agency } from "./models/agency";
import axios from "axios";
import { Messages } from "primereact/messages";
import { AgencyList } from "./AgencyList";
import { Dialog } from "primereact/dialog";
import { AgencyForm } from "./AgencyForm";

interface State {
  agencies: Agency[]
  showForm: boolean
  editMode: boolean
  activeAgency: Agency
}

const url = "./api/v1/practices/agencies/";

export class AgencyScene extends Component<{}, State> {
  private messages: any;

  constructor(props: Readonly<{}>) {
    super(props);
    this.state = {
      agencies: [],
      showForm: false,
      editMode: false,
      activeAgency: {
        _id: "00000000-0000-0000-0000-000000000000",
        name: "",
        display: ""
      }
    };
  }

  loadData = async () => {
    try {
      let res = await axios.get(url);
      let data = res.data;
      this.setState(prevState => ({
        ...prevState, agencies: data
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
      activeAgency: rowData,
      showForm: true,
      editMode: true
    }));
  };

  handleSave = async (form: any) => {
    this.messages.clear();
    try {
      let res = await axios.post(url, form);
      let savedAgency = res.data;
      this.messages.show({ severity: "success", summary: "Saved successfully", detail: `${savedAgency.name}` });
      this.resetState();
      this.loadData();
    } catch (e) {
      this.messages.show({ severity: "error", summary: "Error occurred", detail: `${e}` });
    }
  };

  handleDelete = async (form: any) => {
    this.messages.clear();
    try {
      let res = await axios.delete(`${url}${form._id}`, form);
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
      activeAgency: {
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
        <Messages ref={(el) => this.messages = el}></Messages>

        <div className="p-grid">

          <div className="p-col-8">Partners</div>

          <div className="p-col-4">
            {this.state.agencies ?
              <AgencyList agencies={this.state.agencies} onManage={this.handleManage} onAdd={this.handleAdd}/> :
              <div></div>
            }
          </div>

        </div>

        <Dialog header="Agency" visible={this.state.showForm} style={{ width: "50vw" }}
                onHide={this.handleHide}
                maximizable>
          {
            this.state.showForm ?
              <AgencyForm agency={this.state.activeAgency} onSave={this.handleSave} onDelete={this.handleDelete}
                          onCancel={this.handleCancel}/> :
              <div></div>
          }

        </Dialog>

      </div>);
  }
}
