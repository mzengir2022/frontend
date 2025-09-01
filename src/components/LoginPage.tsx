import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { ArrowLeft, Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface LoginPageProps {
  onBack: () => void;
  onLogin: () => void;
  onSwitchToSignup: () => void;
}

export function LoginPage({ onBack, onLogin, onSwitchToSignup }: LoginPageProps) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    // Here you would typically validate and send the data to your backend
    console.log("Login data:", formData);
    
    // Show success message
    alert(`خوش آمدید! ورود شما موفقیت‌آمیز بود.`);
    
    // Navigate to admin panel
    onLogin();
  };

  const isFormValid = formData.email && formData.password;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="hover:bg-muted"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              بازگشت
            </Button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold">M</span>
              </div>
              <span className="font-bold text-foreground">Menuza</span>
            </div>
            <div></div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Login Form */}
          <div className="max-w-md mx-auto w-full">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">
                ورود به پنل مدیریت
              </h1>
              <p className="text-muted-foreground">
                به سیستم مدیریت رستوران خود وارد شوید
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>ورود به حساب کاربری</CardTitle>
                <CardDescription>
                  اطلاعات حساب کاربری خود را وارد کنید
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email">ایمیل</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="ایمیل خود را وارد کنید"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">رمز عبور</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="رمز عبور خود را وارد کنید"
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      className="pl-10 pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                </div>

                <Button
                  onClick={handleSubmit}
                  disabled={!isFormValid}
                  className="w-full bg-primary hover:bg-primary/90"
                >
                  ورود به پنل
                </Button>

                <div className="text-center">
                  <span className="text-muted-foreground">حساب کاربری ندارید؟ </span>
                  <Button
                    variant="link"
                    onClick={onSwitchToSignup}
                    className="text-primary hover:text-primary/80 p-0"
                  >
                    ثبت نام کنید
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Side - Image */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1669131196140-49591336b13e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwbW9kZXJuJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzU2NzI2MjIyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Modern Restaurant Interior"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <h3 className="text-xl font-bold mb-2">مدیریت آسان رستوران</h3>
              <p className="text-white/90">
                با Menuza، مدیریت منو، سفارشات و تنظیمات رستوران خود را ساده کنید
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}