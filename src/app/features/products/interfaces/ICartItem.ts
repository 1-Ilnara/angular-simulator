// Товар в корзине так, как он хранится в CartService и показывается на экране.
export interface ICartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  thumbnail: string;
}
