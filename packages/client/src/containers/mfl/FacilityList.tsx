import React, { Component } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Facility } from "./models/facility";

interface Props {
  facilities: Facility[]
  onManage: any
  onAdd: any
}
export class FacilityList extends Component<Props, {}> {

  constructor(props: Readonly<Props>) {
    super(props);
  }

  manageAction = (event: any, rowData: any) => {
    event.preventDefault();
    this.props.onManage(rowData);
  };

  addAction = (event: any) => {
    event.preventDefault();
    this.props.onAdd();
  };

  manageTemplate = (rowData: any, column: any) => {
    return (
      <div>
        <Button icon="pi pi-external-link" onClick={(event) => this.manageAction(event, rowData)}></Button>
      </div>);
  };

  render() {
    const header = <div className="p-clearfix" style={{ "lineHeight": "1.87em" }}>Facilitiys <Button
      onClick={this.addAction} icon="pi pi-plus" style={{ "float": "right" }}/></div>;


    return (
      <div>
        <DataTable value={this.props.facilities} header={header}>
          <Column field="code" header="Code"/>
          <Column field="name" header="Name"/>
          <Column field="county.name" header="Implementation"/>
          <Column field="agency.name" header="Agency"/>
          <Column body={this.manageTemplate} style={{ textAlign: "center", width: "5em" }}/>
        </DataTable>
      </div>);
  }
}
