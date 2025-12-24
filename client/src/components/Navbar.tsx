import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Search, 
  Menu, 
  User, 
  LogOut, 
  Settings, 
  Heart,
  Bell,
  LayoutDashboard,
  BookOpen,
  GraduationCap,
  Building2,
  Globe,
  FileText,
  Trophy,
  ChevronDown
} from "lucide-react";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navItems = [
  { 
    label: "幼稚園", 
    href: "/schools?type=kindergarten", 
    icon: BookOpen,
    color: "text-pink-500"
  },
  { 
    label: "小學", 
    href: "/schools?type=primary", 
    icon: GraduationCap,
    color: "text-blue-500"
  },
  { 
    label: "中學", 
    href: "/schools?type=secondary", 
    icon: Building2,
    color: "text-purple-500"
  },
  { 
    label: "國際學校", 
    href: "/schools?type=international", 
    icon: Globe,
    color: "text-green-500"
  },
  { 
    label: "升學攻略", 
    href: "/guides", 
    icon: FileText,
    color: "text-orange-500"
  },
  { 
    label: "排名", 
    href: "/rankings", 
    icon: Trophy,
    color: "text-yellow-600"
  },
];

export default function Navbar() {
  const { user, loading, logout } = useAuth();
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    window.location.href = "/";
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo with Bee 仔 */}
        <Link href="/">
          <div className="flex items-center gap-2 cursor-pointer">
            <img 
              src="/beejai-logo.png" 
              alt="BeeJAI Logo" 
              className="h-10 w-auto"
            />
            <div className="hidden sm:flex items-baseline gap-1.5">
              <span className="font-light text-lg tracking-wide">
                Bee<span className="text-primary font-medium">JAI</span>
              </span>
              <span className="text-sm text-muted-foreground font-light">Bee仔</span>
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <Button 
                variant="ghost" 
                size="sm"
                className={cn(
                  "gap-2 font-light",
                  location.includes(item.href.split("?")[0]) && "bg-accent"
                )}
              >
                <item.icon className={cn("h-4 w-4", item.color)} />
                {item.label}
              </Button>
            </Link>
          ))}
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-2">
          {/* Search Button */}
          <Link href="/search">
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
            </Button>
          </Link>

          {/* User Menu */}
          {loading ? (
            <div className="w-8 h-8 rounded-full bg-muted animate-pulse" />
          ) : user ? (
            <>
              {/* Notifications */}
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
              </Button>

              {/* User Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <User className="h-4 w-4 text-primary" />
                    </div>
                    <span className="hidden md:block max-w-[100px] truncate font-light">
                      {user.name || "用戶"}
                    </span>
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-medium">{user.name || "用戶"}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <Link href="/dashboard">
                    <DropdownMenuItem className="cursor-pointer">
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      儀表板
                    </DropdownMenuItem>
                  </Link>
                  <Link href="/favorites">
                    <DropdownMenuItem className="cursor-pointer">
                      <Heart className="mr-2 h-4 w-4" />
                      心儀學校
                    </DropdownMenuItem>
                  </Link>
                  <Link href="/settings">
                    <DropdownMenuItem className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      設定
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    className="cursor-pointer text-destructive"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    登出
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Button asChild className="font-light">
              <a href={getLoginUrl()}>登入</a>
            </Button>
          )}

          {/* Mobile Menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px]">
              <div className="flex flex-col gap-4 mt-8">
                <div className="flex items-center gap-2 mb-4">
                  <img 
                    src="/beejai-logo.png" 
                    alt="BeeJAI Logo" 
                    className="h-12 w-auto"
                  />
                  <div className="flex flex-col leading-tight">
                    <span className="font-light text-xl tracking-wide">
                      Bee<span className="text-primary font-medium">JAI</span>
                    </span>
                    <span className="text-xs text-muted-foreground font-light">Bee 仔</span>
                  </div>
                </div>
                
                <nav className="flex flex-col gap-1">
                  {navItems.map((item) => (
                    <Link key={item.href} href={item.href}>
                      <Button 
                        variant="ghost" 
                        className="w-full justify-start gap-3 font-light"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <item.icon className={cn("h-5 w-5", item.color)} />
                        {item.label}
                      </Button>
                    </Link>
                  ))}
                </nav>

                {user && (
                  <>
                    <div className="border-t pt-4 mt-4">
                      <p className="text-sm font-medium mb-3">我的帳戶</p>
                      <nav className="flex flex-col gap-1">
                        <Link href="/dashboard">
                          <Button 
                            variant="ghost" 
                            className="w-full justify-start gap-3 font-light"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            <LayoutDashboard className="h-5 w-5" />
                            儀表板
                          </Button>
                        </Link>
                        <Link href="/favorites">
                          <Button 
                            variant="ghost" 
                            className="w-full justify-start gap-3 font-light"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            <Heart className="h-5 w-5" />
                            心儀學校
                          </Button>
                        </Link>
                        <Link href="/settings">
                          <Button 
                            variant="ghost" 
                            className="w-full justify-start gap-3 font-light"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            <Settings className="h-5 w-5" />
                            設定
                          </Button>
                        </Link>
                      </nav>
                    </div>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
