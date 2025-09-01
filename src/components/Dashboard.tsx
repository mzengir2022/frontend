import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { DollarSign, ShoppingCart, Users, TrendingUp } from "lucide-react";

export function Dashboard() {
  const stats = [
    {
      title: "Total Revenue",
      value: "$12,345",
      change: "+12.5%",
      icon: DollarSign,
      positive: true,
    },
    {
      title: "Orders Today",
      value: "84",
      change: "+5.2%",
      icon: ShoppingCart,
      positive: true,
    },
    {
      title: "Active Customers",
      value: "1,234",
      change: "+8.1%",
      icon: Users,
      positive: true,
    },
    {
      title: "Average Order",
      value: "$32.50",
      change: "-2.1%",
      icon: TrendingUp,
      positive: false,
    },
  ];

  const recentOrders = [
    { id: "#001", customer: "John Doe", items: "Burger, Fries", total: "$24.99", status: "completed" },
    { id: "#002", customer: "Jane Smith", items: "Pizza Margherita", total: "$18.50", status: "preparing" },
    { id: "#003", customer: "Mike Johnson", items: "Pasta, Salad", total: "$31.25", status: "pending" },
    { id: "#004", customer: "Sarah Wilson", items: "Fish & Chips", total: "$22.75", status: "completed" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "text-green-600 bg-green-100";
      case "preparing": return "text-orange-600 bg-orange-100";
      case "pending": return "text-yellow-600 bg-yellow-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Dashboard</h2>
        <p className="text-muted-foreground">Welcome back! Here's your restaurant overview.</p>
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
                  {stat.change} from last month
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Orders */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div>
                    <p className="font-medium text-foreground">{order.id}</p>
                    <p className="text-sm text-muted-foreground">{order.customer}</p>
                  </div>
                  <div>
                    <p className="text-sm text-foreground">{order.items}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="font-semibold text-foreground">{order.total}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}