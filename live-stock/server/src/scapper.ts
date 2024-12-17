import puppeteer from "puppeteer";
import { type Socket } from "socket.io";

export default async function scrapper(socket: Socket) {
  let oldData: string[][] = []; // Initialize oldData as an empty array
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1080, height: 1024 });
  await page.goto("https://coinmarketcap.com/", {
    waitUntil: "domcontentloaded",
  });
  while (true) {
    try {
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
      // const hasChanges =
      //   JSON.stringify(cleanedNewData) !== JSON.stringify(oldData);
      // if (hasChanges) {
      // console.log("Data updated:", cleanedNewData);

      const isChanged = cleanedNewData.some((data: string[], id: number) => {
        if (JSON.stringify(data) != JSON.stringify(oldData[id])) {
          // if data changes
          oldData = cleanedNewData; // Update oldData with the new data
          if (socket) {
            socket.emit("data", cleanedNewData);
          }
          return true; // Stops the `some` loop
        }
        return false;
      });

      if (!isChanged) {
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
