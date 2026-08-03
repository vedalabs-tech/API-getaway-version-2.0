export async function callAPI(payload: any) {
  try {
    const response = await fetch('/api/proxy', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!response.ok) throw new Error("HTTP Error");
    return await response.json();
  } catch (error) {
    console.error("Gateway Connection Error", error);
    return null;
  }
}
