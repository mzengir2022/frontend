import { 
  LayoutDashboard, 
  Menu, 
  FolderOpen, 
  ShoppingCart, 
  Settings, 
  BarChart3, 
  Users 
} from "lucide-react";
import { Button } from "./ui/button";

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "menu", label: "Menu Items", icon: Menu },
    { id: "categories", label: "Categories", icon: FolderOpen },
    { id: "orders", label: "Orders", icon: ShoppingCart },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "customers", label: "Customers", icon: Users },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border">
      <div className="p-6">
        <div className="flex items-center space-x-2 mb-8">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Menu className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-sidebar-foreground font-semibold">Menuza Panel</span>
        </div>
        
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
                onClick={() => onSectionChange(item.id)}
              >
                <Icon className="w-4 h-4 mr-3" />
                {item.label}
              </Button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}