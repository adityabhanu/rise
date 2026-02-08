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
import riseLogo from "../assets/images/rise_logo_2.png";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { openLoginDialog, openRegisterDialog } from "../store/slices/appSlice";
import { logoutUser } from "../store/slices/userSlice";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isDesktop = useMediaQuery("(min-width:768px)");
  const { openLogin, openRegister } = useSelector((state) => state.app);
  const { user } = useSelector((state) => state.user);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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

  const menuTextColor = theme.palette.text.primary;

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          transition: "background-color 0.3s ease",
          backgroundColor: scrolled
            ? theme.palette.background.default
            : isHomePage
              ? "transparent"
              : theme.palette.background.default,
          boxShadow: scrolled ? "0 1px 4px rgba(0,0,0,0.06)" : "none",
          borderBottom: scrolled
            ? `1px solid ${theme.palette.divider}`
            : "none",
        }}
      >
        <Toolbar sx={{ display: "flex", alignItems: "center", minHeight: 64 }}>
          {/* Mobile Menu Button */}
          {!isDesktop && (
            <IconButton
              edge="start"
              onClick={() => setDrawerOpen(true)}
              sx={{ mr: 2, color: menuTextColor }}
            >
              <MenuIcon />
            </IconButton>
          )}

          {/* Logo */}
          <Box>
            <RouterLink to="/">
              <img
                src={riseLogo}
                width="100"
                alt="RISE"
                style={{ display: "block" }}
              />
            </RouterLink>
          </Box>

          {/* Desktop Menu */}
          {isDesktop && (
            <Box sx={{ display: "flex", gap: 3, ml: 4 }}>
              {menuItems.map((item) => (
                <Button
                  key={item.label}
                  component={RouterLink}
                  to={item.path}
                  sx={{
                    color: menuTextColor,
                    fontSize: "0.95rem",
                    fontWeight: 600,
                    position: "relative",
                    "&:hover::after": {
                      content: '""',
                      position: "absolute",
                      left: 0,
                      bottom: -6,
                      width: "100%",
                      height: "2px",
                      backgroundColor: theme.palette.primary.main,
                    },
                  }}
                >
                  {item.label.toUpperCase()}
                </Button>
              ))}
            </Box>
          )}

          {/* Right Section */}
          <Box
            sx={{
              display: "flex",
              gap: 2,
              justifyContent: "flex-end",
              flex: 1,
            }}
          >
            {isDesktop &&
              (user ? (
                <>
                  <IconButton
                    onClick={handleMenuClick}
                    sx={{ color: menuTextColor }}
                  >
                    {user.profilePic ? (
                      <Avatar
                        src={user.profilePic}
                        alt={user.publicName || user.firstName}
                      />
                    ) : (
                      <AccountCircleIcon />
                    )}
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={menuOpen}
                    onClose={handleMenuClose}
                  >
                    <MenuItem
                      onClick={() => {
                        handleMenuClose();
                        navigate("/profile");
                      }}
                    >
                      Profile
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        dispatch(logoutUser());
                        handleMenuClose();
                        navigate("/", { replace: true });
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
                    sx={{ color: menuTextColor, fontWeight: 600 }}
                  >
                    REGISTER
                  </Button>
                  <Button
                    onClick={() => dispatch(openLoginDialog())}
                    sx={{ color: menuTextColor, fontWeight: 600 }}
                  >
                    SIGN IN
                  </Button>
                </>
              ))}
          </Box>
        </Toolbar>

        {/* Drawer Menu */}
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
