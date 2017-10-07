import * as React from 'react';

// export interface DioryFormState { searchResults: any, searchTerm: string }
export interface DioryFormProps { diory: any }

export class DioryForm extends React.Component<DioryFormProps, undefined> {

  constructor(props) {
    super(props)
  }

  render() {
    return <div>
      <input defaultValue={this.props.diory.name} /><br/>
      <input defaultValue={this.props.diory.geo.latitude} /><br/>
      <input defaultValue={this.props.diory.geo.longitude} /><br/>
      <button onClick={() => { console.log("Button clicked")}}>Button</button>
    </div>
  }

}
