import { randomUUID } from "crypto";
import { Customer } from "../types";

const FIRST_NAMES = [
  "Michael",
  "James",
  "John",
  "David",
  "Robert",
  "William",
  "Christopher",
  "Mary",
  "Joseph",
  "Daniel",
  "Matthew",
  "Thomas",
  "Richard",
  "Jennifer",
  "Anthony",
  "Charles",
  "Joshua",
  "Elizabeth",
  "Andrew",
  "Mark",
];

const LAST_NAMES = [
  "Smith",
  "Johnson",
  "Williams",
  "Brown",
  "Jones",
  "Garcia",
  "Miller",
  "Davis",
  "Rodriguez",
  "Martinez",
  "Hernandez",
  "Lopez",
  "Gonzales",
  "Wilson",
  "Anderson",
  "Thomas",
  "Taylor",
  "Moore",
  "Jackson",
  "Martin",
  "Lee",
  "Perez",
  "Thompson",
  "White",
  "Harris",
  "Sanchez",
  "Clark",
  "Ramirez",
  "Lewis",
  "Robinson",
  "Walker",
  "Young",
  "Allen",
  "King",
  "Wright",
  "Scott",
  "Torres",
  "Nguyen",
  "Hill",
  "Flores",
  "Green",
  "Adams",
  "Nelson",
  "Baker",
  "Hall",
  "Rivera",
  "Campbell",
  "Mitchell",
  "Carter",
  "Roberts",
];

const DOMAINS = [
  "hotmail.com",
  "gmail.com",
  "live.com",
  "bigpond.net",
  "icloud.com",
  "outlook.com",
  "yahoo.com",
  "aol.com",
];

function randomFromArray<T>(items: T[]): T {
  if (items.length === 0) {
    throw new Error("empty array");
  }
  const idx = Math.floor(Math.random() * items.length);
  const randomValue = items[idx];
  if (!randomValue) {
    throw new Error("undefined returned from array");
  }
  return randomValue;
}

function randomEmailAddress(firstName: string, lastName: string): string {
  let username = "";
  if (Math.random() < 0.5) {
    // first name
    username +=
      firstName.toLowerCase() + "." + lastName.substring(0, 1).toLowerCase();
  } else {
    // last name
    username +=
      firstName.substring(0, 1).toLowerCase() + "." + lastName.toLowerCase();
  }
  const domain = randomFromArray(DOMAINS);
  return `${username}@${domain}`;
}

const MILLIS_IN_DAY = 1000 * 60 * 60 * 24;
function randomDate(maximumDaysAgo: number): string {
  const now = new Date();
  const randomDate = new Date(
    now.getTime() - Math.floor(Math.random() * maximumDaysAgo * MILLIS_IN_DAY)
  );
  return randomDate.toISOString().split("T")[0]!;
}

export function generateCustomers(total: number): Customer[] {
  const customers: Customer[] = [];
  for (let i = 0; i < total; i += 1) {
    const firstName = randomFromArray(FIRST_NAMES);
    const lastName = randomFromArray(LAST_NAMES);
    customers.push({
      id: randomUUID(),
      name: `${firstName} ${lastName}`,
      email: randomEmailAddress(firstName, lastName),
      registrationDate: randomDate(10_000),
    });
  }
  return customers;
}
