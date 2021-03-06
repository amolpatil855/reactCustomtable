/**
 * Search Form Component
 */
import React, { Component } from "react";
import { connect } from "react-redux";

// actions
import { toggleSearchForm } from "../../actions";

class SearchForm extends Component {
  /**
   * It is used to close the search form
   */
  onCloseIcon(event) {
    event.preventDefault(); // preventing default actions
    this.props.toggleSearchForm(); // calling redux action
  }

  render() {
    return (
      <div className="search-box">
        <a onClick={event => this.onCloseIcon(event)}>
          <i className="search-form-close icon-close" />
        </a>
        <form action="#" className="search-form-overlay">
          <div className="search-input">
            <input
              type="text"
              name="input-search"
              className="input-search"
              placeholder="Enter your search..."
            />
            <button type="submit" className="submit">
              <i className="icon-arrow-right" />
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default connect(null, {
  toggleSearchForm
})(SearchForm);
