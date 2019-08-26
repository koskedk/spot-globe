import React, { Component } from "react";
import axios from "axios";
import { Dialog } from "primereact/dialog";
import { Growl } from "primereact/growl";
import { Facility } from "./models/facility";
import { FacilityList } from "./FacilityList";
import { FacilityForm } from "./FacilityForm";
import { Agency } from "../agency";
import { County } from "./models/county";
import { Mechanism } from "../agency/models/mechanism";

interface State {
  facilities: Facility[]
  showForm: boolean
  editMode: boolean
  activeFacility: Facility
  counties:County[]
  mechanisms:Mechanism[]
}

const url = "http://localhost:4710/api/v1/practices/facilities/";
const countiesUrl = "http://localhost:4710/api/v1/locations/";
const mechanismsUrl = "http://localhost:4710/api/v1/practices/mechanisms/";

export class FacilityScene extends Component<{}, State> {
  private messages: any;

  constructor(props: Readonly<{}>) {
    super(props);
    this.state = {
      facilities: [],
      showForm: false,
      editMode: false,
      activeFacility: {
        _id: "00000000-0000-0000-0000-000000000000",
        code: "",
        name: ""
      },
      counties:[],
      mechanisms:[]
    };
  }

  loadMeta = async () => {

    try {
      let res = await axios.get(countiesUrl);
      let data = res.data;
      this.setState(prevState => ({
        ...prevState, counties: data.map((a: County) => ({ label: a.name, value: a._id }))
      }));
    } catch (e) {
      this.messages.show({ severity: "error", summary: "Error loading", detail: `${e}` });
    }

    try {
      let res = await axios.get(mechanismsUrl);
      let data = res.data;
      this.setState(prevState => ({
        ...prevState, mechanisms: data.map((a: Mechanism) => ({ label: a.name, value: a._id }))
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
        ...prevState, facilities: data
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
      activeFacility: rowData,
      showForm: true,
      editMode: true
    }));
  };

  handleSave = async (form: any) => {
    this.messages.clear();
    try {
      let res = await axios.post(url, form);
      let savedFacility = res.data;
      this.messages.show({ severity: "success", summary: "Saved successfully", detail: `${savedFacility.name}` });
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
      activeFacility: {
        _id: "00000000-0000-0000-0000-000000000000",
        code: "",
        name: ""
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
          {this.state.facilities ?
            <FacilityList facilities={this.state.facilities} onManage={this.handleManage} onAdd={this.handleAdd}/> :
            <div></div>
          }
        </div>

        <Dialog header="Facility" visible={this.state.showForm} style={{ width: "50vw" }}
                onHide={this.handleHide}
                maximizable>
          {
            this.state.showForm ?
              <FacilityForm facility={this.state.activeFacility} counties={this.state.counties} mechanisms={this.state.mechanisms}
                            onSave={this.handleSave}
                       onDelete={this.handleDelete}
                       onCancel={this.handleCancel}/> :
              <div></div>
          }

        </Dialog>

      </div>);
  }
}
