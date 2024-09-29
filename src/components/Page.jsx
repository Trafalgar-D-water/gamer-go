import PropTypes from "prop-types";
import { Helmet } from 'react-helmet-async';
import { forwardRef } from 'react';
import { useSelector } from 'react-redux';
// @mui
import { Box } from '@mui/material';


const Page = forwardRef(({children , title = '' , meta , ...other}, ref)=>{
    // const currentTheme  = useSelector(getcurrentTheme)  // to get the current theme of server or all web pages 
    return (
        <>
            <Helmet>
            <title>{title || 'Default Title'}</title>
                {meta}
            </Helmet>

            <Box  ref={ref} {...other}>
                {children}
            </Box>
        </>
    )
})

Page.propTypes = {
    children : PropTypes.node.isRequired,
    title: PropTypes.string,
    meta: PropTypes.node,
}

export default Page