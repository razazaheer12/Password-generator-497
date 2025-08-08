import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { generatePassword, calculateStrength } from "@/lib/password";
import { Copy, RefreshCw, Key } from "lucide-react";

const PasswordGenerator = () => {
  const { toast } = useToast();
  const [password, setPassword] = useState("");
  const [length, setLength] = useState([12]);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: false,
  });

  const handleGenerate = () => {
    const newPassword = generatePassword(length[0], options);
    setPassword(newPassword);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    toast({
      title: "Copied!",
      description: "Password copied to clipboard",
    });
  };

  const strength = calculateStrength(password, options);
  const getStrengthColor = () => {
    if (strength < 25) return "bg-destructive";
    if (strength < 50) return "bg-accent";
    if (strength < 75) return "bg-ring";
    return "bg-primary";
  };

  return (
    <div className="w-full max-w-md p-6 bg-card border border-border rounded-xl shadow-sm animate-fade-in">
      <h1 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2"><Key className="h-6 w-6" aria-hidden="true" /> Password Generator</h1>
      
      <div className="bg-muted p-4 rounded-lg mb-6">
        <div className="flex items-center gap-2">
          <code className="font-mono text-xl text-foreground flex-1 overflow-x-auto">
            {password || "Click generate"}
          </code>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleCopy}
            className="hover:bg-accent"
            disabled={!password}
          >
            <Copy className="h-4 w-4 text-foreground" />
          </Button>
        </div>
        
        <div className="mt-2 h-2 rounded-full bg-muted overflow-hidden">
          <div
            className={`h-full ${getStrengthColor()} transition-all duration-500`}
            style={{ width: `${strength}%` }}
          />
        </div>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">Password Length: {length[0]}</label>
          <Slider
            value={length}
            onValueChange={setLength}
            max={32}
            min={8}
            step={1}
            className="py-4"
          />
        </div>

        <div className="space-y-3">
          {Object.entries(options).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <label className="capitalize text-foreground">{key}</label>
              <Switch
                checked={value}
                onCheckedChange={(checked) =>
                  setOptions((prev) => ({ ...prev, [key]: checked }))
                }
              />
            </div>
          ))}
        </div>

        <Button
          className="w-full"
          onClick={handleGenerate}
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Generate Password
        </Button>
      </div>
    </div>
  );
};

export default PasswordGenerator;