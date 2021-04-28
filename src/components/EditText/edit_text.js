import React, { Component } from "react";
import { TextField } from "@material-ui/core";
import PropTypes from "prop-types";

class EditText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      text: props.text,
    };
  }

  btnClick = () => {
    this.setState({ edit: true });
  };
  //Code goes here
  render() {
    return (
      <div>
        {this.state.edit ? (
          <TextField
            type="string"
            multiline={this.props.multiline}
            name="text"
            value={this.state.text}
            onChange={(event) =>
              this.setState({
                [event.target.name]: event.target.value,
              })
            }
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.target.value) {
                this.setState({ edit: false });
                this.props.keyEnter(this.state.text);
              }
            }}
          />
        ) : (
          <h4 onDoubleClick={this.btnClick}>{this.state.text}</h4>
        )}
      </div>
    );
  }
}

EditText.propTypes = {
  text: PropTypes.string,
  keyEnter: PropTypes.func,
  multiline: PropTypes.bool,
};

export default EditText;
