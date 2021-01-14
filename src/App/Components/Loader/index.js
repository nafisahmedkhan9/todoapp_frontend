import React from 'react';

const loader = (props) => {
    if(!("loader" in props) || ("loader" in props && props.loader)){
        return (
            <>
                <div className="loader-bg">
                    <div className="loader-track">
                        <div className="loader-fill"/>
                    </div>
                </div>
                <div id="preloaderCenter" style={{"display": "block"}}><div id="status"><div className="spinner"></div></div></div>
            </>
        );
    }
    return  []
};

export default loader;