import React, {useState, useEffect} from "react";
import { Data } from "../utils/data";
import {Row, Col} from "react-bootstrap";
import { StoreItem } from "../components/StoreItem";

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

export function Store(){
    const [data, setData] = useState<obj[]>([]);
    useEffect(()=>{
        Data().then((res)=> {
            setData(res)
            console.log(res);
        });
    }, [])

    return <>
    <h1>Store</h1>
    <Row md={2} xs={1} lg={3} className="g-3">
        {data && data.map((item)=>{
            return <Col key={item.id}>
                <StoreItem {...item}/>
            </Col>
        })}
    </Row>
    </>

}