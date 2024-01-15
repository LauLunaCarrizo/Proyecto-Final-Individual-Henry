
export default function Pagination ({ currentPage, totalPages, pageChange }) {
    return (
        <div>
            <button
            onClick={()=> pageChange(currentPage - 1)}
            disabled={currentPage === 1}
            >&#8249;</button>
            <span style={{color:`#cae9ff`}}>
                {currentPage} of {totalPages}
            </span>
            <button
            onClick={()=> pageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            >&#8250;</button>
        </div>
    )
}