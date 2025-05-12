
import { Card, CardContent } from "@/components/ui/card";

const WelcomeBanner = () => {
  return (
    <Card className="bg-gradient-to-r from-primary/10 to-primary/5 mb-8 border-primary/20">
      <CardContent className="py-6">
        <h1 className="text-3xl font-bold text-center mb-2">Our Open Books</h1>
        <p className="text-center text-muted-foreground text-lg">
          See exactly how your support makes an impact
        </p>
      </CardContent>
    </Card>
  );
};

export default WelcomeBanner;
