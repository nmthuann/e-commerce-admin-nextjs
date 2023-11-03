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