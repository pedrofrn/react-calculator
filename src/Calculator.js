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
            <Button char={5} classChar={'oi'} />
        </main>
    )
}

export default Calculator;