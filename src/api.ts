export const GAS_URL = "https://script.google.com/macros/s/AKfycby63Fni4IEJmNJWsweBneSxbOgsYd9zBp7JskVtvKWCxaxJtjz0nnGETM6cfr1r39Ii/exec";

export async function callAPI(payload: any) {
  try {
    const response = await fetch(GAS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify(payload)
    });
    if (!response.ok) throw new Error("HTTP Error");
    return await response.json();
  } catch (error) {
    console.error("Gateway Connection Error", error);
    return null;
  }
}
