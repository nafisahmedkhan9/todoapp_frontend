import React from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Link } from "react-router-dom"
import Aux from "../../../hoc/_Aux";
import * as actions from "../../../store/actions";

class RightSlider extends React.Component {

    render() {
        let listClass = ['header-user-list', "open"];
        return (
            <Aux>
                <div className={listClass.join(' ')} style={!this.props.isOpen ? { right: "-350px" } : { right: 0 }}>
                    <div className="h-list-body">
                        <Link to={actions.CONS.BLANK_LINK} className="h-close-text" onClick={this.props.onToggle} style={{top: "211px"}}>
                            {this.props.isOpen ? <i className="feather icon-chevrons-right" /> : <i className="feather icon-chevrons-left" />}
                        </Link>
                        <div className="main-friend-cont scroll-div">
                            <div className="main-friend-list" style={{ height: 'calc(100vh - 85px)' }}>
                                <PerfectScrollbar>
                                    {this.props.children}
                                </PerfectScrollbar>
                            </div>
                        </div>
                    </div>
                </div>
            </Aux>
        );
    };
}

export default RightSlider;