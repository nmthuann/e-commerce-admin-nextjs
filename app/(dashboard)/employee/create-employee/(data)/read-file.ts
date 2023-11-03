import fs from "fs"
import path from "path"

interface IWards {
    Id: string;
    Name: string;
    Level: string;
}

interface IDistricts{
    Id: string;
    Name: string;
    Wards: IWards [];
}



interface ILocation {
    Id: string;
    Name: string; // -> id -> Districts[...]-> combobox
    Districts: IDistricts [];
}


const dirPath = path.join(__dirname, "VN-location-data.json");
const fileName = "VN-location-data.json";
let districts: IDistricts[] = [];


fs.readFile(fileName, 'utf8', (err: any, data: any)=>{
    const jsonData:ILocation[] = JSON.parse(data);
    jsonData.forEach((location: ILocation) => {
        districts = districts.concat(location.Districts);
    });

})

// const data: ILocation[] = 

// const province_city_data = {}; // đọc file


// fs.writeFileSync(
//   path.join(__dirname, "VN-location-data.json"), 
//   JSON.stringify(tasks, null, 2)
// )


/**
 * __dirname
 * D:\CODE\Project_NodeJS\e-commerce-admin-nextjs
 * \app\(dashboard)\employee\create-employee\(data)\
 * VN-location-data.json
 */