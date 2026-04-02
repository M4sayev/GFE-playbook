import { useState, useMemo } from "react";
import users from "./data/users";

const columns = [
  { label: "ID", key: "id" },
  { label: "Name", key: "name" },
  { label: "Age", key: "age" },
  { label: "Occupation", key: "occupation" },
];

const selectOptions = [
  { key: "showFive", label: "show 5", limit: 5 },
  { key: "showTen", label: "show 10", limit: 10 },
  { key: "showTwenty", label: "show 20", limit: 20 },
];

function usePagination(items, limit) {
  const [currentPage, setCurrentPage] = useState(0);

  const totalPages = useMemo(() => {
    if (!items.length) return 0;
    return Math.ceil(items.length / limit);
  }, [limit, items]);

  const paginatedItems = useMemo(() => {
    const currentItemIndex = currentPage * limit;
    return items.slice(currentItemIndex, currentItemIndex + limit);
  }, [currentPage, limit, items]);

  const hasNext = currentPage < totalPages - 1;

  const hasPrev = currentPage !== 0;

  const next = () =>
    setCurrentPage((prev) => Math.min(prev + 1, Math.max(totalPages - 1, 0)));

  const prev = () => setCurrentPage((prev) => Math.max(prev - 1, 0));

  const goToFirst = () => setCurrentPage(0);

  const goToLast = () => setCurrentPage(totalPages - 1);

  return {
    paginatedItems,
    currentPage: items.length ? currentPage + 1 : 0,
    goToFirst,
    goToLast,
    next,
    prev,
    hasNext,
    hasPrev,
    totalPages,
  };
}

export default function DataTable() {
  const [limit, setLimit] = useState(5);
  const {
    currentPage,
    paginatedItems,
    goToFirst,
    next,
    hasNext,
    prev,
    hasPrev,
    totalPages,
  } = usePagination(users, limit);

  function handleSelect(e) {
    goToFirst();
    setLimit(parseInt(e.target.value));
  }

  return (
    <div className="table">
      <UsersTable users={paginatedItems} />
      <div className="table__controls">
        <PageSizeSelector
          value={limit}
          options={selectOptions}
          onSelect={handleSelect}
        />

        <Pagination
          className="table__pagination"
          currentPage={currentPage}
          totalPages={totalPages}
          onNext={next}
          onPrev={prev}
          hasNext={hasNext}
          hasPrev={hasPrev}
        />
      </div>
    </div>
  );
}

function UserRow({ ...user }) {
  const {
    id = "unknown",
    name = "unknown",
    age = "unkown",
    occupation = "unkown",
  } = user;
  return (
    <tr>
      <td>{id}</td>
      <td>{name}</td>
      <td>{age}</td>
      <td>{occupation}</td>
    </tr>
  );
}

function UsersTable({ users }) {
  return (
    <>
      <h1>Table of users</h1>
      <table aria-live="polite">
        <thead>
          <tr>
            {columns.map(({ label, key }) => (
              <th key={key}>{label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <UserRow key={user.id} {...user} />
          ))}
        </tbody>
      </table>
    </>
  );
}

function PageSizeSelector({ options, value, onSelect, className = "" }) {
  return (
    <select
      aria-label="Items per page"
      onChange={onSelect}
      value={value}
      className={`select-size ${className}`}
    >
      {options.map((option) => (
        <option key={option.key} value={option.limit}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

function Pagination({
  className = "",
  onNext,
  hasNext,
  onPrev,
  hasPrev,
  totalPages,
  currentPage,
}) {
  return (
    <div className={`pagination ${className}`}>
      <button
        aria-label="view the previus page"
        disabled={!hasPrev}
        onClick={onPrev}
      >
        prev
      </button>
      <span>{`Page ${currentPage} of ${totalPages}`}</span>
      <button
        aria-label="view the next page"
        disabled={!hasNext}
        onClick={onNext}
      >
        next
      </button>
    </div>
  );
}
