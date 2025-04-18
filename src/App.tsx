
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

// Layout and pages
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import ServiceDetails from "./pages/ServiceDetails";
import Team from "./pages/Team";
import Projects from "./pages/Projects";
import ProjectDetails from "./pages/ProjectDetails";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

// Auth and admin pages
import Auth from "./pages/Auth";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/admin/Dashboard";
import ProjectsAdmin from "./pages/admin/ProjectsAdmin";
import ServicesAdmin from "./pages/admin/ServicesAdmin";
import PagesAdmin from "./pages/admin/PagesAdmin";
import SpecialPagesAdmin from "./pages/admin/SpecialPagesAdmin";
import TeamAdmin from "./pages/admin/TeamAdmin";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <TooltipProvider>
        <Routes>
          {/* Public routes */}
          <Route element={<Layout><Outlet /></Layout>}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:id" element={<ServiceDetails />} />
            <Route path="/team" element={<Team />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectDetails />} />
            <Route path="/contact" element={<Contact />} />
          </Route>

          {/* Auth route - does not use Layout component */}
          <Route path="/auth" element={<Auth />} />

          {/* Admin routes */}
          <Route path="/admin" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/admin/projects" element={<ProtectedRoute><ProjectsAdmin /></ProtectedRoute>} />
          <Route path="/admin/services" element={<ProtectedRoute><ServicesAdmin /></ProtectedRoute>} />
          <Route path="/admin/pages" element={<ProtectedRoute><PagesAdmin /></ProtectedRoute>} />
          <Route path="/admin/special-pages" element={<ProtectedRoute><SpecialPagesAdmin /></ProtectedRoute>} />
          <Route path="/admin/team" element={<ProtectedRoute><TeamAdmin /></ProtectedRoute>} />
          
          {/* 404 route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
        <Sonner />
      </TooltipProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
