import Pagination from 'react-bootstrap/Pagination';

// let active = 2;
// let items = [];
// for (let number = 1; number <= 5; number++) {
//   items.push(
//     <Pagination.Item key={number} active={number === active}>
//       {number}
//     </Pagination.Item>,
//   );
// }

// const paginationBasic = (
//   <div>
//     <Pagination>{items}</Pagination>
//     <br />

//     <Pagination size="lg">{items}</Pagination>
//     <br />

//     <Pagination size="sm">{items}</Pagination>
//   </div>
// );

// render(paginationBasic);
import React from "react";

const BlogPagination = (props) => {
    const {page, count, handlePage} = props;

    let items = [];
    for (let number = 1; number <= count; number++) {
        items.push(
            <Pagination.Item 
                key={number} 
                active={number === page} 
                activeLabel=""
                onClick={() => handlePage(number)}>
            {number}
            </Pagination.Item>,
        );
    }

    return (
        <Pagination size="md" style={{justifyContent: 'center'}}>{items}</Pagination>
    )
}

export default BlogPagination;