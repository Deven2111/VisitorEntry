// import { useState } from "react";
// import OtpLogin from "./OtpLogin.jsx";

// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   return (
//     <div>
//       {!isLoggedIn ? (
//         <OtpLogin onSuccess={() => setIsLoggedIn(true)} />
//       ) : (
//         <h1>✅ Logged in! Next step: show visitor form.</h1>
//       )}
//     </div>
//   );
// }

// export default App;


import { useState } from "react";
import OtpLogin from "./OtpLogin.jsx";
import VisitorForm from "./VisitorForm.jsx";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
      {!isLoggedIn ? (
        <OtpLogin onSuccess={() => setIsLoggedIn(true)} />
      ) : (
        <VisitorForm />
      )}
    </div>
  );
}

export default App;