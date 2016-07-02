const catchAll = (err) => {
  console.error("Error:", err)
  return Promise.reject(err)
}

export default catchAll
