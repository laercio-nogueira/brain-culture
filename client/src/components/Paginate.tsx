import React from "react";
import styled from "styled-components";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
`;

const PageButton = styled.button<{ $actived?: boolean }>`
  padding: 0.5rem 1rem;
  border: none;
  background-color: ${({ $actived }) => ($actived ? "#4caf50" : "#eee")};
  color: ${({ $actived }) => ($actived ? "#fff" : "#333")};
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: ${({ $actived }) => ($actived ? "#45a049" : "#ddd")};
  }

  &:disabled {
    cursor: not-allowed;
    background-color: #ccc;
  }
`;

export const Paginate: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePageClick = (page: number) => {
    if (page !== currentPage && page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    totalPages && (
      <PaginationContainer>
        <PageButton
          onClick={() => handlePageClick(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Anterior
        </PageButton>

        {[...Array(totalPages)].map((_, i) => {
          const page = i + 1;
          const isActive = page === currentPage;

          return (
            <PageButton
              key={page}
              $actived={isActive}
              onClick={() => handlePageClick(page)}
            >
              {page}
            </PageButton>
          );
        })}

        <PageButton
          onClick={() => handlePageClick(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Próxima
        </PageButton>
      </PaginationContainer>
    )
  );
};
