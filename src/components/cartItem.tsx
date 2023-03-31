import { useShoppingCart } from "../context/ShoppingCartContext"
import { Button, Stack } from "react-bootstrap";

type obj={
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
type CartItemProps = {
    id:string,
    quantity:number,
    storeItems:obj[]
}

export function CartItem({id, quantity, storeItems}:CartItemProps) {
    const {RemoveFromCart} = useShoppingCart();
    const item = storeItems.find(i => i.id === id)
    if(item == null) return <></>

    return <Stack direction="horizontal" gap={2}
            className="d-flex align-items-center"
    >
        <img src={item.filename} style={{width: "125px", height: "125px", objectFit:"cover"}}/>
        <div className="me-auto">
            <div>
               {item.title} {quantity>1 && <span className="text-muted" style={{fontSize:"1rem"}}>
                    x{quantity}
                </span>}
            </div>
            <div className="text-muted" style={{fontSize:"0.8rem"}}>
                {item.price}
            </div>
        </div>
        <div>
            ${(item.price * quantity).toFixed(2)}
        </div>
        <Button variant="outline-danger" size="sm" onClick={() => RemoveFromCart(item.id)}>&times;</Button>
    </Stack>

        
    

}