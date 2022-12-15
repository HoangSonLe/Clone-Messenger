import { RouterProvider } from "react-router-dom";
import { routes } from "./routes/routes";
function App() {
  return (
    <div style={{ height: "100vh" }}>
      <RouterProvider router={routes} />
    </div>
  );
}

export default App;
