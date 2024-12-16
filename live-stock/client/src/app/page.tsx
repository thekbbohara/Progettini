"use client";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
export default function Home() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const socket = io("http://localhost:8080");
    socket.on("connect", () => {
      console.log(socket.connected); // true
    });

    socket.on("data", (d) => {
      console.log(d);
      setData(d);
    });
    socket.on("disconnect", () => {
      console.log(socket.connected); // false
    });
  }, []);
  if (data.length < 1) <div>loading</div>;
  return (
    <main className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Cryptocurrency Data</h1>
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b text-left">Rank</th>
            <th className="px-4 py-2 border-b text-left">Name</th>
            <th className="px-4 py-2 border-b text-left">Price</th>
            <th className="px-4 py-2 border-b text-left">24h Change</th>
            <th className="px-4 py-2 border-b text-left">7d Change</th>
            <th className="px-4 py-2 border-b text-left">30d Change</th>
            <th className="px-4 py-2 border-b text-left">Market Cap</th>
            <th className="px-4 py-2 border-b text-left">Volume</th>
            <th className="px-4 py-2 border-b text-left">Circulating Supply</th>
          </tr>
        </thead>
        <tbody>
          {data.map((crypto) => (
            <tr key={crypto[1]} className="border-b">
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
          ))}
        </tbody>
      </table>
    </main>
  );
}
