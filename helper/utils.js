let fetchUrl = require("fetch").fetchUrl;
let {CHARS} = require("../constant");
const isValidURL = (url) => {
    const regex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g  
  return regex.test(url);
}

const fetchAllDataOfApi = (url) => {
    return new Promise(async(resolve, reject) => {
        try {
            const firstApiData = await fetchData(url);
            const { totalPassengers } = firstApiData;
            const totalRecords = totalPassengers || 0;
            const pageLimit = 100;
            let numOfPages = parseInt(totalRecords / pageLimit);
            lastPageLimit = totalRecords - (numOfPages * pageLimit);
            numOfPages = lastPageLimit > 0 ? numOfPages + 1 : numOfPages;
            let apiResults = [];
            let concurrentCalls = 10;
            let iteration = 1;
            let tempNumOfPages = numOfPages;
            while (tempNumOfPages > 0) {
                let startIndex = ((iteration - 1) * concurrentCalls) + 1;
                let chunkAPIDataPromise = [];
                for (let page = startIndex; page < startIndex + concurrentCalls; page++) {
                    chunkAPIDataPromise.push(fetchData(url, page,  pageLimit));
                    tempNumOfPages--;
                    if((page * pageLimit) >= totalPassengers)
                        break;
                }
                let results = await Promise.all(chunkAPIDataPromise);
                apiResults.push(...results);
                iteration++;
            }
            let allData = [];
            apiResults.forEach((res) => {
                allData.push(...res.data);
            })
            resolve({totalRecords, data: allData})
        } catch (error) {
            console.log(error);
            reject(error.message)
        }
    })
}

const fetchData = (url, page = 1, size = 1) => {
    return new Promise((resolve, reject) => {
        fetchUrl(`${url}?page=${page}&size=${size}`, (err, meta, data) => {
            if (err) reject(err)
            resolve(JSON.parse(data.toString()))
        })
    })
}

function randomString(length, additionalChar) {
    var result = '';
    let charsUsed =  additionalChar ? `${CHARS}${additionalChar}` : CHARS;
    for (var i = length; i > 0; --i) result += charsUsed[Math.floor(Math.random() * charsUsed.length)];
    return result;
}

module.exports = { isValidURL, fetchAllDataOfApi, randomString }