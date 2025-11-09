import { useEffect, useState } from "react";
import { useApi } from "../context/api";

export function Customers() {
  const api = useApi();
  const [numCustomers, setNumCustomers] = useState(0);
  useEffect(() => {
    api.customer.customers({}).then((res) => setNumCustomers(res.total));
  }, [api]); // only on mount
  return (
    <>
      <div>Customer Table for {numCustomers} customers</div>
    </>
  );
}
