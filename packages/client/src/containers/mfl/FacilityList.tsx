import React, { Component } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Facility } from "./models/facility";

interface Props {
  facilities: Facility[];
  onManage: any;
  onAdd: any;
  onPage: any;
  onSort: any;
  onFilter: any;
  loading: boolean;
  totalRecords: number;
  rows: number;
  first: number;
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
        <Button
          disabled={false}
          hidden={false}
          icon="pi pi-external-link"
          onClick={(event) => this.manageAction(event, rowData)}
        ></Button>
      </div>
    );
  };

  render() {
    const header = (
      <div className="p-clearfix" style={{ lineHeight: "1.87em" }}>
        Facilities{" "}
        <Button
          disabled={false}
          hidden={false}
          onClick={this.addAction}
          icon="pi pi-plus"
          style={{ float: "right" }}
        />
      </div>
    );

    return (
      <div>
        <DataTable
          value={this.props.facilities}
          header={header}
          loading={this.props.loading}
          paginator={true}
          rows={this.props.rows}
          rowsPerPageOptions={[50, 100, 200, 500]}
          totalRecords={this.props.totalRecords}
        >
          <Column field="code" header="Code" sortable={true} filter={true} />
          <Column
            field="name"
            header="Name"
            sortable={true}
            filter={true}
            filterMatchMode={"contains"}
          />
          <Column
            field="county.name"
            header="County"
            sortable={true}
            filter={true}
            filterMatchMode={"contains"}
          />
          <Column
            field="agency.name"
            header="Agency"
            sortable={true}
            filter={true}
          />
          <Column
            body={this.manageTemplate}
            style={{ textAlign: "center", width: "5em" }}
          />
        </DataTable>
      </div>
    );
  }
}
