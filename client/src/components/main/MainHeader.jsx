import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import React from "react";

// UI
import EdugateLightMode from "../UI/logo/EdugateLightMode";
import EdugateDarkMode from "../UI/logo/EdugateDarkMode";

//components
import NavItems from "./navItems/NavItems";

// action
import { uiAction } from "../../store/ui-slice";
import { Menu } from "lucide-react";
import { Dialog } from "@headlessui/react";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  // { name: "Feature", href: "#" },
  // { name: "Company", href: "#" },
];

const MainHeader = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const dispatch = useDispatch();
  const isDarkmode = useSelector((state) => state.ui.isDarkMode);

  const NavigateHandler = useCallback(() => {
    dispatch(uiAction.toggler());
  }, [dispatch]);

  return (
    <>
      {/* Header */}
      <header className="fixed inset-x-0 top-0 z-50 bg-white shadow-lg">
        <nav
          className="flex items-center justify-between p-6 lg:px-8 max-w-screen-xl mx-auto"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <NavLink to="/" onClick={NavigateHandler} className="-m-1.5">
              <span className="sr-only">Edugate</span>
              {isDarkmode ? (
                <EdugateDarkMode className="h-16" />
              ) : (
                <EdugateLightMode className="h-16" />
              )}
            </NavLink>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            <NavItems />
          </div>
        </nav>
        <Dialog
          as="div"
          className="lg:hidden"
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
        >
          <div className="fixed inset-0 z-50" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <NavLink
                to="/"
                onClick={NavigateHandler}
                className="-m-1.5 -mx-5"
              >
                <span className="sr-only">Edugate</span>
                {isDarkmode ? (
                  <EdugateDarkMode className={"h-14"} />
                ) : (
                  <EdugateLightMode className={"h-14"} />
                )}
              </NavLink>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <Menu className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <NavLink
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </NavLink>
                  ))}
                </div>
                <div className="py-6">
                  <Link
                    to="/login"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Log in
                  </Link>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>

      {/* <nav
        className={`nav-bar ${styles.navBar} ${
          isDarkmode ? styles.darkNavBar : styles.lightNavBar
        } `}
      >
        <div className={styles.edugateLogo}>
        </div>
        <NavItems />
      </nav> */}
    </>
  );
};

export default MainHeader;
