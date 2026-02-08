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
    <div className="min-h-screen w-full flex items-center justify-center bg-[hsl(222,47%,6%)] relative overflow-hidden">
      <ThemeToggle />
      {/* Background glow effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-80 h-[600px] rounded-full bg-[hsl(220,100%,50%)] blur-[120px] opacity-30" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-[600px] rounded-full bg-[hsl(30,100%,50%)] blur-[120px] opacity-40" />
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md mx-4 animate-scale-in">
        <div className="rounded-2xl p-8 bg-[hsl(222,30%,12%)] border border-[hsl(220,20%,20%)] shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-hero mb-4 shadow-lg">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Welcome Back
            </h1>
            <p className="text-[hsl(215,20%,55%)]">
              Sign in to access Knowledge Assistant
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-white">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[hsl(215,20%,45%)]" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-11 h-12 bg-[hsl(222,30%,16%)] border-[hsl(220,20%,22%)] text-white placeholder:text-[hsl(215,20%,45%)] focus:border-primary focus:ring-primary/20 transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-white">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[hsl(215,20%,45%)]" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-11 h-12 bg-[hsl(222,30%,16%)] border-[hsl(220,20%,22%)] text-white placeholder:text-[hsl(215,20%,45%)] focus:border-primary focus:ring-primary/20 transition-all"
                />
              </div>
            </div>

            {/* Captcha */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-white">
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
                  className="h-12 w-12 flex items-center justify-center rounded-lg bg-[hsl(222,30%,16%)] border border-[hsl(220,20%,22%)] hover:bg-[hsl(222,30%,20%)] transition-colors"
                >
                  <RefreshCw className="w-5 h-5 text-[hsl(215,20%,65%)]" />
                </button>
              </div>
              <Input
                type="text"
                inputMode="numeric"
                placeholder="Enter the answer"
                value={captchaInput}
                onChange={(e) => setCaptchaInput(e.target.value)}
                className="h-12 bg-[hsl(222,30%,16%)] border-[hsl(220,20%,22%)] text-white placeholder:text-[hsl(215,20%,45%)] focus:border-primary focus:ring-primary/20 transition-all"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 rounded-lg bg-destructive/20 border border-destructive/30 text-red-400 text-sm text-center animate-fade-in">
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
            <p className="text-sm text-[hsl(215,20%,50%)]">
              Protected by advanced security
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
