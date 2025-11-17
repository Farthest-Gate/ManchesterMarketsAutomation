export interface MarketTimings {
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  
}

export interface MarketDetails {
  category: string;
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
}

export interface AddressData {
  postcode: string;
}

export interface MarketApplicationData {
  timings: MarketTimings;
  marketDetails: MarketDetails;
  address: AddressData;
}

export const marketApplicationData: MarketApplicationData = {
  timings: {
    startDate: '01/02/2025',
    endDate: '20/02/2025',
    startTime: '10:00',
    endTime: '19:00',
    
  },
  marketDetails: {

    category: 'Car boot sale (can include',
    marketname: 'Flower Market',
    marketcapacity: '100',
    occupiedspace: '50',
    traderCount: '100',
    stallCharge: '200',
    purpose: 'purpose and benefits',
    stallTypes: ['Demountable stalls', 'Stands', 'Vehicles'],
    marketType: 'Commercial',
    terms: 'Yes',
    layoutPlan: 'check.png'
  },
  address: {
    postcode: 'm1 1db'
  }
};
