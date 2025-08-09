import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import DashboardPage from "./pages/DashboardPage";
import ServiceReceptionListPage from "./pages/ServiceReceptionListPage";
import ServiceReceptionFormPage from "./pages/ServiceReceptionFormPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/service-reception" element={<ServiceReceptionListPage />} />
          <Route path="/service-reception/new" element={<ServiceReceptionFormPage />} />
          <Route path="/service-reception/edit/:docCode" element={<ServiceReceptionFormPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;