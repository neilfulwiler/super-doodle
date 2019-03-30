import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TaskInput extends Component {
  static propTypes = {
    initialValue: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onCancel: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    submitName: PropTypes.string.isRequired,
  };

  static defaultProps = {
    initialValue: '',
    submitName: 'Add Task',
  };

  state = {
    value: this.props.initialValue,
  };

  onChange(e) {
    const {value} = e.currentTarget;
    this.setState({value});
  }

  submit() {
    const {value} = this.state;
    const {onSubmit} = this.props;
    if (!value) {
      // don't do anything if there's no input
      return;
    }
    onSubmit(value);
    this.setState({ value: '' });
  }

  renderInput() {
    const {name, onCancel} = this.props;
    const {value} = this.state;
    const defaultValue = value === '';
    const placeholder = 
      defaultValue 
      ? (<span className="my-placeholder">e.g. Conference Wednesday at 15 #Meeting</span>)
      : [];
    return (
      <div className="my-task-table">
        <table style={{width: "100%"}}>
          <tbody>
          <tr>
            <td>
              {placeholder}
              <input 
                tabIndex="1"
                value={value}
                onKeyDown={e => {
                  if (e.key === 'Escape') {
                    onCancel();
                  }
                }}
                onKeyPress={e => { 
                  if (e.key === 'Enter') { 
                    this.submit(); 
                  }
                }}
                onChange={e => this.onChange(e)}
                className="my-input"
                style={{width: "100%"}}
                ref={ref => { 
                  if (ref) {
                    ref.focus();
                  }
                  this.inputRef = ref; 
                }}/>
            </td>
            <td>
              <div id="date">{name}</div>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    );
  }

  renderButtons() {
    const {onCancel, submitName} = this.props;
    return (
      <table style={{width: "100%"}} className="my-submit-table">
        <tbody>
        <tr>
          <td className="submit">
            <a 
              className="button my-add-task-button"
              onClick={() => {
                this.submit();
                if (this.inputRef !== null) {
                  this.inputRef.focus();
                }
              }}
            >{submitName}</a>
            <a 
              className="button my-cancel-button"
              onClick={onCancel}
            >Cancel</a>
          </td>
          <td className="extra">
            <span className="icons"><i className="fas fa-list"></i></span>
            <span className="icons"><i className="far fa-clock"></i></span>
            <span className="icons"><i className="far fa-flag"></i></span> 
          </td>
        </tr>
        </tbody>
      </table>
    );
  }

  render() {
    const input = this.renderInput();
    const buttons = this.renderButtons();
    return (
      <div>
        {input}
        {buttons}
      </div>
    );
  }
}

export default TaskInput;