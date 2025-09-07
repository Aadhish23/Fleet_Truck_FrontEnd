import { useState } from "react";
import {
  Card, CardHeader, CardTitle, CardDescription, CardContent
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Bell, Mail, Fuel, Eye, Save, AlertTriangle, Settings as SettingsIcon
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface NotificationSettings {
  emailAlerts: boolean;
  fuelThreshold: number;
  drowsinesssensitivity: number;
  alertFrequency: number;
}

export function SettingsPage() {
  const { toast } = useToast();

  const [settings, setSettings] = useState<NotificationSettings>({
    emailAlerts: true,
    fuelThreshold: 20,
    drowsinesssensitivity: 75,
    alertFrequency: 5
  });

  const updateSetting = <K extends keyof NotificationSettings>(
    key: K,
    value: NotificationSettings[K]
  ) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your notification preferences have been updated successfully.",
    });
  };

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Page Header */}
      <header className="flex items-center space-x-3">
        <SettingsIcon className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold tracking-tight">MoniTruck Settings</h1>
      </header>

      {/* Notification Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bell className="h-5 w-5 text-primary" />
            <span>Notification Preferences</span>
          </CardTitle>
          <CardDescription>Configure how you want to receive alerts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-muted-foreground" />
              <div>
                <Label htmlFor="email-alerts" className="text-sm font-medium">
                  Email Alerts
                </Label>
                <p className="text-sm text-muted-foreground">
                  Receive system alerts via registered email
                </p>
              </div>
            </div>
            <Switch
              id="email-alerts"
              checked={settings.emailAlerts}
              onCheckedChange={(checked) =>
                updateSetting("emailAlerts", checked)
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* Alert Thresholds */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-warning" />
            <span>Alert Thresholds</span>
          </CardTitle>
          <CardDescription>
            Adjust thresholds and sensitivity settings for your fleet
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Fuel Threshold */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Fuel className="h-5 w-5 text-muted-foreground" />
                <div>
                  <Label className="text-sm font-medium">Fuel Level Alert</Label>
                  <p className="text-sm text-muted-foreground">
                    Trigger alert when fuel drops below this percentage
                  </p>
                </div>
              </div>
              <Badge variant="outline">{settings.fuelThreshold}%</Badge>
            </div>
            <div className="px-4">
              <Slider
                value={[settings.fuelThreshold]}
                onValueChange={(value) => updateSetting("fuelThreshold", value[0])}
                min={5}
                max={50}
                step={5}
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>5%</span>
                <span>50%</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Drowsiness Sensitivity */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Eye className="h-5 w-5 text-muted-foreground" />
                <div>
                  <Label className="text-sm font-medium">Drowsiness Detection</Label>
                  <p className="text-sm text-muted-foreground">
                    Model sensitivity for detecting driver fatigue
                  </p>
                </div>
              </div>
              <Badge variant="outline">{settings.drowsinesssensitivity}%</Badge>
            </div>
            <div className="px-4">
              <Slider
                value={[settings.drowsinesssensitivity]}
                onValueChange={(value) =>
                  updateSetting("drowsinesssensitivity", value[0])
                }
                min={25}
                max={100}
                step={5}
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>Low (25%)</span>
                <span>High (100%)</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Alert Frequency */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Bell className="h-5 w-5 text-muted-foreground" />
              <div className="flex-1">
                <Label className="text-sm font-medium">Alert Frequency</Label>
                <p className="text-sm text-muted-foreground">
                  Minimum time gap (minutes) between repeated alerts
                </p>
              </div>
              <div className="w-24">
                <Input
                  type="number"
                  value={settings.alertFrequency}
                  onChange={(e) =>
                    updateSetting("alertFrequency", parseInt(e.target.value) || 1)
                  }
                  min={1}
                  max={60}
                  className="text-center"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} className="flex items-center space-x-2">
          <Save className="h-4 w-4" />
          <span>Save Settings</span>
        </Button>
      </div>
    </section>
  );
}
