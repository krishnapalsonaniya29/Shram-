export interface SssResponse {
  first_name: string;
  last_name: string;
  gender: string;
  contact_number: string;
  address: string;
}

const mockDatabase: Record<string, SssResponse> = {
  
  "123456789": {
    first_name: "Rahul",
    last_name: "Patel",
    gender: "Male",
    contact_number: "9876543210",
    address: "Indore Vijay Nagar",
  },
  "987654321": {
    first_name: "Priya",
    last_name: "Sharma",
    gender: "Female",
    contact_number: "9123456780",
    address: "Bhopal Arera Colony",
  },

 
  "111222333": {
    first_name: "Amit",
    last_name: "Verma",
    gender: "Male",
    contact_number: "9988776655",
    address: "Ujjain Freeganj",
  },
  "444555666": {
    first_name: "Sneha",
    last_name: "Yadav",
    gender: "Female",
    contact_number: "9012345678",
    address: "Jabalpur Napier Town",
  },
  "777888999": {
    first_name: "Rohit",
    last_name: "Singh",
    gender: "Male",
    contact_number: "8899776655",
    address: "Gwalior Lashkar",
  },
  "222333444": {
    first_name: "Neha",
    last_name: "Chouhan",
    gender: "Female",
    contact_number: "9345678123",
    address: "Ratlam Sailana Road",
  },
  "555666777": {
    first_name: "Arjun",
    last_name: "Mishra",
    gender: "Male",
    contact_number: "9765432101",
    address: "Dewas AB Road",
  },
  "888999000": {
    first_name: "Kavita",
    last_name: "Joshi",
    gender: "Female",
    contact_number: "9871234560",
    address: "Sagar Civil Lines",
  },
};

export const getMockSssData = async (
  mid: string
): Promise<SssResponse> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const record = mockDatabase[mid];

      if (record) {
        resolve(record);
      } else {
        reject(new Error("SSS MID not found"));
      }
    }, 1500); // simulate network delay
  });
};