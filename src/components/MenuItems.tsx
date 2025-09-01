import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Plus, Edit, Trash2, ImageIcon } from "lucide-react";
import { Badge } from "./ui/badge";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  available: boolean;
}

export function MenuItems() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    {
      id: "1",
      name: "Classic Burger",
      description: "Juicy beef patty with lettuce, tomato, and special sauce",
      price: 12.99,
      category: "Burgers",
      available: true,
    },
    {
      id: "2",
      name: "Margherita Pizza",
      description: "Fresh mozzarella, tomato sauce, and basil",
      price: 16.50,
      category: "Pizza",
      available: true,
    },
    {
      id: "3",
      name: "Caesar Salad",
      description: "Crisp romaine lettuce with parmesan and croutons",
      price: 9.99,
      category: "Salads",
      available: false,
    },
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
  });

  const categories = ["Burgers", "Pizza", "Salads", "Appetizers", "Desserts", "Beverages"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newItem: MenuItem = {
      id: editingItem ? editingItem.id : Date.now().toString(),
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      category: formData.category,
      available: true,
    };

    if (editingItem) {
      setMenuItems(items => items.map(item => 
        item.id === editingItem.id ? newItem : item
      ));
    } else {
      setMenuItems(items => [...items, newItem]);
    }

    setFormData({ name: "", description: "", price: "", category: "" });
    setEditingItem(null);
    setIsAddDialogOpen(false);
  };

  const handleEdit = (item: MenuItem) => {
    setFormData({
      name: item.name,
      description: item.description,
      price: item.price.toString(),
      category: item.category,
    });
    setEditingItem(item);
    setIsAddDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setMenuItems(items => items.filter(item => item.id !== id));
  };

  const toggleAvailability = (id: string) => {
    setMenuItems(items => items.map(item =>
      item.id === id ? { ...item, available: !item.available } : item
    ));
  };

  const resetForm = () => {
    setFormData({ name: "", description: "", price: "", category: "" });
    setEditingItem(null);
  };

  const handleDialogOpenChange = (open: boolean) => {
    setIsAddDialogOpen(open);
    if (!open) {
      resetForm();
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Menu Items</h2>
          <p className="text-muted-foreground">Manage your restaurant's menu items</p>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={handleDialogOpenChange}>
          <DialogTrigger asChild>
            <Button 
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
              onClick={resetForm}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Menu Item
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingItem ? "Edit Menu Item" : "Add New Menu Item"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="price">Price ($)</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="category">Category</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex space-x-2 pt-4">
                <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90">
                  {editingItem ? "Update Item" : "Add Item"}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => handleDialogOpenChange(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuItems.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{item.name}</CardTitle>
                  <Badge variant={item.available ? "default" : "secondary"} className="mt-2">
                    {item.available ? "Available" : "Unavailable"}
                  </Badge>
                </div>
                <div className="flex space-x-1">
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(item)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                <ImageIcon className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground">{item.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-foreground">${item.price}</span>
                <Badge variant="outline">{item.category}</Badge>
              </div>
              <Button
                variant={item.available ? "outline" : "default"}
                size="sm"
                className="w-full"
                onClick={() => toggleAvailability(item.id)}
              >
                {item.available ? "Mark Unavailable" : "Mark Available"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}