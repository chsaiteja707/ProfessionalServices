import React from 'react';

import classes from './Spinner.css';

const spinner=(props)=>{
    return(
        <div className={classes.loaders}>
            Loading...
        </div>
    )
}

export default spinner;