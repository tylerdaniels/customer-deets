import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useApi } from "../context/api";
import type { Customer } from "../services/customer-api";
import { Pagination, Table } from "react-bootstrap";

const CUSTOMER_PLACEHOLDER = Symbol("customer-placeholder");

export function Customers() {
  // Customer Data
  const api = useApi();
  const [loadMore, setLoadMore] = useState(false);
  const [totalSize, setTotalSize] = useState(0);
  const [customers, setCustomers] = useState<
    (Customer | typeof CUSTOMER_PLACEHOLDER)[]
  >([]);

  // Pagination
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const paginationRef = useRef<HTMLUListElement>(null);
  const [mustResizeFlag, setResizeFlag] = useState(false);
  // Helper function
  const calculatePageSize = () => {
    const rowHeight = 40;
    const availableHeight = window.innerHeight;
    const rows = Math.floor(availableHeight / rowHeight); // Maximum rows possible
    setPageSize(rows);
  };
  // Always show pagination buttons
  useLayoutEffect(() => {
    if (paginationRef.current) {
      const rect = paginationRef.current.getBoundingClientRect();
      if (rect.bottom > window.innerHeight) {
        // needs to reduce rows further
        setPageSize((size) => size - 1);
        // check if we need to remove another one
        setResizeFlag((flag) => !flag);
      }
    }
  }, [customers, pageSize, mustResizeFlag]);
  // Attach to resize event
  useEffect(() => {
    calculatePageSize();
    window.addEventListener("resize", calculatePageSize);
    return () => window.removeEventListener("resize", calculatePageSize);
  }, []);
  const totalPages = useMemo(
    () => Math.ceil(totalSize / pageSize),
    [totalSize, pageSize]
  );
  // Split data by page
  const paginatedData = useMemo(() => {
    const paged = customers.slice((page - 1) * pageSize, page * pageSize);
    if (paged.includes(CUSTOMER_PLACEHOLDER)) {
      setLoadMore(true);
    }
    return paged;
  }, [customers, page, pageSize]);

  const loadMoreItems = useCallback(
    async (offset: number, firstLoad?: boolean) => {
      const res = await api.customer.customers({ offset, limit: 50 });
      if (firstLoad) {
        setTotalSize(res.total);
        const allCustomers = Array(res.total);
        for (let i = 0; i < allCustomers.length; i++) {
          allCustomers[i] = CUSTOMER_PLACEHOLDER;
        }
        setCustomers(allCustomers); // append customers
      }
      setCustomers((c) => {
        const copy = [...c];
        copy.splice(offset, res.items.length, ...res.items);
        return copy;
      });
    },
    [api]
  );
  useEffect(() => {
    loadMoreItems(0, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // load items on mount
  useEffect(() => {
    if (!loadMore) {
      return;
    }
    loadMoreItems((page - 1) * pageSize);
    setLoadMore(false);
  }, [loadMoreItems, loadMore, page, pageSize]); // load items on mount
  return (
    <>
      <h1>Customers</h1>
      <Table bordered hover responsive>
        <thead>
          <tr>
            <th scope="col">Customer ID</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Registration Date</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((c) => {
            if (c === CUSTOMER_PLACEHOLDER) {
              return (
                <tr>
                  <th colSpan={4}>Loading...</th>
                </tr>
              );
            } else {
              return (
                <tr>
                  <th scope="row">{c.id}</th>
                  <td>{c.name}</td>
                  <td>{c.email}</td>
                  <td>{c.registrationDate}</td>
                </tr>
              );
            }
          })}
        </tbody>
      </Table>
      <Pagination ref={paginationRef}>
        {[...Array(totalPages)].map((_, i) => (
          <Pagination.Item
            key={i + 1}
            active={i + 1 === page}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    </>
  );
}
