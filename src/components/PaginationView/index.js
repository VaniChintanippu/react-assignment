import './index.css'

const PaginationView = props => {
  const {page, onChangePagination, activePage} = props

  const onClickPaginationButton = () => {
    onChangePagination(page)
  }
  const activePageClassName =
    activePage === page
      ? 'pagination-button active-page-button'
      : 'pagination-button'

  return (
    <li className="pagination-list-container">
      <button
        type="button"
        className={activePageClassName}
        onClick={onClickPaginationButton}
      >
        {page}
      </button>
    </li>
  )
}

export default PaginationView
