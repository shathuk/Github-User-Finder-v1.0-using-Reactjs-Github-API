import React, { Fragment } from 'react'
import SpinnerGif from './spinner.gif'

const Spinner = () => {
    return (
        <Fragment >
            <img src={SpinnerGif} 
            alt="loading.." 
            style={{margin: 'auto', 
            width: '150px', 
            display: 'block'}}/>
        </Fragment>
    )
}

export default Spinner
