import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, RefreshCw, ArrowRight, Sparkles } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
const generateCaptcha = () => {
  const num1 = Math.floor(Math.random() * 10) + 1;
  const num2 = Math.floor(Math.random() * 10) + 1;
  return { num1, num2, answer: num1 + num2 };
};

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [captcha, setCaptcha] = useState(generateCaptcha());
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const refreshCaptcha = () => {
    setCaptcha(generateCaptcha());
    setCaptchaInput("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    if (parseInt(captchaInput) !== captcha.answer) {
      setError("Incorrect captcha answer");
      refreshCaptcha();
      return;
    }

    setIsLoading(true);
    // Simulate login delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // Navigate to chat page
    navigate("/chat", { replace: true });
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-mesh relative overflow-hidden">
      <ThemeToggle />
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-primary/10 blur-3xl animate-float" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-accent/10 blur-3xl animate-float" style={{ animationDelay: "-3s" }} />
        <div className="absolute top-1/2 left-1/4 w-64 h-64 rounded-full bg-primary/5 blur-2xl" />
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md mx-4 animate-scale-in">
        <div className="glass-strong rounded-2xl p-8 shadow-xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-hero mb-4 shadow-lg animate-glow-pulse">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Welcome Back
            </h1>
            <p className="text-muted-foreground">
              Sign in to access Knowledge Assistant
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-foreground">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-11 h-12 bg-secondary/50 border-border/50 focus:border-primary focus:ring-primary/20 transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-foreground">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-11 h-12 bg-secondary/50 border-border/50 focus:border-primary focus:ring-primary/20 transition-all"
                />
              </div>
            </div>

            {/* Captcha */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">
                Security Check
              </Label>
              <div className="flex items-center gap-3">
                <div className="flex-1 flex items-center gap-2 h-12 px-4 rounded-lg bg-gradient-hero text-white font-bold text-lg">
                  <span>{captcha.num1}</span>
                  <span>+</span>
                  <span>{captcha.num2}</span>
                  <span>=</span>
                  <span className="text-white/60">?</span>
                </div>
                <button
                  type="button"
                  onClick={refreshCaptcha}
                  className="h-12 w-12 flex items-center justify-center rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
                >
                  <RefreshCw className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>
               <Input
                 type="text"
                 inputMode="numeric"
                 placeholder="Enter the answer"
                 value={captchaInput}
                 onChange={(e) => setCaptchaInput(e.target.value)}
                 className="h-12 bg-secondary/50 border-border/50 focus:border-primary focus:ring-primary/20 transition-all"
               />
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm text-center animate-fade-in">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-gradient-hero hover:opacity-90 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              {isLoading ? (
                <RefreshCw className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Protected by advanced security
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
