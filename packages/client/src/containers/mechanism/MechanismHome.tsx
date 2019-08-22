import React, {Component} from "react";
import axios from "axios";
import {Agency} from "../../models/agency";
import {Button} from "primereact/button";
import {Dialog} from "primereact/dialog";
import {Messages} from "primereact/messages";
import { MechanismList } from "./MechanismList";
import {MechanismForm} from "./MechanismForm";

interface Props {

}

interface State {
    agencies: []
    showForm: boolean;
    actionLabel: string;
    actionIcon: string;
    activeAgency: Agency;
}

export class MechanismHome extends Component<Props, State> {
    private messages: any;

    constructor(props: Readonly<Props>) {
        super(props);
        this.state = {
            agencies: [],
            showForm: false,
            actionLabel: 'Add',
            actionIcon: 'pi pi-plus',
            activeAgency: {
                id: '00000000-0000-0000-0000-000000000000',
                name: '',
                display: ''
            }
        };
    }

    loadData = async () => {
        let res = await axios.get("http://localhost:3001/agencies");
        let data = res.data;
        this.setState({agencies: data});
        this.messages.clear();
    }

    componentDidMount() {
        this.loadData()
    }

    showForm = (event: any) => {
        event.preventDefault();
        this.setState({
            showForm: !this.state.showForm,
            actionLabel: this.state.actionLabel === 'Add' ? 'Cancel' : 'Add',
            actionIcon: this.state.actionLabel === 'Add' ? 'pi pi-times' : 'pi pi-plus',
            activeAgency: {
                id: '00000000-0000-0000-0000-000000000000',
                name: '',
                display: ''
            }
        })
    }

    saveAgency = async (data: any) => {
        if (!data) {
            data = this.state.activeAgency;
        }
        console.log('post>', data);
        this.setState({
            showForm: false,
            actionLabel: 'saving...'
        })

        let res = await axios.post("http://localhost:3001/agencies", data);
        let savedAgency = res.data;
        console.log(`saved ${savedAgency}`);

        this.messages.show({severity: 'success', summary: 'Saved successfully', detail: `${savedAgency.name} saved`});

        this.loadData();

        this.setState({
            showForm: false,
            actionLabel: 'Add'
        })
    }

    editAgency = async (data: any) => {
        console.log('editing... >', data);
        this.setState({
            showForm: true,
            actionLabel: 'Cancel',
            actionIcon: 'pi pi-times',
            activeAgency: data
        })
    }

    deleteAgency = async (data: any) => {
        console.log('deleting... >', data);
        let res = await axios.delete(`http://localhost:3001/agencies/${data.id}`);
        this.loadData();
    }

    onHide = () => {
        this.setState({showForm: false});
    }

    render() {
        return (
            <div>
                Agency Home <Button label={this.state.actionLabel} icon={this.state.actionIcon}
                                    onClick={this.showForm}/>
                <Messages ref={(el) => this.messages = el}></Messages>
                <hr/>


                {this.state.agencies ?
                    <MechanismList agencies={this.state.agencies} onDelete={this.deleteAgency} onEdit={this.editAgency}/> :
                    <div></div>}

                <Dialog header="Agency" visible={this.state.showForm} style={{width: '50vw'}} onHide={this.onHide}
                        maximizable>
                    <MechanismForm onFormSubmitted={this.saveAgency} agency={this.state.activeAgency}/>
                </Dialog>
            </div>);
    }
}
