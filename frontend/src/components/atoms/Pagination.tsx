import React from "react";
import styled from "styled-components";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  page,
  totalPages,
  onPageChange,
}) => {
  const handleNextPage = () => {
    if (page < totalPages) {
      onPageChange(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      onPageChange(page - 1);
    }
  };

  return (
    <StyledPagination>
      <button onClick={handlePreviousPage} disabled={page === 1}>
        Previous
      </button>
      <span>
        Page {page} of {totalPages}
      </span>
      <button onClick={handleNextPage} disabled={page === totalPages}>
        Next
      </button>
    </StyledPagination>
  );
};

const StyledPagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;

  button {
    padding: 10px;
    margin: 0 10px;
    border: none;
    background-color: #007bff;
    color: white;
    cursor: pointer;
    border-radius: 4px;

    &:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
  }

  span {
    margin: 0 10px;
  }
`;

export default Pagination;
