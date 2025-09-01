import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { 
  LayoutDashboard, 
  Menu, 
  FolderOpen, 
  ShoppingCart, 
  Settings, 
  BarChart3, 
  Users,
  Utensils,
  DollarSign,
  TrendingUp
} from "lucide-react";

interface AdminPanelProps {
  onLogout?: () => void;
}

export function AdminPanel({ onLogout }: AdminPanelProps = {}) {
  const [activeSection, setActiveSection] = useState("dashboard");

  const menuItems = [
    { id: "dashboard", label: "داشبورد", icon: LayoutDashboard },
    { id: "menu", label: "آیتم‌های منو", icon: Menu },
    { id: "categories", label: "دسته‌بندی‌ها", icon: FolderOpen },
    { id: "orders", label: "سفارشات", icon: ShoppingCart },
    { id: "analytics", label: "تحلیل‌ها", icon: BarChart3 },
    { id: "customers", label: "مشتریان", icon: Users },
    { id: "settings", label: "تنظیمات", icon: Settings },
  ];

  const stats = [
    {
      title: "کل درآمد",
      value: "۱۲,۳۴۵,۰۰۰ تومان",
      change: "+12.5%",
      icon: DollarSign,
      positive: true,
    },
    {
      title: "سفارشات امروز",
      value: "84",
      change: "+5.2%",
      icon: ShoppingCart,
      positive: true,
    },
    {
      title: "مشتریان فعال",
      value: "1,234",
      change: "+8.1%",
      icon: Users,
      positive: true,
    },
    {
      title: "میانگین سفارش",
      value: "۳۲۵,۰۰۰ تومان",
      change: "-2.1%",
      icon: TrendingUp,
      positive: false,
    },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return (
          <div className="p-6 space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">داشبورد</h2>
              <p className="text-muted-foreground">خوش آمدید! این یک نمای کلی از رستوران شماست.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <Card key={index}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        {stat.title}
                      </CardTitle>
                      <Icon className="w-4 h-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                      <p className={`text-xs ${stat.positive ? 'text-green-600' : 'text-red-600'}`}>
                        {stat.change} نسبت به ماه گذشته
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Welcome Banner */}
            <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                    <Utensils className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground">به Menuza خوش آمدید!</h3>
                    <p className="text-muted-foreground">سیستم مدیریت رستوران شما آماده است. با تنظیم آیتم‌های منو شروع کنید.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>اقدامات سریع</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button 
                    className="bg-primary hover:bg-primary/90"
                    onClick={() => setActiveSection("menu")}
                  >
                    <Menu className="w-4 h-4 mr-2" />
                    مدیریت منو
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => setActiveSection("orders")}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    مشاهده سفارشات
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => setActiveSection("analytics")}
                  >
                    <BarChart3 className="w-4 h-4 mr-2" />
                    تحلیل‌ها
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      case "menu":
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-foreground mb-4">آیتم‌های منو</h2>
            <p className="text-muted-foreground mb-4">آیتم‌های منوی رستوران خود را مدیریت کنید</p>
            <Card>
              <CardContent className="p-6">
                <div className="text-center py-12">
                  <Menu className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">مدیریت منو</h3>
                  <p className="text-muted-foreground mb-4">این بخش به زودی در دسترس خواهد بود</p>
                  <Button className="bg-primary hover:bg-primary/90">
                    افزودن آیتم منو
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      case "orders":
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-foreground mb-4">سفارشات</h2>
            <p className="text-muted-foreground mb-4">سفارشات مشتریان را پیگیری و مدیریت کنید</p>
            <Card>
              <CardContent className="p-6">
                <div className="text-center py-12">
                  <ShoppingCart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">مدیریت سفارشات</h3>
                  <p className="text-muted-foreground mb-4">این بخش به زودی در دسترس خواهد بود</p>
                  <Button className="bg-primary hover:bg-primary/90">
                    مشاهده سفارشات فعال
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      case "analytics":
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-foreground mb-4">تحلیل‌ها</h2>
            <p className="text-muted-foreground mb-4">آمار و تحلیل‌های فروش رستوران</p>
            <Card>
              <CardContent className="p-6">
                <div className="text-center py-12">
                  <BarChart3 className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">آنالیتیکس پیشرفته</h3>
                  <p className="text-muted-foreground mb-4">گزارش‌های دقیق به زودی در دسترس خواهد بود</p>
                  <Button className="bg-primary hover:bg-primary/90">
                    مشاهده گزارش‌ها
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      case "customers":
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-foreground mb-4">مشتریان</h2>
            <p className="text-muted-foreground mb-4">اطلاعات و مدیریت مشتریان</p>
            <Card>
              <CardContent className="p-6">
                <div className="text-center py-12">
                  <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">مدیریت مشتریان</h3>
                  <p className="text-muted-foreground mb-4">این بخش به زودی در دسترس خواهد بود</p>
                  <Button className="bg-primary hover:bg-primary/90">
                    مشاهده لیست مشتریان
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      case "settings":
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-foreground mb-4">تنظیمات</h2>
            <p className="text-muted-foreground mb-4">تنظیمات عمومی رستوران</p>
            <Card>
              <CardContent className="p-6">
                <div className="text-center py-12">
                  <Settings className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">تنظیمات سیستم</h3>
                  <p className="text-muted-foreground mb-4">پنل تنظیمات به زودی در دسترس خواهد بود</p>
                  <Button className="bg-primary hover:bg-primary/90">
                    ویرایش تنظیمات
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      default:
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-foreground mb-4">{activeSection}</h2>
            <p className="text-muted-foreground">این بخش به زودی در دسترس خواهد بود...</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Utensils className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">Menuza</span>
            </div>
            <span className="text-sm text-muted-foreground">پنل مدیریت رستوران</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              مشاهده منوی زنده
            </Button>
            {onLogout && (
              <Button variant="ghost" size="sm" onClick={onLogout}>
                خروج
              </Button>
            )}
            <Button variant="ghost" size="icon" title="Profile">
              <Users className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-sidebar border-r border-sidebar-border">
          <div className="p-6">
            <nav className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                
                return (
                  <Button
                    key={item.id}
                    variant={isActive ? "default" : "ghost"}
                    className={`w-full justify-start ${
                      isActive 
                        ? "bg-primary text-primary-foreground hover:bg-primary/90" 
                        : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    }`}
                    onClick={() => setActiveSection(item.id)}
                  >
                    <Icon className="w-4 h-4 mr-3" />
                    {item.label}
                  </Button>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}