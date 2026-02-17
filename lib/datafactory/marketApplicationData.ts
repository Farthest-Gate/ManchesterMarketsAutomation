export interface MarketTimings {
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  
}

export interface MarketDetails {
  marketname: string;
  marketcapacity: string;
  occupiedspace: string;
  traderCount: string;
  stallCharge: string;
  purpose: string;
  stallTypes: string[];
  marketType: string;
  terms: string;
  layoutPlan: string;
  commodity1: string;
  commodity2: string;
  natureOfMarket: string;
  premiseNumber: string;
  otherMarketType: string;
  location: string;
}

export interface AddressData {
  postcode: string;
}
export interface streetData{
  streetInitials: string;
  streetInitials1: string;
}

export interface MarketApplicationData {
  timings: MarketTimings;
  marketDetails: MarketDetails;
  address: AddressData;
  streetAddressData: streetData;
}

export const marketApplicationData: MarketApplicationData = {
  timings: {
    startDate: '01/04/2026',
    endDate: '20/04/2026',
    startTime: '10:00',
    endTime: '19:00',
    
  },
  marketDetails: {

    marketType: 'Car boot sale (can include',
    otherMarketType : 'Market (can include car boot and tabletop',
    commodity1 : 'Unwanted household goods (second-hand items sold by householders, not traders)',
    commodity2 : 'Hot cooked food, drinks and sweets',
    marketname: 'Flower Market',
    marketcapacity: '100',
    occupiedspace: '50',
    traderCount: '100',
    stallCharge: '200',
    purpose: 'purpose and benefits',
    stallTypes: ['Demountable stalls', 'Stands', 'Vehicles'],
    natureOfMarket : 'Commercial',
    terms: 'Yes',
    layoutPlan: 'check.png',
    premiseNumber: 'PNoticeNum',
    location: 'In a road'
  },
  address: {
    postcode: 'm1 1db'
  },
  streetAddressData:{
    streetInitials : 'Buck',
    streetInitials1 : 'Buckh'
  }
};
