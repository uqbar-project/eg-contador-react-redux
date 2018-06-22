import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Panel, Table, Button, Glyphicon } from 'react-bootstrap/lib'
import { deleteLog } from '../redux/actions'

export class LogContador extends Component {

    render() {
        return (
            <Panel>
                <Panel.Heading>
                    Log de acciones
            </Panel.Heading>
                <Panel.Body>
                    <Table striped bordered condensed hover>
                        <thead>
                            <tr>
                                <th>Cuándo</th>
                                <th>Acción</th>
                                <th />
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.logs.map((log) => <LogRow log={log} key={log.id} deleteLog={this.props.deleteLog} />)}
                        </tbody>
                    </Table>
                </Panel.Body>
            </Panel>
        )
    }
}

const mapStateToProps = state => {
    return {
        logs: state.logs
    }
}

const mapDispatchToProps = dispatch => {
    return {
        deleteLog: (log) => dispatch(deleteLog(log))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogContador)

class LogRow extends Component {
    render() {
        return (
            <tr>
                <td>{this.props.log.when.toLocaleString('es-AR')}</td>
                <td>{this.props.log.type}</td>
                <td align="center">
                    <Button bsStyle="danger" onClick={() => this.props.deleteLog(this.props.log)} >
                        <Glyphicon glyph="erase" />
                    </Button>
                </td>
            </tr>
        )
    }
}

