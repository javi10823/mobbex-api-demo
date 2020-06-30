export interface OrderSended {
    total:number,
    currency:string,
    reference?:string,
    description?:string,
    items:Items[],
    return_url:string
}

interface Items {
    image?:string,
    quantity:number,
    description?:string,
    total:number
}