import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { 
  Menu, 
  Smartphone, 
  BarChart3, 
  Clock, 
  Star, 
  Check, 
  ArrowRight,
  Utensils,
  Users,
  TrendingUp
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface LandingPageProps {
  onGetStarted: () => void;
  onSignIn: () => void;
}

export function LandingPage({ onGetStarted, onSignIn }: LandingPageProps) {
  const features = [
    {
      icon: Menu,
      title: "مدیریت منوی دیجیتال",
      description: "منوهای زیبا و تعاملی ایجاد کنید که مشتریان فوراً به آن دسترسی داشته باشند"
    },
    {
      icon: Smartphone,
      title: "سفارش با کد QR",
      description: "مشتریان اسکن کرده، مرور و مستقیماً از تلفن خود سفارش می‌دهند - بدون نیاز به اپ"
    },
    {
      icon: BarChart3,
      title: "تحلیل زمان واقعی",
      description: "محبوب‌ترین غذاها، ساعات شلوغی و ترجیحات مشتریان را با بینش‌های دقیق پیگیری کنید"
    },
    {
      icon: Clock,
      title: "مدیریت سفارشات",
      description: "عملیات آشپزخانه را با پیگیری منظم سفارشات و زمان‌بندی ساده کنید"
    }
  ];

  const benefits = [
    "کاهش 100% هزینه چاپ",
    "افزایش دقت سفارشات",
    "تعویض سریع‌تر میزها",
    "تجربه بهتر مشتری",
    "به‌روزرسانی منو در زمان واقعی",
    "پشتیبانی چند زبانه"
  ];

  const testimonials = [
    {
      name: "احمد کریمی",
      restaurant: "رستوران سنتی کریمی",
      text: "Menuza فرآیند سفارش‌گیری ما را متحول کرد. مشتریان تجربه دیجیتال را دوست دارند و ما 30% سرعت بیشتر در سرویس داریم.",
      rating: 5
    },
    {
      name: "سارا احمدی",
      restaurant: "کافه باغ سبز",
      text: "تحلیل‌ها به ما کمک می‌کند مشتریان را بهتر بشناسیم. منو خود را بر اساس داده‌ها بهینه کرده‌ایم.",
      rating: 5
    },
    {
      name: "علی رضایی",
      restaurant: "رستوران ادویه",
      text: "راه‌اندازی فوق‌العاده آسان بود. کارکنانمان سریع عادت کردند و مشتریان سفارش بدون تماس را قدردانی می‌کنند.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Utensils className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">Menuza</span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-muted-foreground hover:text-foreground">ویژگی‌ها</a>
              <a href="#pricing" className="text-muted-foreground hover:text-foreground">قیمت‌ها</a>
              <a href="#testimonials" className="text-muted-foreground hover:text-foreground">نظرات</a>
              <Button variant="outline" onClick={onSignIn}>ورود</Button>
              <Button className="bg-primary hover:bg-primary/90" onClick={onGetStarted}>
                شروع
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-background to-muted">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-primary/10 text-primary border-primary/20">
                  انقلاب منوی دیجیتال
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                  رستوران خود را با{" "}
                  <span className="text-primary">منوهای دیجیتال</span>{" "}
                  متحول کنید
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  منوهای زیبا و تعاملی ایجاد کنید که فروش را افزایش، هزینه‌ها را کاهش 
                  و مشتریان را خوشحال می‌کند. به هزاران رستورانی بپیوندید که از Menuza استفاده می‌کنند.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                  onClick={onGetStarted}
                >
                  شروع آزمایش رایگان
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button size="lg" variant="outline">
                  مشاهده دمو
                </Button>
              </div>
              <div className="flex items-center space-x-8 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-primary" />
                  <span>بدون هزینه نصب</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-primary" />
                  <span>14 روز آزمایش رایگان</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-primary" />
                  <span>لغو در هر زمان</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1715249792897-88afab4194e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxyZXN0YXVyYW50JTIwZGlnaXRhbCUyMHRhYmxldHxlbnwxfHx8fDE3NTY3MjYyMjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Restaurant Digital Tablet"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <h3 className="text-2xl font-bold mb-2">انقلاب منوی دیجیتال</h3>
                <p className="text-white/90">تجربه رستوران خود را متحول کنید</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              همه چیزی که برای مدرن کردن رستوران نیاز دارید
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              از منوهای دیجیتال تا مدیریت سفارشات، Menuza تمام ابزارهای لازم 
              برای ساده‌سازی عملیات رستوران و بهبود تجربه مشتری را فراهم می‌کند.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-8">
                چرا رستوران‌ها Menuza را انتخاب می‌کنند
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-secondary/20 to-primary/20">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1698653223689-24b0bfd5150b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxyZXN0YXVyYW50JTIwY2hlZiUyMGNvb2tpbmd8ZW58MXx8fHwxNzU2NzIxNTExfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Restaurant Chef Cooking"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <h3 className="text-xl font-bold mb-2">رستوران مدرن</h3>
                <p className="text-white/90">تجربه غذاخوری پیشرفته</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              محبوب صاحبان رستوران
            </h2>
            <p className="text-xl text-muted-foreground">
              ببینید صاحبان رستوران درباره Menuza چه می‌گویند
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center space-x-1 mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground italic">"{testimonial.text}"</p>
                </CardHeader>
                <CardContent>
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.restaurant}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary-foreground">
              آماده تحول رستوران خود هستید؟
            </h2>
            <p className="text-xl text-primary-foreground/90">
              به هزاران رستورانی بپیوندید که از Menuza برای ایجاد تجربه‌های غذاخوری بهتر استفاده می‌کنند. 
              آزمایش رایگان خود را امروز شروع کنید - بدون نیاز به کارت اعتباری.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="secondary"
                className="bg-white text-primary hover:bg-white/90"
                onClick={onGetStarted}
              >
                شروع آزمایش رایگان
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              >
                تماس با فروش
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t bg-card">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Utensils className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">Menuza</span>
            </div>
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground">سیاست حریم خصوصی</a>
              <a href="#" className="hover:text-foreground">شرایط خدمات</a>
              <a href="#" className="hover:text-foreground">پشتیبانی</a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            © 2024 Menuza. تمام حقوق محفوظ است. توانمندسازی رستوران‌ها با راه‌حل‌های دیجیتال.
          </div>
        </div>
      </footer>
    </div>
  );
}