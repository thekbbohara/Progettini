"use client";
import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";

export default function Home() {
  const [data, setData] = useState([]);
  const [highlightedRows, setHighlightedRows] = useState<Set<string>>(
    new Set(),
  );
  const prevDataRef = useRef(data);

  useEffect(() => {
    const socket = io("http://localhost:8080");
    socket.on("connect", () => {
      console.log(socket.connected); // true
    });

    socket.on("data", (newData) => {
      console.log(newData);

      // Find changed data
      const changedRows = new Set<string>();
      newData.forEach((newRow: string[]) => {
        const oldRow = prevDataRef.current.find(
          (oldRow: string[]) => oldRow[1] === newRow[1],
        );
        if (oldRow && JSON.stringify(oldRow) !== JSON.stringify(newRow)) {
          changedRows.add(newRow[1]); // Add the unique identifier (name) of the changed row
        }
      });

      setHighlightedRows(changedRows);
      setData(newData);

      // Update the previous data reference
      prevDataRef.current = newData;

      // Remove the highlight after 1 second
      setTimeout(() => {
        setHighlightedRows(new Set());
      }, 1000);
    });

    socket.on("disconnect", () => {
      console.log(socket.connected); // false
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  if (data.length < 1) return <div>loading...</div>;

  return (
    <main className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Cryptocurrency Data</h1>
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b text-left">#</th>
            <th className="px-4 py-2 border-b text-left">Name</th>
            <th className="px-4 py-2 border-b text-left">Price</th>
            <th className="px-4 py-2 border-b text-left">1h</th>
            <th className="px-4 py-2 border-b text-left">24h</th>
            <th className="px-4 py-2 border-b text-left">4d</th>
            <th className="px-4 py-2 border-b text-left">Market Cap</th>
            <th className="px-4 py-2 border-b text-left">Volume(24h)</th>
            <th className="px-4 py-2 border-b text-left">Circulating Supply</th>
          </tr>
        </thead>
        <tbody>
          {data.map((crypto) => {
            const isChanged = highlightedRows.has(crypto[1]);

            return (
              <tr
                key={crypto[1]}
                className={`border-b ${isChanged ? "bg-yellow-200" : ""}`} // Highlight changed rows
              >
                <td className="px-4 py-2">{crypto[0]}</td>
                <td className="px-4 py-2">{crypto[1]}</td>
                <td className="px-4 py-2">{crypto[2]}</td>
                <td className="px-4 py-2">{crypto[3]}</td>
                <td className="px-4 py-2">{crypto[4]}</td>
                <td className="px-4 py-2">{crypto[5]}</td>
                <td className="px-4 py-2">{crypto[6]}</td>
                <td className="px-4 py-2">{crypto[7]}</td>
                <td className="px-4 py-2">{crypto[8]}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}
