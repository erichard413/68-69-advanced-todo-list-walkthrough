export function TodoFilterForm({
  filterName,
  setFilterName,
  hideCompleted,
  setHideCompleted,
}) {
  return (
    <form className="filter-form">
      <div className="filter-form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={filterName}
          onChange={e => setFilterName(e.target.value)}
        />
      </div>
      <label>
        <input
          type="checkbox"
          checked={hideCompleted}
          onChange={e => setHideCompleted(e.target.checked)}
        />
        Hide Completed
      </label>
    </form>
  );
}
