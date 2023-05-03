import React from 'react';
import Screen from './components/Screen/Screen';
import Button from './components/Button/Button';

function Calculator() {
    return (
        <main>
            <div className='Screen'>
                <Screen />
            </div>
            <p>Oláaaaa</p>
            <div className='row'>
                <Button char={'C'} />
                <Button char={'x²'} />
                <Button char={'←'} />
                <Button char={'/'} />
            </div>
            <div className='row'>
                <Button char={7} />
                <Button char={8} />
                <Button char={9} />
                <Button char={'X'} />
            </div>
            <div className='row'>
                <Button char={4} />
                <Button char={5} />
                <Button char={6} />
                <Button char={'+'} />
            </div>
            <div className='row'>
                <Button char={1} />
                <Button char={2} />
                <Button char={3} />
                <Button char={'-'} />
            </div>
            <div className='row'>
                <Button char={','} />
                <Button char={0} />
                <Button char={'='} />
            </div>
        </main>
    )
}

export default Calculator;