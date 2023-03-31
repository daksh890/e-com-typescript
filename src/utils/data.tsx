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
export const Data:()=> Promise<obj[]> = async()=>{
    let data:Array<any> =[] ;
    await fetch("https://api4286.s3.ap-south-1.amazonaws.com/products.json")
    .then((res) => res.json()).then((res)=> data = res)
    return data;
}