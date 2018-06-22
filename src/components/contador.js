import React, { Component } from 'react'
import { connect } from 'react-redux'
import { increment, decrement } from '../redux/actions'
import { Label, Panel, Button } from 'react-bootstrap/lib'

class Contador extends Component {

    render() {
        return (
            <Panel>
                <Panel.Heading>
                    Contador
                </Panel.Heading>
                <Panel.Body>
                    <h3>
                        <Button bsStyle="primary" onClick={() => this.props.decrement()}>-</Button>
                        &nbsp;&nbsp;
                        <Label bsStyle="success">{this.props.value}</Label>
                        &nbsp;&nbsp;
                    <Button bsStyle="primary" onClick={() => this.props.increment()}>+</Button>
                    </h3>
                </Panel.Body>
            </Panel>
        )
    }
}

const mapStateToProps = state => {
    return {
        value: state.value
    }
}

const mapDispatchToProps = dispatch => {
    return {
        increment: () => dispatch(increment()),
        decrement: () => dispatch(decrement())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Contador)