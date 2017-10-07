import * as React from 'react';

export interface DioryFormProps { diory: any, onDioryChange: any, onSaveClick: any }

export class DioryForm extends React.Component<DioryFormProps, undefined> {

  constructor(props) {
    super(props)
  }

  render() {
    return <div>
      <input value={this.props.diory.name || ""} onChange={(event) => { this.props.onDioryChange({name: event.target.value}) }}  /><br/>
      <input value={this.props.diory.type || ""} onChange={(event) => { this.props.onDioryChange({type: event.target.value}) }}  /><br/>
      <input value={this.props.diory.geo.latitude || ""} onChange={(event) => { this.props.onDioryChange({geo: {latitude: event.target.value}}) }}  /><br/>
      <input value={this.props.diory.geo.longitude || ""} onChange={(event) => { this.props.onDioryChange({geo: {longitude: event.target.value}}) }}  /><br/>
      Connected diories: {this.props.diory.connectedDiories ? this.props.diory.connectedDiories.length : 0}<br/>
      <button onClick={() => { this.props.onSaveClick() }}>Save</button>
    </div>
  }

}
