import React from "react";
import { Box, Button } from "@mui/material";

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
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        mt: 2,
      }}
    >
      <Button
        onClick={handlePreviousPage}
        disabled={page === 1}
        variant="contained"
      >
        Previous
      </Button>
      <Box sx={{ mx: 2 }}>
        Page {page} of {totalPages}
      </Box>
      <Button
        onClick={handleNextPage}
        disabled={page === totalPages}
        variant="contained"
      >
        Next
      </Button>
    </Box>
  );
};

export default Pagination;
