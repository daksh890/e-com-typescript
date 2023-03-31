import {Card, Badge, Button} from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";

type StoreItemProps ={
    title:string,
    filename:string,
    price:number,
    description:string,
    rating:number,
    id:string
}

export function StoreItem({title, filename, price, description, rating, id}:StoreItemProps){
    const {getItemQuantity, IncreaseCartQuantity, DecreaseCartQuantity, RemoveFromCart}= useShoppingCart()
    const quantity = getItemQuantity(id);
    return <Card className="h-100">
        <Card.Img variant="top" src={filename} height="200px"
        style={{objectFit:"cover"}}/>
        <Card.Body className="d-flex flex-column">
            <Card.Title className="d-flex justify-content-between align-items-baseline mb-0">
                <span className="fs-4">{title}</span>
                <span className="ms-2 text-muted">${price}</span>
            </Card.Title>
            <Card.Text className="d-flex justify-content-between fs-6 mb-4">
                {description}
                <span className="fs-5 ms-3">
                    <Badge className="p-1" bg="success">{rating}⭐</Badge>
                </span>
            </Card.Text>
            <div className="mt-auto">
                {quantity === 0 ? (
                    <Button className="w-100" onClick={()=>IncreaseCartQuantity(id)}>
                        + Add to Cart
                    </Button>
                ) : <div className="d-flex align-items-center 
                                    flex-column"
                          style={{gap:".5rem"}}
                
                >
                        <div className="d-flex align-items-center 
                                        justify-content-center"
                             style={{gap:".5rem"}}
                        >
                            <Button onClick={()=>IncreaseCartQuantity(id)}>+</Button>
                            <div>
                                <span className="fs-3">{quantity} </span>
                                in Cart
                            </div>
                            <Button onClick={()=>DecreaseCartQuantity(id)}>-</Button>
                        </div>
                        <Button size="sm" variant="danger" onClick={()=>RemoveFromCart(id)}>Remove</Button>
                    </div>
                }
            </div>
        </Card.Body>

    </Card>
}