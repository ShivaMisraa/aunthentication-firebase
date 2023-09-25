import { Switch, Route,BrowserRouter as Router } from "react-router-dom";

import Layout from "./Components/Layout/Layout";
import UserProfile from "./Components/Profile/UserProfile";
import AuthPage from "./Pages/AuthPage";
import HomePage from "./Pages/HomePage";
import { AuthContextProvider } from "./Store/auth-context";

function App() {
  return (
    <AuthContextProvider>

    <Router>
      <Layout>
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/auth">
            <AuthPage />
          </Route>
          <Route path="/profile">
            <UserProfile />
          </Route>
        </Switch>
      </Layout>
    </Router>
    </AuthContextProvider>
  );
}

export default App;
