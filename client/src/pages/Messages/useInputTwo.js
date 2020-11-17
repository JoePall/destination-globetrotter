import { useState} from 'react';

function useInputTwo() {
    let [value, findValue] = useState('');

    let onChange = function(event) {
        findValue(event.target.value);
    };
    return {
        value,
        findValue,
        onChange
    };
}

export default useInputTwo;