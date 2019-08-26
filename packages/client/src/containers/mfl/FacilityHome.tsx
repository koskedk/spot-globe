import React, { Component } from "react";
import { FacilityScene } from "./FacilityScene";

export class FacilityHome extends Component<any,any> {
  render() {
    return (
      <div>
        <div className="p-grid">
          <div className="p-col"><FacilityScene/></div>
        </div>
      </div>);
  }
}
