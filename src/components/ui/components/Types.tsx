export interface MenuItem {
    name: string
    price: number
  }
  
  export interface ShopData {
    shopType: "canteen" | "xerox"
    shopName: string
    address: string
    contact: string
    menuItems: MenuItem[]
  }