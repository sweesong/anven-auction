
import ExcelJS from 'exceljs';
import fs from 'fs';

interface RowData {
  [key: string]: any;
}

type Properties = {
  id: string;
  auctiondate: string;
  city: string;
  unitno: string;
  address: string;
  reserveprice: string;
  size: string;
  type: string;
  tenure: string;
}

const getCellValue = (row:  ExcelJS.Row, cellIndex: number) => {
  const cell = row.getCell(cellIndex);
  
  return cell.value ? cell.value.toString() : '';
};

async function loadExcelToJson(filePath: string, outputJsonPath: string): Promise<void> {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(filePath);

  const worksheet = workbook.getWorksheet(1); // Get the first sheet

  if (!worksheet) {
    console.error('Worksheet not found.');
    return;
  }

  const rowStartIndex = 1;
  const numberOfRows = worksheet.rowCount;

  const rows = worksheet.getRows(rowStartIndex, numberOfRows) ?? [];

  const properties = rows.map((row): Properties => {
    return {
      id: getCellValue(row,1),
      auctiondate: getCellValue(row,2),
      city: getCellValue(row,3),
      unitno: getCellValue(row,4),
      address: getCellValue(row,5),
      reserveprice: getCellValue(row,6),
      size: getCellValue(row,7),
      type: getCellValue(row,8),
      tenure: getCellValue(row,9),
    }
  })

  /*
  const data: RowData[] = [];

  worksheet.eachRow((row, rowNumber) => {
    if (rowNumber !== 1) { // Skip the header row
      const rowData: RowData = {};
      headers.forEach((header, index) => {
        rowData[header] = row.getCell(index + 1).value;
      });
      data.push(rowData);
    }
  });
  */

  console.log(properties);

  // Convert the data to JSON and write to a file
  //fs.writeFileSync(outputJsonPath, JSON.stringify(data, null, 2));
  //console.log(`Data successfully written to ${outputJsonPath}`);
}

// Example usage
loadExcelToJson('auction_listing.xlsx', './output/data.json')
  .then(() => console.log('Excel file processed successfully.'))
  .catch((err) => console.error('Error processing Excel file:', err));
