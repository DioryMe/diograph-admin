import * as React from 'react';

export interface DioryFormProps {
  diory: any,
  onDioryChange: any,
  onSaveClick: any,
  onDeleteConnectionClick: any
}

export class DioryForm extends React.Component<DioryFormProps, undefined> {

  constructor(props) {
    super(props)
  }

  render() {
    return <div>
      Name: <input name="name" value={this.props.diory.name || ""} onChange={(event) => { this.props.onDioryChange({name: event.target.value}) }}  />
      Type: <input name="type" value={this.props.diory.type || ""} onChange={(event) => { this.props.onDioryChange({type: event.target.value}) }}  /><br/>
      Background: <input name="background" value={this.props.diory.background || ""} onChange={(event) => { this.props.onDioryChange({background: event.target.value}) }}  />
      <a target="_blank" href={this.props.diory.url || ""}>Address:</a> <input name="address" value={this.props.diory.url || ""} onChange={(event) => { this.props.onDioryChange({url: event.target.value}) }}  /><br/>
      Gps: <input name="latitude" value={this.props.diory.geo.latitude || ""} onChange={(event) => { this.props.onDioryChange({geo: {latitude: event.target.value}}) }}  />
      <input name="longitude" value={this.props.diory.geo.longitude || ""} onChange={(event) => { this.props.onDioryChange({geo: {longitude: event.target.value}}) }}  /><br/>
      Date: <input name="date" value={this.props.diory.date || ""} onChange={(event) => { this.props.onDioryChange({date: event.target.value}) }}  /><br/>

      <div className="connected-diories-count">Connected diories: {this.props.diory.connectedDiories ? this.props.diory.connectedDiories.length : 0}</div><br/>
      {this.props.diory.connections.map((connection, index) => {
        return <div className="connection" key={index}>
          - ID: {connection.id}, fromDioryId: {connection.fromDioryId}, toDioryId: {connection.toDioryId}
          <a onClick={() => { if(confirm("Delete the connection (id: " + connection.id + ")?")) { this.props.onDeleteConnectionClick(connection.fromDioryId, connection.toDioryId) } }}> [ X ] </a>
        </div>;
      })}

      <button name="saveButton" onClick={() => { this.props.onSaveClick() }}>Save</button><br />
      <img src={this.props.diory.background || ""} width="320"/>
    </div>
  }

}
