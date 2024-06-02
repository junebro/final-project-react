import Papa from 'papaparse';
import nutritionData from './음식데이터베이스.csv';

const parseCSV = () => {
  return new Promise((resolve, reject) => {
    Papa.parse(nutritionData, {
      download: true,
      header: true,
      complete: (results) => {
        resolve(results.data);
      },
      error: (error) => {
        reject(error);
      },
    });
  });
};

export default parseCSV;
