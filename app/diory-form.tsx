import * as React from 'react';

// export interface DioryFormState { searchResults: any, searchTerm: string }
export interface DioryFormProps { diory: any }

export class DioryForm extends React.Component<DioryFormProps, undefined> {

  constructor(props) {
    super(props)
  }

  render() {
    let latitude = this.props.diory.geo ? this.props.diory.geo.latitude : ""
    let longitude = this.props.diory.geo ? this.props.diory.geo.longitude : ""
    return <div>
      <input defaultValue={this.props.diory.name} /><br/>
      <input defaultValue={latitude} /><br/>
      <input defaultValue={longitude} /><br/>
      <button onClick={() => { console.log("Button clicked")}}>Button</button>
    </div>
  }

}
