import { useState } from 'react'

const Pagination = ({ startIndex, lastIndex, length, updateIndex, itemsPerPage }) => {

    const [currentPage, setCurrentPage] = useState(1)

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

            <div>{currentPage} of {Math.ceil(length / itemsPerPage)}</div>

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