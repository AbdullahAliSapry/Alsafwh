import { Pagination } from "@mantine/core";
import Styles from "./PaginationCom.module.css";
import React from "react";

interface PaginationComProps {
  length: number;
  Take: number;
  page: number;
  SetPage: (page: number) => void;
}

const PaginationCom = React.memo(function PaginationCom({
  length,
  Take,
  page,
  SetPage,
}: PaginationComProps) {
  const totalPages = Math.ceil(length / Take);

  return (
    <div className={Styles.parent}>
      <Pagination
        total={totalPages}
        value={page}
        onChange={(newPage) => SetPage(newPage)}
        mt="sm"
      />
    </div>
  );
});

export default PaginationCom;
