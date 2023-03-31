import { createContext, ReactNode, useContext, useState } from "react";
import { ShoppingCart } from "../components/ShoppingCart";
import { useLocalStorage } from "../hooks/useLocalStorage";

type ShoppingCartContext = {
    openCart: ()=>void,
    closeCart: ()=>void,
    getItemQuantity: (id:string)=>number,
    IncreaseCartQuantity: (id:string)=>void,
    DecreaseCartQuantity: (id:string)=>void,
    RemoveFromCart: (id:string)=>void,
    cartQuantity: number,
    cartItems:CartItem[]

}

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export function useShoppingCart(){
    return useContext(ShoppingCartContext);
}

type CartItem = {
    id:string,
    quantity:number
}

type ShoppingCartProviderProps = {
    children: ReactNode
}

export function ShoppingCartProvider({children}:ShoppingCartProviderProps){
    const [isOpen, setIsOpen] = useState(false);
    const [cartItems, setCartItems] = useLocalStorage<CartItem[]>("shopping-cart",[])

    const cartQuantity = cartItems.reduce((quantity, item) => item.quantity+quantity,0)


    const openCart = ()=> setIsOpen(true);
    const closeCart = ()=> setIsOpen(false);

    function getItemQuantity(id:string){
        return cartItems.find(item => item.id ===id)?.quantity || 0
    }
    function IncreaseCartQuantity(id:string){
        setCartItems(currItems => {
            if (currItems.find(item => item.id === id) == null){
                return [...currItems, {id, quantity:1}]
            } else{
                return currItems.map(item => {
                    if(item.id == id) {
                        return {...item, quantity:item.quantity+1}
                    }else{
                        return item
                    }
                })
            }
        })
    }

    function DecreaseCartQuantity(id:string){
        setCartItems(currItems => {
            if (currItems.find(item => item.id === id)?.quantity === 1){
                return currItems.filter(item => item.id !== id)
            } else{
                return currItems.map(item => {
                    if(item.id == id) {
                        return {...item, quantity:item.quantity-1}
                    }else{
                        return item
                    }
                })
            }
        })
    }

    function RemoveFromCart(id:string){
        setCartItems(currItems => {
            return currItems.filter(item => item.id !== id)
        })
    }

    return <ShoppingCartContext.Provider 
    value={{getItemQuantity, 
            IncreaseCartQuantity, 
            DecreaseCartQuantity, 
            RemoveFromCart,
            openCart, 
            closeCart,
            cartItems,
            cartQuantity
            }}>
        {children}
        <ShoppingCart isOpen={isOpen}/>
    </ShoppingCartContext.Provider>
}