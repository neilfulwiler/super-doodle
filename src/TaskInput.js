import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addTodo} from './actions';

class TaskInput extends Component {
  static propTypes = {
    now: PropTypes.object.isRequired,
    onCancel: PropTypes.func.isRequired,
    addTodo: PropTypes.func.isRequired,
  };

  state = {
    value: '',
  };

  onChange(e) {
    const {value} = e.currentTarget;
    this.setState({value});
  }

  renderInput() {
    const {now} = this.props;
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
                onChange={e => this.onChange(e)}
                className="my-input"
                style={{width: "100%"}}/>
            </td>
            <td>
              <div id="date">{now.format("MMM D")}</div>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    );
  }

  renderButtons() {
    const {addTodo, onCancel} = this.props;
    return (
      <table style={{width: "100%"}} className="my-submit-table">
        <tbody>
        <tr>
          <td className="submit">
            <a 
              className="button my-add-task-button"
              onClick={() => { addTodo("whats up"); }}
              >Add Task</a>
            <a 
              className="button my-cancel-button"
              onClick={() => onCancel()}
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

// Object of action creators
const mapDispatchToProps = {
  addTodo,
};

export default connect(null, mapDispatchToProps)(TaskInput);