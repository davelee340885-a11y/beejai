import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Schools from "./pages/Schools";
import SchoolDetail from "./pages/SchoolDetail";
import Dashboard from "./pages/Dashboard";
import Favorites from "./pages/Favorites";
import Search from "./pages/Search";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/schools" component={Schools} />
      <Route path="/school/:id" component={SchoolDetail} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/favorites" component={Favorites} />
      <Route path="/search" component={Search} />
      <Route path="/404" component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <div className="min-h-screen bg-background">
            <Navbar />
            <Router />
          </div>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
