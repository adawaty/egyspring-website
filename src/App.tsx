import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Router, Route, Switch } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import ErrorBoundary from "@/components/ErrorBoundary";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Home from "@/pages/Home";
import Products from "@/pages/Products";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Materials from "@/pages/Materials";
import Quote from "@/pages/Quote";
import Dashboard from "@/pages/Dashboard"; // Import Dashboard
import { useEffect } from "react";

// Language redirector component
function LanguageRedirect() {
  const [, setLocation] = useHashLocation();
  
  useEffect(() => {
    // Default to English if root is accessed
    setLocation('/en');
  }, [setLocation]);
  
  return null;
}

function AppRouter() {
  return (
    <Router hook={useHashLocation}>
      <Switch>
        {/* Root redirect */}
        <Route path="/" component={LanguageRedirect} />
        
        {/* English Routes */}
        <Route path="/en"><Home lang="en" /></Route>
        <Route path="/en/products"><Products lang="en" /></Route>
        <Route path="/en/materials"><Materials lang="en" /></Route>
        <Route path="/en/quote"><Quote lang="en" /></Route>
        <Route path="/en/about"><About lang="en" /></Route>
        <Route path="/en/contact"><Contact lang="en" /></Route>
        <Route path="/en/dashboard"><Dashboard lang="en" /></Route> {/* Dashboard Route */}

        {/* Arabic Routes */}
        <Route path="/ar"><Home lang="ar" /></Route>
        <Route path="/ar/products"><Products lang="ar" /></Route>
        <Route path="/ar/materials"><Materials lang="ar" /></Route>
        <Route path="/ar/quote"><Quote lang="ar" /></Route>
        <Route path="/ar/about"><About lang="ar" /></Route>
        <Route path="/ar/contact"><Contact lang="ar" /></Route>
        <Route path="/ar/dashboard"><Dashboard lang="ar" /></Route> {/* Dashboard Route */}

        {/* 404 */}
        <Route>
          <div className="flex h-screen items-center justify-center flex-col">
            <h1 className="text-4xl font-bold mb-4">404</h1>
            <p>Page not found</p>
          </div>
        </Route>
      </Switch>
    </Router>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <AppRouter />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
