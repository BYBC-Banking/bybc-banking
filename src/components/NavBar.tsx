
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="w-full border-b shadow-sm bg-white">
      <div className="container mx-auto py-2 px-4">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link to="/" className={navigationMenuTriggerStyle()}>
                Dashboard
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>Finance</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[300px] gap-3 p-4">
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        to="/investments"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="text-sm font-medium leading-none">Investments</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Track and manage your investment portfolio
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        to="/nonprofit"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="text-sm font-medium leading-none">Nonprofit Ledger</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Transparent financial ledger for nonprofits
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link to="/education" className={navigationMenuTriggerStyle()}>
                Education
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
};

export default NavBar;
