import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Clock, User, MapPin, Phone } from "lucide-react";

interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  customerAddress?: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  status: "pending" | "preparing" | "ready" | "delivered" | "cancelled";
  orderType: "dine-in" | "takeaway" | "delivery";
  createdAt: Date;
  estimatedTime?: number; // minutes
}

export function Orders() {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "ORD-001",
      customerName: "John Doe",
      customerPhone: "+1234567890",
      customerAddress: "123 Main St, City",
      items: [
        { name: "Classic Burger", quantity: 2, price: 12.99 },
        { name: "Fries", quantity: 2, price: 4.99 },
      ],
      total: 35.96,
      status: "preparing",
      orderType: "delivery",
      createdAt: new Date(Date.now() - 15 * 60 * 1000),
      estimatedTime: 25,
    },
    {
      id: "ORD-002",
      customerName: "Jane Smith",
      customerPhone: "+1987654321",
      items: [
        { name: "Margherita Pizza", quantity: 1, price: 16.50 },
        { name: "Caesar Salad", quantity: 1, price: 9.99 },
      ],
      total: 26.49,
      status: "pending",
      orderType: "takeaway",
      createdAt: new Date(Date.now() - 5 * 60 * 1000),
      estimatedTime: 20,
    },
    {
      id: "ORD-003",
      customerName: "Mike Johnson",
      customerPhone: "+1122334455",
      items: [
        { name: "Fish & Chips", quantity: 1, price: 22.75 },
      ],
      total: 22.75,
      status: "ready",
      orderType: "dine-in",
      createdAt: new Date(Date.now() - 30 * 60 * 1000),
    },
  ]);

  const [filterStatus, setFilterStatus] = useState<string>("all");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "preparing": return "bg-blue-100 text-blue-800";
      case "ready": return "bg-green-100 text-green-800";
      case "delivered": return "bg-gray-100 text-gray-800";
      case "cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getOrderTypeColor = (type: string) => {
    switch (type) {
      case "dine-in": return "bg-purple-100 text-purple-800";
      case "takeaway": return "bg-orange-100 text-orange-800";
      case "delivery": return "bg-indigo-100 text-indigo-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const updateOrderStatus = (orderId: string, newStatus: Order["status"]) => {
    setOrders(orders => orders.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const filteredOrders = filterStatus === "all" 
    ? orders 
    : orders.filter(order => order.status === filterStatus);

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) {
      return "Just now";
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInMinutes < 1440) { // Less than 24 hours
      return `${Math.floor(diffInMinutes / 60)}h ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)}d ago`;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Orders</h2>
          <p className="text-muted-foreground">Track and manage customer orders</p>
        </div>
        
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Orders</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="preparing">Preparing</SelectItem>
            <SelectItem value="ready">Ready</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredOrders.map((order) => (
          <Card key={order.id} className="overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{order.id}</CardTitle>
                  <div className="flex items-center space-x-2 mt-2">
                    <Badge className={getStatusColor(order.status)}>
                      {order.status}
                    </Badge>
                    <Badge variant="outline" className={getOrderTypeColor(order.orderType)}>
                      {order.orderType}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="w-4 h-4 mr-1" />
                  {formatTime(order.createdAt)}
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Customer Info */}
              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <User className="w-4 h-4 mr-2 text-muted-foreground" />
                  <span className="font-medium">{order.customerName}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Phone className="w-4 h-4 mr-2 text-muted-foreground" />
                  <span className="text-muted-foreground">{order.customerPhone}</span>
                </div>
                {order.customerAddress && (
                  <div className="flex items-center text-sm">
                    <MapPin className="w-4 h-4 mr-2 text-muted-foreground" />
                    <span className="text-muted-foreground">{order.customerAddress}</span>
                  </div>
                )}
              </div>

              {/* Order Items */}
              <div className="border-t pt-3">
                <h4 className="font-medium mb-2">Items:</h4>
                <div className="space-y-1">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span>{item.quantity}x {item.name}</span>
                      <span className="font-medium">${(item.quantity * item.price).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t mt-2 pt-2 flex justify-between font-semibold">
                  <span>Total:</span>
                  <span>${order.total.toFixed(2)}</span>
                </div>
              </div>

              {/* Estimated Time */}
              {order.estimatedTime && order.status !== "delivered" && order.status !== "cancelled" && (
                <div className="bg-muted p-3 rounded-lg">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Est. completion:</span>
                    <span className="font-medium">{order.estimatedTime} mins</span>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex space-x-2">
                {order.status === "pending" && (
                  <Button 
                    size="sm" 
                    className="flex-1 bg-primary hover:bg-primary/90"
                    onClick={() => updateOrderStatus(order.id, "preparing")}
                  >
                    Start Preparing
                  </Button>
                )}
                {order.status === "preparing" && (
                  <Button 
                    size="sm" 
                    className="flex-1"
                    onClick={() => updateOrderStatus(order.id, "ready")}
                  >
                    Mark Ready
                  </Button>
                )}
                {order.status === "ready" && order.orderType !== "dine-in" && (
                  <Button 
                    size="sm" 
                    className="flex-1"
                    onClick={() => updateOrderStatus(order.id, "delivered")}
                  >
                    Mark Delivered
                  </Button>
                )}
                {(order.status === "pending" || order.status === "preparing") && (
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => updateOrderStatus(order.id, "cancelled")}
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}