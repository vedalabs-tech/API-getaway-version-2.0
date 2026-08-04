const fs = require('fs');

const apiCode = `const GAS_URL = "https://script.google.com/macros/s/AKfycby63Fni4IEJmNJWsweBneSxbOgsYd9zBp7JskVtvKWCxaxJtjz0nnGETM6cfr1r39Ii/exec";

export async function callAPI(payload: any) {
  try {
    const response = await fetch(GAS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify(payload)
    });
    if (!response.ok) throw new Error("HTTP Error");
    const text = await response.text();
    try {
      return JSON.parse(text);
    } catch (e) {
      console.error("Invalid JSON from GAS", text);
      return null;
    }
  } catch (error) {
    console.error("Gateway Connection Error", error);
    return null;
  }
}
`;

fs.writeFileSync('src/api.ts', apiCode);
