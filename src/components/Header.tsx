import { Bell, User, Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export function Header() {
  return (
    <header className="bg-card border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-foreground">Menuza</h1>
          <span className="text-sm text-muted-foreground">Restaurant Panel</span>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input 
              placeholder="Search..." 
              className="pl-10 w-64"
            />
          </div>
          
          <Button variant="ghost" size="icon">
            <Bell className="w-5 h-5" />
          </Button>
          
          <Button variant="ghost" size="icon">
            <User className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}