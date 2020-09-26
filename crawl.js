const axios = require('axios');
const cheerio = require('cheerio');
const url = "https://www.amazon.in/dp/B07W7B94HK";

const fetchData = async (url) => {
  console.log('Crawling Data ...');

  let response = await axios(url);

  if(response && response.status !== 200){
    console.log('Some error with crawling');

    return;
  }

  return response;
}

const crawlSite = async (url) => {
  console.log(`Starting Crawling ... ${url}`);

  const res = await fetchData(url);

  if(!res.data){
    console.log('Invalid Crawled Data!');

    return;
  }

  const html = res.data;

  const cheerioObj = cheerio.load(html);

  const dataTable = cheerioObj('.a-lineitem > tbody > tr');

  dataTable.each(function() {
    let title = cheerioObj(this).find('td').text();

    let newStr = title.split("\t");

    formatStr(newStr);
  });
}

//Just to format the data.. we can insert the data into some DB also
function formatStr(arr){
  let regExp = /[^A-Z]*(^\D+)/ 
  newArr = arr[0].replace(/\r?\n|\r/g, " ")

  console.log(newArr);
}

crawlSite(url);