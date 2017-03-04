import React from 'react';
const {PropTypes} = React;


const Icon = props =>
<svg className={`icon icon--${props.className}`} viewBox={props.viewBox}>
    <path d={props.icon}></path>
</svg>




Icon.defaultProps = {
    className: "undefinedIcon",
    viewBox: '0 0 64 64'
}

Icon.PropTypes = {
    className: React.PropTypes.string,
    viewBox: React.PropTypes.string
}

export default Icon;

//<Icon icon={ICONS.BIN2} />
// import Icon from "./components/icons/Icon";
// import {ICONS} from "./components/icons/IconGlobals";