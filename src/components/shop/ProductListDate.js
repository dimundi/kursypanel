import React from 'react';

const ProductListDate = ({inStore}) => {

    if(inStore.length === 1)
        return (
            <small className="has-text-grey-light">
                { inStore[0].start &&
                <i className="far fa-calendar-alt mr-1"></i> 
                }
                {inStore[0].start}
            </small>
        )
    else
        return (
            <></>
        )
}

export default ProductListDate;