import React from "react";

export class Button extends React.Component {
  
  onClick(event) {
    event.persist();
    this.props.onClick({click: true});
  }

  render() {
    return <div className="button" onClick={this.onClick.bind(this)} >{this.props.children}</div>;
  }
}


export class Slider extends React.Component {

  onChange(event) {
    event.persist();
    this.props.onChange({[this.props.name]: event.target.value});
  }

  render() {
    return (
      <div> 
        <label>{this.props.children}</label>
        <input type="range" min="1" max="100" defaultValue={this.props.value} 
               onChange={this.onChange.bind(this)}/>
      </div>
    );
  }

}


export class Select extends React.Component {

  onChange(event) {
    event.persist();
    this.props.onChange({[this.props.name]: event.target.value});
  }

  render() {
    const selectitems = [];
    for (const [index, item] of this.props.items.entries())
      selectitems.push(
        <option key={index} value={item}>
          {item}
        </option>
      );
    return (
      <div>
        <label>{this.props.children}</label>
        <select onChange={this.onChange.bind(this)}>{selectitems}</select>
      </div>
    );
  }
}


export class Text extends React.Component {

  onChange(event) {
    event.persist();
    this.props.onChange({[this.props.name]: event.target.value});
  }

  render() {
    return (
      <div> 
        <label>{this.props.children}</label>
        <input type="text" onChange={this.onChange.bind(this)} name="lname"/> 
      </div>
    );
  }
}
