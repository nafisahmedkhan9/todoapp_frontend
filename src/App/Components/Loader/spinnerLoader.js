import React from 'react';

const loader = (props) => {
    if(!("loader" in props) || ("loader" in props && props.loader)){
        return (
            <>
                <div id="preloaderCenter" style={{"display": "block"}}><div id="status"><div className="spinner"></div></div></div>
            </>
        );
    }
    return  []
};

export default loader;