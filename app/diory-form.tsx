import * as React from 'react';

export interface DioryFormProps {
  diory: any,
  onDioryChange: any,
  onSaveClick: any
}

export class DioryForm extends React.Component<DioryFormProps, undefined> {

  constructor(props) {
    super(props)
  }

  render() {
    let backgroundUrl
    if (this.props.diory.background) {
      backgroundUrl = this.props.diory.background + '?token=my-receipts'
    }

    return <div>
      Id: {this.props.diory.id} <br/>
      Name: <input name="name" value={this.props.diory.name || ""} onChange={(event) => { this.props.onDioryChange({name: event.target.value}) }}  />
      Type: <input name="type" value={this.props.diory.type || ""} onChange={(event) => { this.props.onDioryChange({type: event.target.value}) }}  /><br/>
      Background: <input name="background" value={this.props.diory.background || ""} onChange={(event) => { this.props.onDioryChange({background: event.target.value}) }}  />
      <a target="_blank" href={this.props.diory.url || ""}>Address:</a> <input name="address" value={this.props.diory.url || ""} onChange={(event) => { this.props.onDioryChange({url: event.target.value}) }}  /><br/>
      Gps: <input name="latitude" value={this.props.diory.geo.latitude || ""} onChange={(event) => { this.props.onDioryChange({geo: {latitude: event.target.value}}) }}  />
      <input name="longitude" value={this.props.diory.geo.longitude || ""} onChange={(event) => { this.props.onDioryChange({geo: {longitude: event.target.value}}) }}  /><br/>
      Date: <input name="date" value={this.props.diory.date || ""} onChange={(event) => { this.props.onDioryChange({date: event.target.value}) }}  /><br/>

      <button name="saveButton" onClick={() => { this.props.onSaveClick() }}>Save</button><br />
      <img src={backgroundUrl || ""} width="320"/>
    </div>
  }

}
