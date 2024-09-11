const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const path = require('path');
const Excel = require('exceljs');

const ExcelJS = require('exceljs');

const inputFilename= "./public/Auction_Listing_Raw_20240910D.xlsx";

const ColumnIdx = {
  NEW:1,
  ID:2,
  AUCTION_DATE:3,
  CITY:4,
  UNITNO:5,
  ADDRESS:6,
  RESERVE_PRICE:7,
  SIZE:8,
  TYPE:9,
  TENURE:10,
  BANK:11,
  AUCTION_TYPE:12,
  OWNER:13,
  AUCTIONER:14,
  REMARKS:15,
  DATE_KEYIN:16,
  IPRO:17,
  EP:18,
  PG:19,
}

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

const getCellColor = (row, cellIndex) => {
  return row.getCell(cellIndex)?.style?.fill?.fgColor?.argb;
};

function parseDate(dateString) {
  if(!dateString)
    return null;
  

  const [day, month, year] = dateString.toString().split('-');
  return new Date(`${year}-${month}-${day}`);
}

function extractDate(phrase) {

  // Regular expression to match dd-mm-yyyy format
  const datePattern = /\b(\d{2})-(\d{2})-(\d{4})\b/;
  
  // Match the pattern in the phrase
  const match = phrase.match(datePattern);
  
  // Return the matched date if found, otherwise return null
  return match ? match[0] : null;
}

async function setAutoIncrementStart() {
  await prisma.$executeRaw`ALTER SEQUENCE public.current_listing_id_seq RESTART WITH 100000`; // PostgreSQL
}

async function extractFromSheetJS(){
  const workbook = new Excel.Workbook();
  await workbook.xlsx.readFile(inputFilename);

  const worksheet = workbook.worksheets[0]; // Assuming you want to read the second sheet
  const rowStartIndex = 2;
  const numberOfRows = worksheet.rowCount;

  const rows = worksheet.getRows(rowStartIndex, numberOfRows) || [];

  //console.log(getCellColor(rows[28],28));

  const current_listing = rows
    .filter(row => {
      // Filter out rows where the id is missing or empty
      const id = getCellValue(row, ColumnIdx.ID);
      return id.trim() !== '';
    })
    .map((row) => {
      estimateprice = null;
      const rawAddress = getCellValue(row, ColumnIdx.ADDRESS);
      
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

      let tmpAddress = address.split(',')
      let title = tmpAddress[0]; //by default use first part
      
      const words = ["jalan", "lorong"];

      if(words.some((word) => title.toLowerCase().includes(word.toLowerCase())))
      {
        if(tmpAddress.length>1){
          title = tmpAddress[tmpAddress.length-2].trim() + ", " + tmpAddress[tmpAddress.length-1].trim()

          const checkPostcode = title.split(/\s+/);

          if (/^\d+$/.test(checkPostcode[0])) {
            title = title.replace(checkPostcode[0],"").trim();
          }
        }
      }

      return {
        legacy_id: getCellValue(row, ColumnIdx.ID),
        title: title,
        auction_date: parseDate(extractDate(getCellValue(row, ColumnIdx.AUCTION_DATE))),
        city: getCellValue(row, ColumnIdx.CITY),
        unitno: getCellValue(row, ColumnIdx.UNITNO),
        address: address,
        reserve_price: parseFloat(getCellValue(row, ColumnIdx.RESERVE_PRICE)),
        estimate_price: estimateprice,
        size: !isNaN(parseFloat(getCellValue(row, ColumnIdx.SIZE))) ? parseFloat(getCellValue(row, ColumnIdx.SIZE)) : 0,
        type: getCellValue(row, ColumnIdx.TYPE),
        tenure: getCellValue(row, ColumnIdx.TENURE),
        extra_info: trimmedExtraInfo,
        bank:getCellValue(row, ColumnIdx.BANK),
        auction_type:getCellValue(row, ColumnIdx.AUCTION_TYPE),
        owner:getCellValue(row, ColumnIdx.OWNER),
        auctioner:getCellValue(row, ColumnIdx.AUCTIONER),
        remarks:getCellValue(row, ColumnIdx.REMARKS),
        ipro:getCellValue(row, ColumnIdx.IPRO).toLowerCase()=="yes"?true:false,
        ep:getCellValue(row, ColumnIdx.EP).toLowerCase()=="yes"?true:false,
        pg:getCellValue(row, ColumnIdx.PG),
      };
    });

  //console.log(properties_raw);
  
  const dataToLoad = await current_listing;

  dataToLoad.sort((a,b) => {
    if (a.legacy_id < b.legacy_id) return -1;
    if (a.legacy_id > b.legacy_id) return 1;
    return 0;
  });

  //console.log(data);

  await prisma.current_listing.deleteMany();

  setAutoIncrementStart();

  await prisma.current_listing.createMany({
    data: dataToLoad,
  });

  await prisma.$disconnect();
 
  //console.log(data);
  console.log(dataToLoad.length);
}


async function extractFromExcelJS(){
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(inputFilename);

  const worksheet = workbook.getWorksheet("Auction Listing"); // Select the first sheet

  //console.log(worksheet);

  const cell = worksheet.getCell('A1'); // Select cell A1

  console.log(worksheet.getCell('A1').value);
  console.log(worksheet.getCell('G5').style.fill.fgColor.argb);

  
  
  const fill = cell.fill;
  
  //console.log(cell.value);
  //console.log(fill);

  if (fill && fill.type === 'pattern' && fill.bgColor) {
      const color = fill.bgColor; // Get the ARGB value of the cell background color
      //console.log(color);
      return color ? `#${color.slice(2)}` : 'No color';
  } else {
      return 'No color';
  }
}



const main = async () => {
  
  extractFromSheetJS();
  //console.log(extractFromExcelJS());
};

main().then();
