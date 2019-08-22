import React, {Component} from 'react';
import * as uuid from "uuid";
import {Agency} from "../../models/agency";
import {Button} from "primereact/button";
import {InputText} from "primereact/inputtext";

interface Props {
    onFormSubmitted: any;
    agency: any
}

interface State {
    id: string,
    name: string,
    display: string
}

export class MechanismForm extends Component<Props, State> {


    componentDidMount(): void {
        const {id, name, display} = this.props.agency
        this.setState({
            id, name, display
        })
    }

    handleSubmit = (event: any) => {
        event.preventDefault();
        this.props.onFormSubmitted(this.state);
    }

    render() {
        return (
            <div>
                {this.state ?
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            Id:<InputText type="text" value={this.state.id} name="id" readOnly
                                          onChange={(event:any) => this.setState({id: event.target.value})}

                        />
                        </label>
                        <label>
                            Name:<InputText type="text" value={this.state.name} name="name"
                                            onChange={(event:any) => this.setState({name: event.target.value})}/>
                        </label>
                        <label>
                            Display:<InputText type="text" value={this.state.display} name="display"
                                               onChange={(event:any) => this.setState({display: event.target.value})}/>
                        </label>

                        <Button type="submit" label="Save" icon="pi pi-check" className="p-button-success"/>
                    </form> :
                    <div></div>
                }
            </div>);
    }

}
