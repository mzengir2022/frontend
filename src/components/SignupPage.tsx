import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { ArrowLeft, Utensils, Users, MapPin, Phone, Mail, Building, Eye, EyeOff, Lock, Loader2 } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { signUp } from "../services/api";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

interface SignupPageProps {
  onBack: () => void;
  onSignup: () => void;
  onSwitchToLogin: () => void;
}

export function SignupPage({ onBack, onSignup, onSwitchToLogin }: SignupPageProps) {
  const [formData, setFormData] = useState({
    // Restaurant Info
    restaurantName: "",
    restaurantType: "",
    address: "",
    city: "",
    zipCode: "",
    phone: "",
    // Owner Info
    ownerName: "",
    email: "",
    password: "",
    confirmPassword: "",
    // Agreement
    agreeToTerms: false,
    agreeToMarketing: false
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const restaurantTypes = [
    "رستوران سنتی",
    "فست فود",
    "کافه",
    "پیتزا",
    "برگر",
    "غذای آسیایی",
    "غذای ایتالیایی",
    "قنادی",
    "فود ترک",
    "بار",
    "سایر"
  ];

  const validateStep1 = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.restaurantName.trim()) {
      newErrors.restaurantName = "نام رستوران الزامی است";
    }
    if (!formData.restaurantType) {
      newErrors.restaurantType = "لطفا نوع رستوران را انتخاب کنید";
    }
    if (!formData.address.trim()) {
      newErrors.address = "آدرس الزامی است";
    }
    if (!formData.city.trim()) {
      newErrors.city = "شهر الزامی است";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "شماره تلفن الزامی است";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.ownerName.trim()) {
      newErrors.ownerName = "نام شما الزامی است";
    }
    if (!formData.email.trim()) {
      newErrors.email = "ایمیل الزامی است";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "لطفا ایمیل معتبر وارد کنید";
    }
    if (!formData.password) {
      newErrors.password = "رمز عبور الزامی است";
    } else if (formData.password.length < 8) {
      newErrors.password = "رمز عبور باید حداقل 8 کاراکتر باشد";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "رمز عبور و تکرار آن مطابقت ندارد";
    }
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "باید شرایط و قوانین را بپذیرید";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
    } else if (currentStep === 2 && validateStep2()) {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    if (!validateStep2()) return;

    setIsLoading(true);
    setApiError(null);

    try {
      const response = await signUp(formData);
      if (response.token) {
        localStorage.setItem('authToken', response.token);
      }
      alert(`خوش آمدید، ${formData.ownerName}! حساب کاربری شما برای ${formData.restaurantName} با موفقیت ایجاد شد.`);
      onSignup();
    } catch (err: any) {
      setApiError(err.response?.data?.message || "An unexpected error occurred during sign up.");
    } finally {
      setIsLoading(false);
    }
  };

  const updateFormData = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setApiError(null);
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" onClick={onBack}>
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Utensils className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold text-foreground">Menuza</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">مرحله {currentStep} از 2</span>
              <Button variant="link" onClick={onSwitchToLogin} className="text-primary">
                قبلاً حساب دارید؟ ورود
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Side - Form */}
            <div className="space-y-8">
              <div className="text-center lg:text-left">
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  {currentStep === 1 ? "درباره رستوران خود بگویید" : "حساب کاربری ایجاد کنید"}
                </h1>
                <p className="text-muted-foreground">
                  {currentStep === 1 
                    ? "Menuza را برای نیازهای رستوران شما سفارشی کنیم"
                    : "تقریباً آماده تبدیل تجربه رستوران خود هستید"
                  }
                </p>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    {currentStep === 1 ? (
                      <>
                        <Building className="w-5 h-5 text-primary" />
                        <span>اطلاعات رستوران</span>
                      </>
                    ) : (
                      <>
                        <Users className="w-5 h-5 text-primary" />
                        <span>جزئیات حساب کاربری</span>
                      </>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {currentStep === 1 ? (
                    <>
                      {/* Step 1 Form Fields... (unchanged, but should be disabled when isLoading) */}
                      <div className="space-y-2">
                        <Label htmlFor="restaurantName">نام رستوران *</Label>
                        <Input
                          id="restaurantName"
                          placeholder="مثل: رستوران سنتی ایرانی"
                          value={formData.restaurantName}
                          onChange={(e) => updateFormData("restaurantName", e.target.value)}
                          className={errors.restaurantName ? "border-destructive" : ""}
                          disabled={isLoading}
                        />
                        {errors.restaurantName && (
                          <p className="text-sm text-destructive">{errors.restaurantName}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="restaurantType">نوع رستوران *</Label>
                        <Select
                          value={formData.restaurantType}
                          onValueChange={(value) => updateFormData("restaurantType", value)}
                          disabled={isLoading}
                        >
                          <SelectTrigger className={errors.restaurantType ? "border-destructive" : ""}>
                            <SelectValue placeholder="نوع رستوران خود را انتخاب کنید" />
                          </SelectTrigger>
                          <SelectContent>
                            {restaurantTypes.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.restaurantType && (
                          <p className="text-sm text-destructive">{errors.restaurantType}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="address">آدرس *</Label>
                        <Input
                          id="address"
                          placeholder="خیابان اصلی، پلاک 123"
                          value={formData.address}
                          onChange={(e) => updateFormData("address", e.target.value)}
                          className={errors.address ? "border-destructive" : ""}
                          disabled={isLoading}
                        />
                        {errors.address && (
                          <p className="text-sm text-destructive">{errors.address}</p>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="city">شهر *</Label>
                          <Input
                            id="city"
                            placeholder="تهران"
                            value={formData.city}
                            onChange={(e) => updateFormData("city", e.target.value)}
                            className={errors.city ? "border-destructive" : ""}
                            disabled={isLoading}
                          />
                          {errors.city && (
                            <p className="text-sm text-destructive">{errors.city}</p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="zipCode">کد پستی</Label>
                          <Input
                            id="zipCode"
                            placeholder="1234567890"
                            value={formData.zipCode}
                            onChange={(e) => updateFormData("zipCode", e.target.value)}
                            disabled={isLoading}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">شماره تلفن *</Label>
                        <Input
                          id="phone"
                          placeholder="09123456789"
                          value={formData.phone}
                          onChange={(e) => updateFormData("phone", e.target.value)}
                          className={errors.phone ? "border-destructive" : ""}
                          disabled={isLoading}
                        />
                        {errors.phone && (
                          <p className="text-sm text-destructive">{errors.phone}</p>
                        )}
                      </div>
                    </>
                  ) : (
                    <>
                      {apiError && (
                        <Alert variant="destructive">
                          <AlertTitle>Error</AlertTitle>
                          <AlertDescription>{apiError}</AlertDescription>
                        </Alert>
                      )}
                      <div className="space-y-2">
                        <Label htmlFor="ownerName">نام و نام خانوادگی *</Label>
                        <Input
                          id="ownerName"
                          placeholder="احمد محمدی"
                          value={formData.ownerName}
                          onChange={(e) => updateFormData("ownerName", e.target.value)}
                          className={errors.ownerName ? "border-destructive" : ""}
                          disabled={isLoading}
                        />
                        {errors.ownerName && (
                          <p className="text-sm text-destructive">{errors.ownerName}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">آدرس ایمیل *</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                          <Input
                            id="email"
                            type="email"
                            placeholder="ahmad@restaurant.com"
                            value={formData.email}
                            onChange={(e) => updateFormData("email", e.target.value)}
                            className={`pl-10 ${errors.email ? "border-destructive" : ""}`}
                            disabled={isLoading}
                          />
                        </div>
                        {errors.email && (
                          <p className="text-sm text-destructive">{errors.email}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="password">رمز عبور *</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                          <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="حداقل 8 کاراکتر"
                            value={formData.password}
                            onChange={(e) => updateFormData("password", e.target.value)}
                            className={`pl-10 pr-10 ${errors.password ? "border-destructive" : ""}`}
                            disabled={isLoading}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowPassword(!showPassword)}
                            disabled={isLoading}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4 text-muted-foreground" />
                            ) : (
                              <Eye className="h-4 w-4 text-muted-foreground" />
                            )}
                          </Button>
                        </div>
                        {errors.password && (
                          <p className="text-sm text-destructive">{errors.password}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">تکرار رمز عبور *</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                          <Input
                            id="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="رمز عبور را دوباره وارد کنید"
                            value={formData.confirmPassword}
                            onChange={(e) => updateFormData("confirmPassword", e.target.value)}
                            className={`pl-10 pr-10 ${errors.confirmPassword ? "border-destructive" : ""}`}
                            disabled={isLoading}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            disabled={isLoading}
                          >
                            {showConfirmPassword ? (
                              <EyeOff className="h-4 w-4 text-muted-foreground" />
                            ) : (
                              <Eye className="h-4 w-4 text-muted-foreground" />
                            )}
                          </Button>
                        </div>
                        {errors.confirmPassword && (
                          <p className="text-sm text-destructive">{errors.confirmPassword}</p>
                        )}
                      </div>

                      <div className="space-y-4 pt-4 border-t">
                        <div className="flex items-start space-x-2">
                          <Checkbox
                            id="agreeToTerms"
                            checked={formData.agreeToTerms}
                            onCheckedChange={(checked) => updateFormData("agreeToTerms", checked as boolean)}
                            disabled={isLoading}
                          />
                          <Label htmlFor="agreeToTerms" className="text-sm leading-relaxed">
                            با <a href="#" className="text-primary hover:underline">شرایط خدمات</a> و{" "}
                            <a href="#" className="text-primary hover:underline">سیاست حفظ حریم خصوصی</a> موافقم *
                          </Label>
                        </div>
                        {errors.agreeToTerms && (
                          <p className="text-sm text-destructive">{errors.agreeToTerms}</p>
                        )}

                        <div className="flex items-start space-x-2">
                          <Checkbox
                            id="agreeToMarketing"
                            checked={formData.agreeToMarketing}
                            onCheckedChange={(checked) => updateFormData("agreeToMarketing", checked as boolean)}
                            disabled={isLoading}
                          />
                          <Label htmlFor="agreeToMarketing" className="text-sm leading-relaxed">
                            دوست دارم نکات، به‌روزرسانی‌ها و پیشنهادات ویژه Menuza را دریافت کنم
                          </Label>
                        </div>
                      </div>
                    </>
                  )}

                  <div className="flex space-x-4 pt-6">
                    {currentStep === 2 && (
                      <Button 
                        variant="outline" 
                        onClick={() => setCurrentStep(1)}
                        className="flex-1"
                        disabled={isLoading}
                      >
                        بازگشت
                      </Button>
                    )}
                    <Button 
                      onClick={handleNextStep}
                      className="flex-1 bg-primary hover:bg-primary/90"
                      disabled={isLoading}
                    >
                      {isLoading && currentStep === 2 && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      {currentStep === 1 ? "ادامه" : "ایجاد حساب کاربری"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Side - Image & Benefits */}
            <div className="space-y-8">
              <div className="relative">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1604908177453-7462950a6a3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxmb29kJTIwbWVudSUyMGVsZWdhbnR8ZW58MXx8fHwxNzU2NzI2MjIyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Elegant Food Menu"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <h3 className="text-xl font-bold mb-2">بیش از 10,000+ رستوران</h3>
                  <p className="text-white/90">
                    از Menuza برای رشد کسب و کار خود استفاده می‌کنند
                  </p>
                </div>
              </div>

              <Card className="bg-muted/30">
                <CardHeader>
                  <CardTitle>آنچه با Menuza دریافت خواهید کرد:</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                      <MapPin className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">تولید کد QR</p>
                      <p className="text-sm text-muted-foreground">فوراً کد QR برای هر میز ایجاد کنید</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Utensils className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">سازنده منوی دیجیتال</p>
                      <p className="text-sm text-muted-foreground">ابزار ایجاد منو با کشیدن و رها کردن</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Phone className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">مدیریت سفارشات</p>
                      <p className="text-sm text-muted-foreground">پیگیری و اعلان‌های سفارش در زمان واقعی</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Mail className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">پشتیبانی 24/7</p>
                      <p className="text-sm text-muted-foreground">هر وقت نیاز داشتید کمک دریافت کنید</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}