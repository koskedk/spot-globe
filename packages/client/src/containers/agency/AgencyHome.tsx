import React, { Component } from "react";
import { MechanismScene } from "./MechanismScene";
import { AgencyScene } from "./AgencyScene";

export class AgencyHome extends Component<any,any> {
  render() {
    return (
      <div>
        <div className="p-grid">
          <div className="p-col-8"><MechanismScene/></div>
          <div className="p-col-4"><AgencyScene/></div>
        </div>
      </div>);
  }
}
