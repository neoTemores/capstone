import { useState } from 'react'

const Pagination = ({ startIndex, lastIndex, length, updateIndex, itemsPerPage }) => {

    const [currentPage, setCurrentPage] = useState(1)
    const numOfPages = Math.ceil(length / itemsPerPage)

    const handleChangePage = (index, page) => {
        updateIndex(index)
        setCurrentPage(prev => prev + page)
        window.scroll(0, 0)
    }
    return (
        <div className="paginationContainer">
            {startIndex > 0 &&
                <button
                    className='paginationBtn'
                    onClick={() => handleChangePage(-itemsPerPage, -1)}>
                    Prev
                </button>
            }

            {numOfPages !== 0 && <div>{currentPage} of {numOfPages}</div>}


            {lastIndex < length &&
                <button
                    className='paginationBtn'
                    onClick={() => handleChangePage(itemsPerPage, 1)}>
                    Next
                </button>
            }
        </div>
    )
}

export default Pagination