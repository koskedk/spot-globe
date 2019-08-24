import React, { Component } from "react";
import { Agency } from "./models/agency";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";

interface Props {
  agencies: Agency[]
  onManage: any
  onAdd: any
}
export class AgencyList extends Component<Props, {}> {

  constructor(props: Readonly<Props>) {
    super(props);
  }

  manageAction = (event: any, rowData: any) => {
    event.preventDefault();
    console.log(rowData);
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
    const header = <div className="p-clearfix" style={{ "lineHeight": "1.87em" }}>Agencies <Button
      onClick={this.addAction} icon="pi pi-plus" style={{ "float": "right" }}/></div>;


    return (
      <div>
        <DataTable value={this.props.agencies} header={header}>
          <Column field="display" header="Display"/>
          <Column header="Manage" body={this.manageTemplate} style={{ textAlign: "center", width: "8em" }}/>
        </DataTable>
      </div>);
  }
}
