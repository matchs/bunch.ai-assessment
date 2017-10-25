import React, { Component } from 'react';
import { connect } from 'react-redux';


require('../../../../style/main.scss');
class MainContainer extends Component {
    render() {
        return '';
    }
}

const mapStateToProps = (state) => {
    return({});
};

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(DetailsContainer);