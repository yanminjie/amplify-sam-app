import { ConfigProvider, theme } from "antd";

// import "./App.css";
import Home from "./components/Home";

function App() {
  const { darkAlgorithm } = theme;

  console.log(`${process.env.REACT_APP_ENDPOINT}inventory`);

  return (
    <>
      <ConfigProvider
        theme={{
          algorithm: darkAlgorithm,
        }}
      >
        
        <Home />
      </ConfigProvider>
    </>
  );
}

export default App;

// import React, { useState, useEffect } from 'react';
// import './App.css';
// import axios from "axios";

// export interface Item {
//   id: string;
//   engineCyl: string;
//   engineSize: string;
//   maker: string;
//   model: string;
//   mpgCity: string;
//   mpgCombined: string;
//   mpgHighway: string;
//   rating: string;
//   year: string;
// }

// function App() {
//   const [showResult, setShowResult] = useState(false);
//   const [apiMessage, setApiMessage] = useState("");

//   useEffect(() => {

//     const data = '';
//     const config = {
//       method: 'get',
//       url: 'https://ccinapd2aj.execute-api.us-east-1.amazonaws.com/main/inventory',
//       headers: { },
//       data : data
//     };

//     axios(config)
//     .then(function (response) {
//       // console.log(JSON.stringify(response.data));
//       console.log(response)
//     })
//     .catch(function (error) {
//       console.log(error);
//     });

//   },[])

//   const getApiMessage = async () => {

//     console.log(process.env.REACT_APP_ENDPOINT);

//     const response = await fetch(`${process.env.REACT_APP_ENDPOINT}inventory`, {
//       mode: 'cors'
//     });

//     // console.log(JSON.stringify(response.data))
//     const responseData = await response.text();
//     // const responseData = await JSON.stringify(response);
//     console.log(responseData)

//     setShowResult(true);
//     setApiMessage(responseData);
//   };

//   return (
//     <div className="App">
//       <header className="App-header">
//         <h1>CALL AN API</h1>
//         <button onClick={getApiMessage}>Call Lambda Test</button>
//         <div>
//           {showResult && <code>{JSON.stringify(apiMessage, null, 2)}</code>}
//         </div>
//       </header>
//     </div>
//   );
// }

// export default App;
