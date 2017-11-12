import * as React from 'react';

export interface DioryFormProps { diory: any, onDioryChange: any, onSaveClick: any }

export class DioryForm extends React.Component<DioryFormProps, undefined> {

  constructor(props) {
    super(props)
  }

  render() {
    return <div>
      Name: <input name="name" value={this.props.diory.name || ""} onChange={(event) => { this.props.onDioryChange({name: event.target.value}) }}  />
      Type: <input value={this.props.diory.type || ""} onChange={(event) => { this.props.onDioryChange({type: event.target.value}) }}  /><br/>
      Background: <input value={this.props.diory.background || ""} onChange={(event) => { this.props.onDioryChange({background: event.target.value}) }}  />
      <a target="_blank" href={this.props.diory.url || ""}>Address:</a> <input value={this.props.diory.url || ""} onChange={(event) => { this.props.onDioryChange({url: event.target.value}) }}  /><br/>
      Gps: <input value={this.props.diory.geo.latitude || ""} onChange={(event) => { this.props.onDioryChange({geo: {latitude: event.target.value}}) }}  />
      <input value={this.props.diory.geo.longitude || ""} onChange={(event) => { this.props.onDioryChange({geo: {longitude: event.target.value}}) }}  /><br/>
      Date: <input value={this.props.diory.date || ""} onChange={(event) => { this.props.onDioryChange({date: event.target.value}) }}  /><br/>
      Connected diories: {this.props.diory.connectedDiories ? this.props.diory.connectedDiories.length : 0}<br/>
      <button name="saveButton" onClick={() => { this.props.onSaveClick() }}>Save</button><br />
      <img src={this.props.diory.background || ""} width="320"/>
    </div>
  }

}
