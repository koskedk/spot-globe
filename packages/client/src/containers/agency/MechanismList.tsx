import React, { Component } from "react";
import { Mechanism } from "./models/mechanism";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";

interface Props {
  mechanisms: Mechanism[];
  onManage: any;
  onAdd: any;
}
export class MechanismList extends Component<Props, {}> {
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
        <Button
          disabled={true}
          hidden={true}
          icon="pi pi-external-link"
          onClick={event => this.manageAction(event, rowData)}
        ></Button>
      </div>
    );
  };

  render() {
    const header = (
      <div className="p-clearfix" style={{ lineHeight: "1.87em" }}>
        Mechanisms{" "}
        <Button
          disabled={true}
          hidden={true}
          onClick={this.addAction}
          icon="pi pi-plus"
          style={{ float: "right" }}
        />
      </div>
    );

    return (
      <div>
        <DataTable value={this.props.mechanisms} header={header}>
          <Column field="code" header="Code" />
          <Column field="name" header="Name" />
          <Column field="implementationName" header="Implementation Name" />
          <Column field="agency.display" header="Agency" />
          <Column
            body={this.manageTemplate}
            style={{ textAlign: "center", width: "5em" }}
          />
        </DataTable>
      </div>
    );
  }
}
