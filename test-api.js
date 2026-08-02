const GAS_URL = "https://script.google.com/macros/s/AKfycby63Fni4IEJmNJWsweBneSxbOgsYd9zBp7JskVtvKWCxaxJtjz0nnGETM6cfr1r39Ii/exec";

async function run(action) {
  const res = await fetch(GAS_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain' },
    body: JSON.stringify({ action, email: "katiyarsheelu07@gmail.com" })
  });
  const data = await res.json();
  console.log(action + ":", data);
}

run("get_api_key");
run("get_key");
run("get_user_info");
run("get_security_info");
