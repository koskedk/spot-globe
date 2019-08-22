import React, {Component} from "react";
import axios from 'axios';
import {Agency} from "../../models/agency";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Button} from "primereact/button";
import {Dialog} from "primereact/dialog";

interface Props {
    agencies: Agency[]
    onEdit: any,
    onDelete: any
}

interface State {
}

export class FacilityList extends Component<Props, State> {

    edit = (event: any, data: any) => {
        event.preventDefault();
        this.props.onEdit(data);
    }

    delete = (event: any, data: any) => {
        event.preventDefault();
        this.props.onDelete(data);
    }

    actionTemplate = (rowData: any, column: any) => {
        return (
            <div>
                <Button type="button" icon="pi pi-pencil" style={{marginRight: '.5em'}}
                        onClick={(event) => this.edit(event, rowData)}></Button>
                <Button type="button" icon="pi pi-times" className="p-button-danger"
                        onClick={(event) => this.delete(event, rowData)}></Button>
            </div>);
    }

    render() {
        return (
            <div>
                <DataTable value={this.props.agencies}>
                    <Column field="name" header="Name"/>
                    <Column field="display" header="Display"/>
                    <Column field="id" header="Id"/>
                    <Column body={this.actionTemplate} style={{textAlign: 'center', width: '8em'}}/>
                </DataTable>
            </div>
        );
    }
}
