import React, { useState } from "react";
import { Container, Grid, Card, CardMedia, CardContent, Typography, Select, MenuItem, Button, Box } from "@mui/material";

const initialCart = [
  { id: 1, name: "Licensed Fresh Bike", price: 98.81, quantity: 1, image: "/rooms/room-b1.jpg" },
  { id: 2, name: "Handmade Plastic Keyboard", price: 119.27, quantity: 2, image: "/rooms/room-b2.jpg" },
  { id: 3, name: "Intelligent Rubber Bike", price: 50.30, quantity: 1, image: "/rooms/room-b3.jpg" },
  { id: 4, name: "Intelligent Rubber Bike", price: 50.30, quantity: 1, image: "/rooms/room-b3.jpg" }
];

const CartPage = () => {
  const [cart, setCart] = useState(initialCart);

  const handleQuantityChange = (id:number, quantity:any) => {
    setCart(cart.map(item => item.id === id ? { ...item, quantity } : item));
  };

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <Container maxWidth={false} sx={{
        background: '#EFEDEB',
        marginTop: '24px'
    }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          {cart.map(item => (
            <Card key={item.id} sx={{ display: "flex", mb: 2, borderRadius: 2 }}>
              <CardMedia component="img" sx={{ width: 200 }} image={item.image} alt={item.name} />
              <CardContent>
                <Typography variant="h6">{item.name}</Typography>
                <Typography variant="body2">${(item.price * item.quantity).toFixed(2)}</Typography>
                <Select
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                  size="small"
                >
                  {[1, 2, 3, 4, 5].map(qty => (
                    <MenuItem key={qty} value={qty}>{qty}</MenuItem>
                  ))}
                </Select>
              </CardContent>
            </Card>
          ))}
        </Grid>
        <Grid item xs={12} md={4}>
          <Box sx={{ p: 2, border: "1px solid #ddd", background: '#ffff', borderRadius: 2 }}>
            <Typography variant="h6">Cart Summary</Typography>
            {cart.map(item => (
              <Typography key={item.id} variant="body2">
                {item.quantity}x {item.name} - ${(item.price * item.quantity).toFixed(2)}
              </Typography>
            ))}
            <Typography variant="h6" sx={{ mt: 2 }}>Total: ${subtotal.toFixed(2)}</Typography>
            <Button variant="contained" fullWidth sx={{ mt: 2 }}>
              CHECKOUT
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CartPage;
