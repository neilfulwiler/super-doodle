import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';

class ProjectSelector extends Component {
  static propTypes = {
    select: PropTypes.func.isRequired
  };

  render() {
    const {select} = this.props;
    return (
      <table className="project-selector">
      <tbody>
      <tr><td onClick={() => select('hi')}>hi</td></tr>
      <tr><td onClick={() => select('there')}>there</td></tr>
      </tbody>
      </table>);
  }
}

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
    selectProject: true,
    projects: [],
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
    const {value, projects} = this.state;
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
              <span style={{width: "100%"}}>
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
                  ref={ref => { 
                    if (ref) {
                      ref.focus();
                    }
                    this.inputRef = ref; 
                  }}/>
                  <ul className="project-list">
                  {projects.map(project => 
                    <li className="project" key={project}>{project}</li>
                  )}
                  </ul>
                </span>
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
    const {selectProject, projects} = this.state;
    return (
      <span>
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
              <span 
                className="icons" 
                data-tip="Project" 
                style={{position: "relative"}}
                onClick={() => this.setState(state => ({selectProject: !state.selectProject}))} >
                <i className="fas fa-list"></i>
                {selectProject 
                  ? (
                    <div style={{width: "200px", height: "200px", position: "absolute"}}>
                    <ProjectSelector select={project => this.setState(state => ({projects: state.projects.concat([project])}))}/>
                    </div>
                    )
                  : []}
              </span>
              <span className="icons" data-tip="Reminders">
                <i className="far fa-clock"></i>
              </span>
              <span className="icons" data-tip="Priority">
                <i className="far fa-flag"></i>
              </span> 
            </td>
          </tr>
          </tbody>
        </table>
        <ReactTooltip effect="solid"/>
      </span>
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