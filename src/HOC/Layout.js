import React from 'react';

const Layout = (props) => {
    return (
        <div>
            Hello layout
            {props.children}
        </div>
    );
};

export default Layout;