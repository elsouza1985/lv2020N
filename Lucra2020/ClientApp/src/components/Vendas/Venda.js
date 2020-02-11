import React from 'react';


function countVal(val1, val2) {
    let va1 = parseInt(val1) + parseInt(val2);
    return va1;
}

function Welcome(props) {
    return <h1>Olá, {props.name}... a soma é {countVal(props.val1,props.val2)}</h1>;
}
export default Welcome;