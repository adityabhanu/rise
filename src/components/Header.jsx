import { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Avatar,
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Button,
  Menu,
  MenuItem,
  useMediaQuery,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";
import RegisterDialog from "./RegisterDialog";
import LoginDialog from "./LoginDialog";
import riseLogo from "../assets/images/rise_logo.png";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { openLoginDialog, openRegisterDialog } from "../store/slices/appSlice";
import { logoutUser } from "../store/slices/userSlice";

export default function Header() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const isDesktop = useMediaQuery("(min-width:768px)");
  const { openLogin, openRegister } = useSelector((state) => state.app);
  const { user } = useSelector((state) => state.user);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuTextColor = scrolled ? theme.palette.text.white : "#FFFFFF";

  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);
  const handleMenuClick = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { label: "Memorials", path: "/memorial" },
    { label: "Cemeteries", path: "/cemetery" },
  ];

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          transition: "all 0.3s ease",
          backgroundColor: isHomePage
            ? scrolled
              ? theme.palette.background.secondary
              : "transparent"
            : theme.palette.background.secondary,

          boxShadow: isHomePage
            ? scrolled
              ? "0 2px 4px rgba(0,0,0,0.1)"
              : "none"
            : "0 2px 4px rgba(0,0,0,0.1)",

          borderBottom: isHomePage
            ? scrolled
              ? `1px solid ${theme.palette.background.secondary}`
              : "none"
            : `1px solid ${theme.palette.background.secondary}`,

          backgroundImage:
            isHomePage && !scrolled
              ? "linear-gradient(to bottom, #36322D 6px, rgba(54, 50, 45, 0) 95%)"
              : "none",
        }}
      >
        <Toolbar sx={{ display: "flex", alignItems: "center", py: 0 }}>
          {/* Mobile Menu Button */}
          {!isDesktop && (
            <IconButton
              edge="start"
              onClick={() => setDrawerOpen(true)}
              sx={{
                mr: 2,
                color: theme.palette.background.white,
              }}
            >
              <MenuIcon />
            </IconButton>
          )}

          {/* Logo */}
          <Box>
            <RouterLink to="/">
              <img
                src={riseLogo}
                width="150"
                height="32"
                alt="RISE"
                style={{ display: "block" }}
              />
            </RouterLink>
          </Box>

          {/* Desktop Menu */}
          {isDesktop && (
            <Box sx={{ display: "flex", gap: 3 }}>
              {menuItems.map((item) => (
                <Button
                  key={item.label}
                  component={RouterLink}
                  to={item.path}
                  sx={{
                    color: menuTextColor,
                    fontSize: "1rem",
                    fontWeight: "600",
                    position: "relative",
                    "&:hover::after": {
                      content: '""',
                      position: "absolute",
                      left: 0,
                      bottom: !scrolled && isHomePage ? -4 : -15,
                      width: "100%",
                      height: "3px", // underline thickness
                      backgroundColor: menuTextColor, // dark green
                    },
                  }}
                >
                  {item.label.toUpperCase()}
                </Button>
              ))}
            </Box>
          )}

          {/* Register + Sign In */}
          {isDesktop && (
            <Box
              sx={{
                display: "flex",
                gap: 2,
                justifyContent: "flex-end",
                flex: 1,
              }}
            >
              {user ? (
                <>
                  <IconButton
                    onClick={handleMenuClick}
                    sx={{
                      color: scrolled ? theme.palette.text.white : "#FFFFFF",
                    }}
                  >
                    {user.profilePic ? (
                      <Avatar
                        src={user.profilePic}
                        alt={user.publicName || user.firstName}
                        size="large"
                      />
                    ) : (
                      <AccountCircleIcon fontSize="large" />
                    )}
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={menuOpen}
                    onClose={handleMenuClose}
                    disableScrollLock
                  >
                    <MenuItem
                      onClick={() => {
                        dispatch(logoutUser());
                        handleMenuClose();
                      }}
                    >
                      Logout
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <>
                  <Button
                    onClick={() => dispatch(openRegisterDialog())}
                    sx={{
                      color: menuTextColor,
                      position: "relative",
                      fontWeight: "600",
                      "&:hover::after": {
                        content: '""',
                        position: "absolute",
                        left: 0,
                        bottom: !scrolled && isHomePage ? -4 : -16,
                        width: "100%",
                        height: "3px",
                        backgroundColor: menuTextColor,
                      },
                    }}
                  >
                    REGISTER
                  </Button>
                  <Button
                    onClick={() => dispatch(openLoginDialog())}
                    sx={{
                      color: menuTextColor,
                      position: "relative",
                      fontWeight: "600",
                      "&:hover::after": {
                        content: '""',
                        position: "absolute",
                        left: 0,
                        bottom: !scrolled && isHomePage ? -4 : -16,
                        width: "100%",
                        height: "3px", // underline thickness
                        backgroundColor: menuTextColor, // dark green
                      },
                    }}
                  >
                    SIGN IN
                  </Button>
                </>
              )}
            </Box>
          )}

          {/* Mobile Right-side icons */}
          {!isDesktop && (
            <Box
              sx={{
                display: "flex",
                gap: 2,
                justifyContent: "flex-end",
                flex: 1,
              }}
            >
              {user && (
                <>
                  <IconButton
                    onClick={handleMenuClick}
                    sx={{
                      color: scrolled ? theme.palette.text.white : "#FFFFFF",
                    }}
                  >
                    {user.profilePic ? (
                      <Avatar
                        src={user.profilePic}
                        alt={user.publicName || user.firstName}
                        size="large"
                      />
                    ) : (
                      <AccountCircleIcon fontSize="large" />
                    )}
                  </IconButton>

                  <Menu
                    anchorEl={anchorEl}
                    open={menuOpen}
                    onClose={handleMenuClose}
                    disableScrollLock
                  >
                    <MenuItem
                      onClick={() => {
                        dispatch(logoutUser());
                        handleMenuClose();
                      }}
                    >
                      Logout
                    </MenuItem>
                  </Menu>
                </>
              )}
            </Box>
          )}
        </Toolbar>

        {/* Drawer Menu (Mobile) */}
        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
        >
          <Box sx={{ width: 260, p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Menu
            </Typography>

            <List>
              {menuItems.map((item) => (
                <ListItem key={item.label} disablePadding>
                  <ListItemButton
                    component={RouterLink}
                    to={item.path}
                    onClick={() => setDrawerOpen(false)}
                  >
                    <ListItemText primary={item.label} />
                  </ListItemButton>
                </ListItem>
              ))}

              {/* Mobile Only Items */}
              {!user && (
                <>
                  <ListItem disablePadding>
                    <ListItemButton
                      onClick={() => {
                        setDrawerOpen(false);
                        dispatch(openRegisterDialog());
                      }}
                    >
                      <ListItemText primary="Register" />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton
                      onClick={() => {
                        setDrawerOpen(false);
                        dispatch(openLoginDialog());
                      }}
                    >
                      <ListItemText primary="Sign In" />
                    </ListItemButton>
                  </ListItem>
                </>
              )}
            </List>
          </Box>
        </Drawer>
      </AppBar>

      <RegisterDialog open={openRegister} />
      <LoginDialog open={openLogin} />
    </>
  );
}
