import React, { useContext } from 'react'
import { Label, Panel, Button } from 'react-bootstrap/lib'
import { Context } from '../Context'

const Contador = () => {
    const { count, decrement, increment } = useContext(Context)
    return (
        <Panel>
            <Panel.Heading>
                Contador
            </Panel.Heading>
            <Panel.Body>
                <h3>
                    <Button bsStyle="primary" id="minus" onClick={decrement}>-</Button>
                    &nbsp;&nbsp;
                    <Label bsStyle="success">{count}</Label>
                    &nbsp;&nbsp;
                    <Button bsStyle="primary" id="plus" onClick={increment}>+</Button>
                </h3>
            </Panel.Body>
        </Panel>
    )
}

export default Contador