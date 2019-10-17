import React, { useContext } from 'react'
import { Panel, Table, Button, Glyphicon } from 'react-bootstrap/lib'
import { Context } from '../Context'

const LogContador = () => {
    const { deleteLog, logs } = useContext(Context)
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
                        {logs.map((log) => <LogRow log={log} key={log.id} deleteLog={deleteLog} />)}
                    </tbody>
                </Table>
            </Panel.Body>
        </Panel>
    )
}
export default LogContador

const LogRow = (props) =>
    <tr>
        <td>{props.log.when.toLocaleString('es-AR')}</td>
        <td>{props.log.type}</td>
        <td align="center">
            <Button bsStyle="danger" id={"delete_" + props.log.id} onClick={() => props.deleteLog(props.log)} >
                <Glyphicon glyph="erase" />
            </Button>
        </td>
    </tr>


