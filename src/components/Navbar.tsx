import * as React from 'react'
import { useRef } from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore'
import SearchIcon from '@mui/icons-material/Search'
import { TextField } from '@mui/material'
import { styled, alpha } from '@mui/material/styles'
import InputBase from '@mui/material/InputBase'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { useAppDispatch, useAppSelector } from './hooks/hooks'
import Badge from '@mui/material/Badge'
import MailIcon from '@mui/icons-material/Mail'
import { Link } from 'react-router-dom'
import { filterProducts } from '../features/product/productSlice'
import { setSearchString } from '../features/product/productSlice'
import { text } from 'stream/consumers'
import { loadLocalStorage } from '../features/cart/cartSlice'

const Navbar = () => {
  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: '100%',
    },
    [theme.breakpoints.up('md')]: {
      padding: '9px',
      marginLeft: '20%',
      marginTop: '20px',
      marginBottom: '20px',
      width: '30%',
    },
  }))

  const TabButton = styled('button')(({ theme }) => ({
    margin: '10px',
    padding: '7px',
    color: 'yellow',
    backgroundColor: 'darkblue',
    display: 'block',
    border: 'none',
    fontFamily: 'Roboto',
    borderRadius: '20px',

    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    '&:focus': {
      backgroundColor: 'darkorange',
    },
  }))

  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }))

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }))

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  )

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const dispatch = useAppDispatch()
  const totalQuantity = useAppSelector((state) => state.cart.totalQuantity)

  const [textFieldValue, setTextFieldValue] = React.useState('')

  React.useEffect(() => {
    dispatch(loadLocalStorage())
  }, [])

  React.useEffect(() => {
    dispatch(setSearchString(textFieldValue))
    dispatch(filterProducts())
  }, [textFieldValue])

  const filterBySearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextFieldValue(event.target.value)
    dispatch(setSearchString(textFieldValue))
    dispatch(filterProducts())
  }

  return (
    <nav>
      <AppBar position="sticky" sx={{ backgroundColor: 'darkblue' }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <LocalGroceryStoreIcon
              sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}
            />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              Bazaaaria
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                <MenuItem onClick={handleCloseNavMenu}>
                  <Link to="/">
                    <Typography variant="h4" textAlign="center">
                      Products
                    </Typography>
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Link to="/categories">
                    <Typography variant="h4" textAlign="center">
                      By Category
                    </Typography>
                  </Link>
                </MenuItem>
              </Menu>
            </Box>

            <LocalGroceryStoreIcon
              sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}
            />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              Bazaaaria
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Link to="/">
                <TabButton onClick={handleCloseNavMenu}>
                  <Typography variant="h5">Products</Typography>
                </TabButton>
              </Link>

              <Link to="/categories">
                <TabButton onClick={handleCloseNavMenu}>
                  <Typography variant="h5">By Category</Typography>
                </TabButton>
              </Link>

              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ 'aria-label': 'search' }}
                  // value={textFieldValue}
                  value={textFieldValue}
                  autoFocus
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    filterBySearch(e)
                  }}
                />
              </Search>
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Cart">
                <IconButton onClick={() => {}} sx={{ p: 0 }}>
                  <Badge badgeContent={totalQuantity} color="success">
                    <Link to="/cart">
                      <ShoppingCartIcon
                        fontSize="large"
                        sx={{ color: 'white' }}
                      />
                    </Link>
                  </Badge>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">...</Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
        <Box sx={{ flexGrow: 2, display: { xs: 'flex', md: 'none' } }}>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              value={textFieldValue}
              autoFocus
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                filterBySearch(e)
              }}
            />
          </Search>
        </Box>
      </AppBar>
    </nav>
  )
}

export default Navbar
