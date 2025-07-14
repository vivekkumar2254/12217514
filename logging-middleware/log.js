export async function Log(stack, level, pkg, message) {
  const res = await fetch("http://20.244.56.144/evaluation-service/logs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer YOUR_ACCESS_TOKEN`
    },
    body: JSON.stringify({ stack, level, package: pkg, message })
  });

  const data = await res.json();
  console.log("Log response:", data);
}
