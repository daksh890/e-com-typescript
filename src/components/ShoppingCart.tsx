import { useEffect, useState } from "react";
import { Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { CartItem } from "./cartItem";
import { Data } from "../utils/data";

type ShoppingCartProps = {
    isOpen:boolean
}
type obj = {
    description: string,
    filename:string, 
    height:number,
    id:string,
    price:number,
    rating:number,
    title:string,
    type:string,
    width:number
}

export function ShoppingCart({isOpen}:ShoppingCartProps){
    const {closeCart, cartItems} = useShoppingCart();
    const [storeItems, setStoreItems] = useState<obj[]>([]);
    useEffect(()=>{
        Data().then((res)=> {
            setStoreItems(res)
            console.log(res);
        });
    }, [])
    return <Offcanvas show={isOpen} onHide={closeCart} placement="end">
        <Offcanvas.Header closeButton>
            <Offcanvas.Title>Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
            <Stack gap={3}>
                {
                cartItems.map(item => (
                     <CartItem key={item.id} storeItems={storeItems} {...item}/>
                ))
            }
            <div className="ms-auto fw-bold fs-5">
               Total {cartItems.reduce((total, cartobj) => {
                    const item = storeItems.find(i => i.id === cartobj.id)
                    return total + ((item?.price||0) * cartobj.quantity)
               },0).toFixed(2)} 
            </div>
            </Stack>
        </Offcanvas.Body>
    </Offcanvas>

}