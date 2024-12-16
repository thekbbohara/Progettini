import puppeteer from "puppeteer";
import { type Socket } from "socket.io";

export default async function scrapper(socket: Socket) {
  let oldData: string[][] = []; // Initialize oldData as an empty array
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto("https://coinmarketcap.com/", {
    waitUntil: "domcontentloaded",
  });

  await page.setViewport({ width: 1080, height: 1024 });

  while (true) {
    try {
      // Fetch the new data
      const tbody = await page.waitForSelector("table tbody");
      const newData: string[][] | undefined = await tbody?.evaluate(
        (el: HTMLTableSectionElement) => {
          const rows = Array.from(el.querySelectorAll("tr")).slice(0, 9);
          return rows.map((row: HTMLTableRowElement) =>
            Array.from(row.querySelectorAll("td")).map(
              (cell: HTMLTableCellElement) => cell.textContent?.trim() || "",
            ),
          );
        },
      );

      if (!newData) {
        console.log("Failed to fetch data");
        break;
      }

      // Clean the data: remove empty strings
      const cleanedNewData = newData.map((row) =>
        row.filter((cell) => cell !== ""),
      );

      // Compare new data with old data
      const hasChanges =
        JSON.stringify(cleanedNewData) !== JSON.stringify(oldData);

      if (hasChanges) {
        // console.log("Data updated:", cleanedNewData);
        oldData = cleanedNewData; // Update oldData with the new data
        if (socket) {
          // console.log("sc", socket.connected);
          socket.emit("data", cleanedNewData);
          socket.on("connect_error", (err) => {
            console.error("Socket connection error:", err);
            return;
          });
          socket.on("connect_timeout", () => {
            console.error("Socket connection timed out");
            return;
          });
        }
      } else {
        console.log("No changes detected. Waiting for next update...");
      }

      // Wait for a short interval before the next iteration
      await new Promise((resolve) => setTimeout(resolve, 5000)); // 5 seconds
    } catch (error) {
      console.error("Error in the loop:", error);
      break;
    }
  }
  await browser.close();
}
