const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const path = require('path');
const Excel = require('exceljs');

// Function to check if a cell contains rich text
const isRichText = (cell) => {
  return cell.value && typeof cell.value === 'object' && 'richText' in cell.value;
};

const extractText = (data) => {
  return data.richText.map(item => item.text).join('@@@@');
};

// Utility function to get the cell value and convert it to a string
const getCellValue = (row, cellIndex) => {
  const cell = row.getCell(cellIndex);
  if (isRichText(cell)) {
    return extractText(cell.value).replace(/\n/g, '');
  } else {
    return cell.value ? cell.value.toString() : '';
  }

};

function parseDate(dateString) {
  const [day, month, year] = dateString.toString().split('-');
  return new Date(`${year}-${month}-${day}`);
}

const main = async () => {
  const workbook = new Excel.Workbook();
  await workbook.xlsx.readFile("./public/auction_listing.xlsx");

  const worksheet = workbook.worksheets[1]; // Assuming you want to read the second sheet
  const rowStartIndex = 2;
  const numberOfRows = worksheet.rowCount;

  const rows = worksheet.getRows(rowStartIndex, numberOfRows) || [];

  const properties = rows
    .filter(row => {
      // Filter out rows where the id is missing or empty
      const id = getCellValue(row, 2);
      return id.trim() !== '';
    })
    .map((row) => {
      estimateprice = null;
      const rawAddress = getCellValue(row, 6);
      const [address, extraInfo] = rawAddress.split('@@@@');

      var trimmedExtraInfo = extraInfo ? extraInfo.trim() : null;

      if (trimmedExtraInfo != null) {
        if (trimmedExtraInfo.toLowerCase().startsWith("estimated market")) {
          estimatepriceStr = extraInfo.toLowerCase().replace("estimated market price: ", '');
          if (estimatepriceStr.toLowerCase().trim().endsWith("k")) {
            estimateprice = estimatepriceStr.replace("k", "") * 1000;
          } else if (estimatepriceStr.toLowerCase().trim().endsWith("mil")) {
            estimateprice = estimatepriceStr.replace("mil", "") * 1000000;
          }

          trimmedExtraInfo = null;
        }
      }

      const title = address.split(',')[0];

      return {
        id: getCellValue(row, 2),
        title: title,
        auction_date: parseDate(getCellValue(row, 3)),
        city: getCellValue(row, 4),
        //unitno: getCellValue(row, 5),
        address: address,
        extra_info: trimmedExtraInfo,
        reserve_price: parseFloat(getCellValue(row, 7)),
        estimate_price: estimateprice,
        size: !isNaN(parseFloat(getCellValue(row, 8))) ? parseFloat(getCellValue(row, 8)) : 0,
        type: getCellValue(row, 9),
        tenure: getCellValue(row, 10),
        image_url: 'placeholder.png'
      };
    });

  const data = await properties;

  await prisma.properties.deleteMany();

  await prisma.properties.createMany({
    data: data,
  });

  console.log(data.length);
};

main().then();
