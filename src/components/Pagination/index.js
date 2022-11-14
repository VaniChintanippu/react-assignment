import PaginationView from '../PaginationView'
import './index.css'

const Pagination = props => {
  const {totalItems, onChangeActivePage, activePage} = props

  const pages = []
  let i = 1
  for (i = 1; i <= Math.ceil(totalItems / 6); ) {
    pages.push(i)
    i += 1
  }

  const onChangePagination = page => {
    onChangeActivePage(page)
  }
  const totalPagesClassName =
    totalItems <= 1 ? 'displaying-pages' : 'pagination-container'
  return (
    <ul className={totalPagesClassName}>
      {pages.map(page => (
        <PaginationView
          key={page}
          page={page}
          onChangePagination={onChangePagination}
          activePage={activePage}
        />
      ))}
    </ul>
  )
}

export default Pagination
