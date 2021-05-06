const fetch = require("node-fetch");
const token =
  "49XO7DyXKb7oIalmKsIpocWspZCQQ-h8vxEPvzDGvLkKS3_AhQQ8UMSy2ghleVtt";

module.exports = async function () {
  let response = await fetch("https://graphql.apirocket.io/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      query: `
     

query MyQuery {
    AllEntornos {
      imagen {
        url
      }
      descripcion
      tipo
      nombre
    }
  }
  
  
`,
    }),
  })
    .then((res) => res.json())
    .then((json) => {
      
      return json.data.AllEntornos;
    })
    .catch((error) => {
      console.log(error);
    });

  return response;
};




