import React from 'react';
import HintContainer from './Hint/container';

import './index.css';

/**
 * @prop label, children, abbr, required @see Select
 *
 * @return html label as parent to props.children with text of prop.value concatted with ': ',
   if abbr is given, that's put in too, and if required is given, a red asterisk is put in too
 */
export default function Label(props) {

    const label = props.value + ": ";

    return (
        <label>{label}
            {props.children}
            {!!props.required ? <span className="danger">*</span> : ""}
            {!!props.abbr ? <HintContainer title={props.abbr} /> : ""}
        </label>
    )
}

