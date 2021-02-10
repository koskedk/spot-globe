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
  facilities: Facility[];
  showForm: boolean;
  editMode: boolean;
  activeFacility: Facility;
  counties: County[];
  mechanisms: Mechanism[];
  loading: boolean;
  rows: number;
  totalRecords: number;
  page: number;
  first: number;
  sort: any;
  filter: any;
}

const url = `https://${window.location.hostname}:4710/api/v1/practices/facilities`;
const countiesUrl = `https://${window.location.hostname}:4710/api/v1/locations/`;
const mechanismsUrl = `https://${window.location.hostname}:4710/api/v1/practices/mechanisms/`;
const facUrlCount = `https://${window.location.hostname}:4710/api/v1/practices/facilities/count`;

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
      counties: [],
      mechanisms: [],
      loading: false,
      totalRecords: 0,
      rows: 50,
      page: 1,
      first: 0,
      sort: [],
      filter: []
    };
  }

  loadMeta = async () => {
    try {
      let res = await axios.get(countiesUrl);
      let data = res.data;
      this.setState(prevState => ({
        ...prevState,
        counties: data.map((a: County) => ({ label: a.name, value: a._id }))
      }));
    } catch (e) {
      this.messages.show({
        severity: "error",
        summary: "Error loading",
        detail: `${e}`
      });
    }

    try {
      let res = await axios.get(mechanismsUrl);
      let data = res.data;
      this.setState(prevState => ({
        ...prevState,
        mechanisms: data.map((a: Mechanism) => ({
          label: a.name,
          value: a._id
        }))
      }));
    } catch (e) {
      this.messages.show({
        severity: "error",
        summary: "Error loading",
        detail: `${e}`
      });
    }
  };

  loadCount = async () => {
    this.setState(prevState => ({
      ...prevState,
      loading: true
    }));
    try {
      let res = await axios.get(facUrlCount);
      let data = res.data;
      this.setState(prevState => ({
        ...prevState,
        totalRecords: data
      }));
    } catch (e) {
      this.messages.show({
        severity: "error",
        summary: "Error loading",
        detail: `${e}`
      });
    }
  };

  loadData = async () => {
    this.setState(prevState => ({
      ...prevState,
      loading: true
    }));
    console.log(`Size:${this.state.rows} Page:${this.state.page}`);
    try {
      let geturl = `${url}/${this.state.rows}/${this.state.page}`;
      if (this.state.sort) {
        geturl = `${geturl}?sort=${this.state.sort}`;

        if (this.state.filter) {
          geturl = `${geturl}&filter=${this.state.filter}`;
        }
      } else {
        if (this.state.filter) {
          geturl = `${geturl}?filter=${this.state.filter}`;
        }
      }

      let res = await axios.get(geturl);
      let data = res.data;
      this.setState(prevState => ({
        ...prevState,
        loading: false,
        facilities: data
      }));
    } catch (e) {
      this.setState(prevState => ({
        ...prevState,
        loading: false
      }));
      this.messages.show({
        severity: "error",
        summary: "Error loading",
        detail: `${e}`
      });
    }
  };

  handleAdd = () => {
    this.resetState();
    this.setState(prevState => ({
      ...prevState,
      showForm: true
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
      this.messages.show({
        severity: "success",
        summary: "Saved successfully",
        detail: `${savedFacility.name}`
      });
      this.resetState();
      this.loadCount();
      this.loadData();
    } catch (e) {
      this.messages.show({
        severity: "error",
        summary: "Error occurred",
        detail: `${e}`
      });
    }
  };

  handleDelete = async (form: any) => {
    this.messages.clear();
    try {
      await axios.delete(`${url}${form._id}`, form);
      this.messages.show({
        severity: "success",
        summary: "Deleted successfully",
        detail: `${form.name}`
      });
      this.resetState();
      this.loadCount();
      this.loadData();
    } catch (e) {
      this.messages.show({
        severity: "error",
        summary: "Error ocurred",
        detail: `${e}`
      });
    }
  };

  handleCancel = (form: any) => {
    this.resetState();
    this.handleHide();
  };

  handleHide = () => {
    this.setState(prevState => ({
      ...prevState,
      showForm: false
    }));
  };

  handlePage = async (event: any) => {
    console.log(event);
    this.setState(
      prevState => ({
        ...prevState,
        rows: event.rows,
        page: event.page + 1,
        first: event.first
      }),
      () => this.loadData()
    );
  };

  handleSort = async (event: any) => {
    console.log(event);
    this.setState(
      prevState => ({
        ...prevState,
        sort: JSON.stringify(event)
      }),
      () => this.loadData()
    );
  };

  handleFilter = async (event: any) => {
    console.log(event);
    this.setState(
      prevState => ({
        ...prevState,
        filter: JSON.stringify(event)
      }),
      () => this.loadData()
    );
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
    await this.loadCount();
    await this.loadData();
  }

  render() {
    return (
      <div>
        <Growl ref={el => (this.messages = el)}></Growl>

        <div>
          {this.state.facilities ? (
            <FacilityList
              facilities={this.state.facilities}
              onManage={this.handleManage}
              onAdd={this.handleAdd}
              onPage={this.handlePage}
              loading={this.state.loading}
              totalRecords={this.state.totalRecords}
              rows={this.state.rows}
              first={this.state.first}
              onSort={this.handleSort}
              onFilter={this.handleFilter}
            />
          ) : (
            <div></div>
          )}
        </div>

        <Dialog
          header="Facility"
          visible={this.state.showForm}
          style={{ width: "50vw" }}
          onHide={this.handleHide}
          maximizable
        >
          {this.state.showForm ? (
            <FacilityForm
              facility={this.state.activeFacility}
              counties={this.state.counties}
              mechanisms={this.state.mechanisms}
              onSave={this.handleSave}
              onDelete={this.handleDelete}
              onCancel={this.handleCancel}
            />
          ) : (
            <div></div>
          )}
        </Dialog>
      </div>
    );
  }
}
