"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import LoginModal from "./LoginModal";

const homepageNav = [
  { label: "Home", href: "/" },
  { label: "Support Topics", href: "/support-topics" },
  { label: "About", href: "/about" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Contact", href: "/contact" },
];

const dashboardNav = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "My Sessions", href: "/dashboard/sessions" },
  { label: "Resources", href: "/dashboard/resources" },
  { label: "Profile", href: "/dashboard/profile" },
];

const moderatorNav = [
  { label: "Dashboard", href: "/moderator" },
  { label: "My Groups", href: "/moderator/groups" },
  { label: "Pending Requests", href: "/moderator/pending" },
  { label: "Profile", href: "/moderator/profile" },
];

const adminNav = [
  { label: "Dashboard", href: "/admin" },
  { label: "Users", href: "/admin/users" },
  { label: "Moderators", href: "/admin/moderators" },
  { label: "Analytics", href: "/admin/analytics" },
  { label: "Settings", href: "/admin/settings" },
];

export default function Header() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [loginModal, setLoginModal] = useState({ isOpen: false, role: 'user' });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);
  
  // Determine which nav to show based on route
  let navItems = homepageNav;
  let headerBg = "bg-white";
  let headerText = "text-slate-900";
  let showDashboardBtn = true;
  let showLogoutBtn = false;
  let pageTitle = "Only Divorce"; // Always show "Only Divorce" regardless of route

  if (pathname?.startsWith("/dashboard")) {
    navItems = dashboardNav;
    headerBg = "bg-gradient-to-r from-blue-600 to-indigo-700";
    headerText = "text-white";
    showDashboardBtn = false;
    showLogoutBtn = true;
  } else if (pathname?.startsWith("/moderator")) {
    navItems = moderatorNav;
    headerBg = "bg-gradient-to-r from-purple-600 to-pink-600";
    headerText = "text-white";
    showDashboardBtn = false;
    showLogoutBtn = true;
  } else if (pathname?.startsWith("/admin")) {
    navItems = adminNav;
    headerBg = "bg-gradient-to-r from-slate-800 to-slate-900";
    headerText = "text-white";
    showDashboardBtn = false;
    showLogoutBtn = true;
  }

  return (
    <header className={`${headerBg} shadow-sm sticky top-0 z-50`}>
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 lg:px-8">
        <Link href="/" className="flex items-center gap-3" style={{ perspective: '1000px' }}>
          <div className="logo-animated flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-gray-500/45 to-gray-600 cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 text-white"
            >
              <path d="M19.5 12.572l-7.5 7.428-7.5-7.428A5 5 0 1 1 12 6.006a5 5 0 1 1 7.5 6.572" />
              <line x1="12" y1="6" x2="12" y2="20" strokeWidth="2.5" />
            </svg>
          </div>
          <span className={`text-xl font-bold tracking-wide ${headerText}`} style={{ fontFamily: "'Homemade Apple', cursive" }}>
            {pageTitle}
          </span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`transition-colors hover:opacity-80 ${
                pathname === item.href ? "font-semibold" : ""
              } ${headerText}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          {showDashboardBtn && !user && (
            <>
              <button
                onClick={() => setLoginModal({ isOpen: true, role: 'user' })}
                className="rounded-full border border-lime-600 px-5 py-2 text-sm font-semibold text-lime-700 transition-colors hover:bg-lime-600 hover:text-white bg-white"
              >
                Login
              </button>
              <button
                onClick={() => setLoginModal({ isOpen: true, role: 'moderator' })}
                className="rounded-full border border-purple-600 px-5 py-2 text-sm font-semibold text-purple-700 transition-colors hover:bg-purple-600 hover:text-white bg-white"
              >
                Moderator
              </button>
              <button
                onClick={() => setLoginModal({ isOpen: true, role: 'admin' })}
                className="rounded-full bg-gradient-to-r from-blue-500 to-purple-600 px-5 py-2 text-sm font-semibold text-white transition-colors hover:shadow-lg"
              >
                Admin
              </button>
            </>
          )}
          {showDashboardBtn && user && (
            <Link
              href="/dashboard"
              className="rounded-full border border-lime-600 px-5 py-2 text-sm font-semibold text-lime-700 transition-colors hover:bg-lime-600 hover:text-white bg-white"
            >
              Dashboard
            </Link>
          )}
          {showLogoutBtn && (
            <button
              onClick={logout}
              className="rounded-full border border-white/30 bg-white/10 px-5 py-2 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20"
            >
              Logout
            </button>
          )}
        </div>
        <LoginModal
          isOpen={loginModal.isOpen}
          onClose={() => setLoginModal({ isOpen: false, role: 'user' })}
          role={loginModal.role}
        />
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`inline-flex h-10 w-10 items-center justify-center rounded-full border ${headerText === "text-white" ? "border-white/30" : "border-slate-200"} md:hidden`}
          aria-label="Toggle menu"
        >
          <span className="sr-only">Menu</span>
          {mobileMenuOpen ? '✕' : '☰'}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className={`md:hidden border-t ${headerText === "text-white" ? "border-white/20" : "border-slate-200"}`}>
          <nav className="flex flex-col px-4 py-4 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-base font-medium transition-colors hover:opacity-80 ${
                  pathname === item.href ? "font-semibold" : ""
                } ${headerText} py-2`}
              >
                {item.label}
              </Link>
            ))}
            <div className={`flex flex-col gap-3 pt-4 border-t ${headerText === "text-white" ? "border-white/20" : "border-slate-200"}`}>
              {showDashboardBtn && !user && (
                <>
                  <button
                    onClick={() => {
                      setLoginModal({ isOpen: true, role: 'user' });
                      setMobileMenuOpen(false);
                    }}
                    className="rounded-full border border-lime-600 px-5 py-2 text-sm font-semibold text-lime-700 transition-colors hover:bg-lime-600 hover:text-white bg-white text-left"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => {
                      setLoginModal({ isOpen: true, role: 'moderator' });
                      setMobileMenuOpen(false);
                    }}
                    className="rounded-full border border-purple-600 px-5 py-2 text-sm font-semibold text-purple-700 transition-colors hover:bg-purple-600 hover:text-white bg-white text-left"
                  >
                    Moderator
                  </button>
                  <button
                    onClick={() => {
                      setLoginModal({ isOpen: true, role: 'admin' });
                      setMobileMenuOpen(false);
                    }}
                    className="rounded-full bg-gradient-to-r from-blue-500 to-purple-600 px-5 py-2 text-sm font-semibold text-white transition-colors hover:shadow-lg text-left"
                  >
                    Admin
                  </button>
                </>
              )}
              {showDashboardBtn && user && (
                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-full border border-lime-600 px-5 py-2 text-sm font-semibold text-lime-700 transition-colors hover:bg-lime-600 hover:text-white bg-white text-center"
                >
                  Dashboard
                </Link>
              )}
              {showLogoutBtn && (
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="rounded-full border border-white/30 bg-white/10 px-5 py-2 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20 text-left"
                >
                  Logout
                </button>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

